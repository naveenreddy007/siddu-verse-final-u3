package handlers

import (
	"net/http"
	"siddu-verse-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *BaseHandler) CreateAward(c *gin.Context) {
	var award models.Award
	if err := c.ShouldBindJSON(&award); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if result := h.DB.Create(&award); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusCreated, award)
}

func (h *BaseHandler) GetAwards(c *gin.Context) {
	var awards []models.Award
	if result := h.DB.Find(&awards); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"awards": awards})
}

func (h *BaseHandler) GetAwardByID(c *gin.Context) {
	id := c.Param("id")
	var award models.Award
	if result := h.DB.First(&award, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Award not found"})
		return
	}
	c.JSON(http.StatusOK, award)
}

func (h *BaseHandler) UpdateAward(c *gin.Context) {
	id := c.Param("id")
	var award models.Award
	if result := h.DB.First(&award, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Award not found"})
		return
	}
	if err := c.ShouldBindJSON(&award); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	h.DB.Save(&award)
	c.JSON(http.StatusOK, award)
}

func (h *BaseHandler) DeleteAward(c *gin.Context) {
	id := c.Param("id")
	if result := h.DB.Delete(&models.Award{}, id); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Award deleted successfully"})
}
