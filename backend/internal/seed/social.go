package seed

import (
	"math/rand"
	"siddu-verse/internal/models"

	"github.com/bxcodec/faker/v3"
	"gorm.io/gorm"
)

// SeedSocialGraph creates pulses, comments, and likes for the provided users.
func SeedSocialGraph(db *gorm.DB, users []models.User) ([]models.Pulse, error) {
	var pulses []models.Pulse

	// Each user creates 1 to 3 pulses
	for _, user := range users {
		numPulses := rand.Intn(3) + 1
		for i := 0; i &lt; numPulses; i++ {
			pulse := models.Pulse{
				Content: faker.Paragraph(),
				UserID:  user.ID,
			}
			pulses = append(pulses, pulse)
		}
	}

	if err := db.Create(&pulses).Error; err != nil {
		return nil, err
	}

	// Each pulse gets 0 to 5 comments
	for _, pulse := range pulses {
		numComments := rand.Intn(6)
		for i := 0; i &lt; numComments; i++ {
			comment := models.Comment{
				Content: faker.Sentence(),
				PulseID: pulse.ID,
				UserID:  users[rand.Intn(len(users))].ID,
			}
			if err := db.Create(&comment).Error; err != nil {
				return nil, err
			}
		}

		// Each pulse gets 0 to 10 likes
		numLikes := rand.Intn(11)
		for i := 0; i &lt; numLikes; i++ {
			// Ensure a user doesn't like the same pulse twice
			liker := users[rand.Intn(len(users))]
			var existingLike models.Like
			res := db.Where("pulse_id = ? AND user_id = ?", pulse.ID, liker.ID).First(&existingLike)
			if res.Error == gorm.ErrRecordNotFound {
				like := models.Like{
					PulseID: pulse.ID,
					UserID:  liker.ID,
				}
				if err := db.Create(&like).Error; err != nil {
					return nil, err
				}
			}
		}
	}

	return pulses, nil
}
