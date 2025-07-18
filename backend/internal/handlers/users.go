package handlers

import (
	"net/http"
	"siddu-verse-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *BaseHandler) GetUserByID(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if result := h.DB.First(&user, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}
