package database

import (
	"log"
	"os"
	"siddu-verse-backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Initialize sets up the database connection and runs auto-migrations.
func Initialize() (*gorm.DB, error) {
	// Get the database connection string from environment variables
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=siddu_verse port=5432 sslmode=disable"
		log.Println("DATABASE_URL not set, using default local connection string.")
	}

	// Open a connection to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// AutoMigrate will create or update the database schema
	// based on the models defined in the models package.
	err = db.AutoMigrate(
		&models.User{},
		&models.TalentProfile{},
		&models.Skill{},
		&models.Experience{},
		&models.PortfolioItem{},
		&models.CastingCall{},
		&models.CastingCallRole{},
		&models.Application{},
		&models.Pulse{},
		&models.Comment{},
		&models.Like{},
		&models.Movie{},
		&models.Award{},
		&models.CricketMatch{},
	)
	if err != nil {
		return nil, err
	}

	return db, nil
}
