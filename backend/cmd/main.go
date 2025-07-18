package main

import (
	"log"
	"siddu-verse-backend/api"
	"siddu-verse-backend/database"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Database
	db, err := database.Initialize()
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}
	log.Println("Database connection successful and schema migrated.")

	// Initialize Gin router
	router := gin.Default()

	// Setup routes, passing the database connection
	api.SetupRoutes(router, db)

	// Start the server
	log.Println("Starting Go backend server on http://localhost:8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
