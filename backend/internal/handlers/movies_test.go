package handlers

import (
	"net/http"
	"net/http/httptest"
	"siddu-verse-backend/internal/models"
	"siddu-verse-backend/internal/seed"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// Re-using setupRouter from awards_test.go for consistency
func setupMovieRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	return router
}

func TestGetMovies(t *testing.T) {
	seed.LoadSeedData()
	router := setupMovieRouter()
	router.GET("/api/movies", GetMovies)

	req, _ := http.NewRequest("GET", "/api/movies", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string][]models.Movie
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.NotEmpty(t, response["movies"])
	assert.Equal(t, len(seed.Movies), len(response["movies"]))
}

func TestGetMovieByID(t *testing.T) {
	seed.LoadSeedData()
	router := setupMovieRouter()
	router.GET("/api/movies/:id", GetMovieByID)

	// Test case: Found
	req, _ := http.NewRequest("GET", "/api/movies/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var movie models.Movie
	err := json.Unmarshal(w.Body.Bytes(), &movie)
	assert.NoError(t, err)
	assert.Equal(t, "1", movie.ID)
	assert.Equal(t, "Oppenheimer", movie.Title)

	// Test case: Not Found
	req, _ = http.NewRequest("GET", "/api/movies/999", nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}
