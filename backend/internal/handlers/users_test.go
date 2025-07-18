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

func setupUserRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.Default()
	return router
}

func TestGetUserByID(t *testing.T) {
	seed.LoadSeedData()
	router := setupUserRouter()
	router.GET("/api/users/:id", GetUserByID)

	req, _ := http.NewRequest("GET", "/api/users/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var user models.User
	err := json.Unmarshal(w.Body.Bytes(), &user)
	assert.NoError(t, err)
	assert.Equal(t, "1", user.ID)
	assert.Equal(t, "siddu", user.Username)
}
