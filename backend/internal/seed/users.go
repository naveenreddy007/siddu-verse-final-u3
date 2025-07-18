package seed

import (
	"siddu-verse/internal/models"
	"siddu-verse/internal/utils"

	"github.com/bxcodec/faker/v3"
	"gorm.io/gorm"
)

// SeedUsers creates a specified number of mock users.
func SeedUsers(db *gorm.DB, count int) ([]models.User, error) {
	var users []models.User

	for i := 0; i &lt; count; i++ {
		hashedPassword, err := utils.HashPassword("password123")
		if err != nil {
			return nil, err
		}

		user := models.User{
			Username:     faker.Username(),
			Email:        faker.Email(),
			PasswordHash: hashedPassword,
			FirstName:    faker.FirstName(),
			LastName:     faker.LastName(),
		}
		users = append(users, user)
	}

	if err := db.Create(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}
