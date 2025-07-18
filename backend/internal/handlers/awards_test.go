package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"siddu-verse-backend/internal/models"
	"siddu-verse-backend/internal/seed"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	return router
}

func TestGetAwards(t *testing.T) {
	seed.LoadSeedData()
	router := setupRouter()
	router.GET("/api/awards", GetAwards)

	req, _ := http.NewRequest("GET", "/api/awards", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string][]models.Award
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.NotEmpty(t, response["awards"])
	assert.Equal(t, len(seed.Awards), len(response["awards"]))
}

func TestGetAwardByID(t *testing.T) {
	seed.LoadSeedData()
	router := setupRouter()
	router.GET("/api/awards/:id", GetAwardByID)

	// Test case: Found
	req, _ := http.NewRequest("GET", "/api/awards/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var award models.Award
	err := json.Unmarshal(w.Body.Bytes(), &award)
	assert.NoError(t, err)
	assert.Equal(t, "1", award.ID)

	// Test case: Not Found
	req, _ = http.NewRequest("GET", "/api/awards/999", nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestCreateAward(t *testing.T) {
	seed.LoadSeedData()
	initialCount := len(seed.Awards)
	router := setupRouter()
	router.POST("/api/awards", CreateAward)

	newAward := models.Award{Name: "Test Award", Year: 2025}
	body, _ := json.Marshal(newAward)

	req, _ := http.NewRequest("POST", "/api/awards", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
	assert.Equal(t, initialCount+1, len(seed.Awards))

	var createdAward models.Award
	err := json.Unmarshal(w.Body.Bytes(), &createdAward)
	assert.NoError(t, err)
	assert.Equal(t, "Test Award", createdAward.Name)
}
