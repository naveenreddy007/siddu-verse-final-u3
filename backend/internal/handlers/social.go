package handlers

import (
	"net/http"
	"siddu-verse-backend/internal/models"

	"github.com/gin-gonic/gin"
)

// --- Pulse Handlers ---

type CreatePulseInput struct {
	Content   string `json:"content" binding:"required"`
	MediaURL  string `json:"mediaUrl"`
	MediaType string `json:"mediaType"`
}

func (h *BaseHandler) CreatePulse(c *gin.Context) {
	var input CreatePulseInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	pulse := models.Pulse{
		UserID:    userID.(uint),
		Content:   input.Content,
		MediaURL:  input.MediaURL,
		MediaType: input.MediaType,
	}

	if result := h.DB.Create(&pulse); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create pulse"})
		return
	}

	c.JSON(http.StatusCreated, pulse)
}

func (h *BaseHandler) GetPulses(c *gin.Context) {
	var pulses []models.Pulse
	// Preload user data to include it in the response
	if result := h.DB.Preload("User").Order("created_at desc").Find(&pulses); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch pulses"})
		return
	}
	c.JSON(http.StatusOK, pulses)
}

// --- Like Handlers ---

func (h *BaseHandler) LikePulse(c *gin.Context) {
	pulseID := c.Param("id")

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	like := models.Like{
		UserID:    userID.(uint),
		OwnerID:   0, // This will be set based on pulseID
		OwnerType: "pulses",
	}
	// Convert pulseID to uint
	if err := h.DB.Model(&models.Pulse{}).Where("id = ?", pulseID).First(&models.Pulse{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pulse not found"})
		return
	}
	// A bit of a hack to get the ID as uint
	var pulse models.Pulse
	h.DB.First(&pulse, pulseID)
	like.OwnerID = pulse.ID

	// Check if the user has already liked this pulse
	var existingLike models.Like
	if h.DB.Where("user_id = ? AND owner_id = ? AND owner_type = ?", like.UserID, like.OwnerID, like.OwnerType).First(&existingLike).Error == nil {
		// User has already liked, so we unlike it
		h.DB.Delete(&existingLike)
		c.JSON(http.StatusOK, gin.H{"message": "Pulse unliked"})
		return
	}

	if result := h.DB.Create(&like); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to like pulse"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Pulse liked"})
}

// --- Comment Handlers ---

type CreateCommentInput struct {
	Content string `json:"content" binding:"required"`
}

func (h *BaseHandler) CommentOnPulse(c *gin.Context) {
	pulseID := c.Param("id")

	var input CreateCommentInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// A bit of a hack to get the ID as uint
	var pulse models.Pulse
	if err := h.DB.First(&pulse, pulseID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pulse not found"})
		return
	}

	comment := models.Comment{
		UserID:    userID.(uint),
		Content:   input.Content,
		OwnerID:   pulse.ID,
		OwnerType: "pulses",
	}

	if result := h.DB.Create(&comment); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
		return
	}

	// Preload user for the response
	h.DB.Preload("User").First(&comment, comment.ID)

	c.JSON(http.StatusCreated, comment)
}
