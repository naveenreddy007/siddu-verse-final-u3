package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"siddu-verse-backend/internal/models"
	"siddu-verse-backend/internal/seed"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupCricketRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	return router
}

func TestGetCricketMatches(t *testing.T) {
	seed.LoadSeedData()
	router := setupCricketRouter()
	router.GET("/api/cricket/matches", GetCricketMatches)

	req, _ := http.NewRequest("GET", "/api/cricket/matches", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var response map[string][]models.CricketMatch
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.NotEmpty(t, response["matches"])
	assert.Equal(t, len(seed.CricketMatches), len(response["matches"]))
}
