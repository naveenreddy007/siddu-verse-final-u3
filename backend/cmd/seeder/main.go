package main

import (
	"fmt"
	"log"
	"siddu-verse/database"
	"siddu-verse/internal/models"
	"siddu-verse/internal/seed"
)

func main() {
	log.Println("Starting database seeding...")

	// Initialize database connection
	if err := database.Init(); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	db := database.GetDB()

	log.Println("Database connection successful.")

	// Check if database is already seeded
	var userCount int64
	db.Model(&models.User{}).Count(&userCount)
	if userCount > 0 {
		log.Println("Database already appears to be seeded. Aborting.")
		return
	}

	log.Println("Seeding users...")
	users, err := seed.SeedUsers(db, 20)
	if err != nil {
		log.Fatalf("Failed to seed users: %v", err)
	}
	fmt.Printf("Successfully seeded %d users.\n", len(users))

	log.Println("Seeding talent profiles...")
	talentProfiles, err := seed.SeedTalentProfiles(db, users)
	if err != nil {
		log.Fatalf("Failed to seed talent profiles: %v", err)
	}
	fmt.Printf("Successfully seeded %d talent profiles.\n", len(talentProfiles))

	log.Println("Seeding casting calls...")
	castingCalls, err := seed.SeedCastingCalls(db, users)
	if err != nil {
		log.Fatalf("Failed to seed casting calls: %v", err)
	}
	fmt.Printf("Successfully seeded %d casting calls.\n", len(castingCalls))

	log.Println("Seeding social pulses, comments, and likes...")
	pulses, err := seed.SeedSocialGraph(db, users)
	if err != nil {
		log.Fatalf("Failed to seed social graph: %v", err)
	}
	fmt.Printf("Successfully seeded %d pulses and their interactions.\n", len(pulses))

	log.Println("Database seeding completed successfully!")
}
