package handlers

import (
	"net/http"
	"siddu-verse-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *BaseHandler) CreateMovie(c *gin.Context) {
	var movie models.Movie
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if result := h.DB.Create(&movie); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusCreated, movie)
}

func (h *BaseHandler) GetMovies(c *gin.Context) {
	var movies []models.Movie
	if result := h.DB.Find(&movies); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"movies": movies})
}

func (h *BaseHandler) GetMovieByID(c *gin.Context) {
	id := c.Param("id")
	var movie models.Movie
	if result := h.DB.First(&movie, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
		return
	}
	c.JSON(http.StatusOK, movie)
}
