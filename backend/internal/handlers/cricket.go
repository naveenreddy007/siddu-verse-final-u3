package handlers

import (
	"net/http"
	"siddu-verse-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *BaseHandler) GetCricketMatches(c *gin.Context) {
	var matches []models.CricketMatch
	if result := h.DB.Find(&matches); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"matches": matches})
}

func (h *BaseHandler) GetCricketMatchByID(c *gin.Context) {
	id := c.Param("id")
	var match models.CricketMatch
	if result := h.DB.First(&match, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Match not found"})
		return
	}
	c.JSON(http.StatusOK, match)
}
