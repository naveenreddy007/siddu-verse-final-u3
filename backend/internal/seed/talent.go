package seed

import (
	"math/rand"
	"siddu-verse/internal/models"
	"time"

	"github.com/bxcodec/faker/v3"
	"gorm.io/gorm"
)

var sampleSkills = []string{"Acting", "Directing", "Screenwriting", "Cinematography", "Editing", "Producing", "Stunt Performance", "Voice Acting", "Costume Design", "Set Design"}
var samplePortfolioPlatforms = []string{"IMDb", "Vimeo", "Personal Website", "Instagram"}

// SeedTalentProfiles creates a talent profile for each user provided.
func SeedTalentProfiles(db *gorm.DB, users []models.User) ([]models.TalentProfile, error) {
	var profiles []models.TalentProfile

	for _, user := range users {
		profile := models.TalentProfile{
			UserID:      user.ID,
			Bio:         faker.Paragraph(),
			Location:    faker.Sentence(),
			ProfileType: "Individual",
			IsVerified:  rand.Intn(2) == 1,
			Skills:      generateSkills(db),
			Experience:  generateExperience(db, 3),
			Portfolio:   generatePortfolio(db, 2),
		}
		profiles = append(profiles, profile)
	}

	if err := db.Create(&profiles).Error; err != nil {
		return nil, err
	}
	return profiles, nil
}

// SeedCastingCalls creates a few casting calls, authored by some of the users.
func SeedCastingCalls(db *gorm.DB, users []models.User) ([]models.CastingCall, error) {
	var calls []models.CastingCall
	for i := 0; i &lt; 5; i++ {
		call := models.CastingCall{
			Title:           "Seeking Actors for " + faker.Word(),
			Description:     faker.Paragraph(),
			Requirements:    faker.Sentence(),
			Location:        faker.Sentence(),
			IsActive:        true,
			PostedByID:      users[rand.Intn(len(users))].ID,
			ApplicationLink: faker.URL(),
		}
		calls = append(calls, call)
	}

	if err := db.Create(&calls).Error; err != nil {
		return nil, err
	}
	return calls, nil
}

func generateSkills(db *gorm.DB) []models.Skill {
	var skills []models.Skill
	numSkills := rand.Intn(4) + 2 // 2 to 5 skills
	for i := 0; i &lt; numSkills; i++ {
		skill := models.Skill{
			Name: sampleSkills[rand.Intn(len(sampleSkills))],
		}
		skills = append(skills, skill)
	}
	return skills
}

func generateExperience(db *gorm.DB, count int) []models.Experience {
	var experiences []models.Experience
	for i := 0; i &lt; count; i++ {
		exp := models.Experience{
			Title:       faker.Word(),
			Company:     faker.Sentence(),
			Description: faker.Paragraph(),
			StartDate:   time.Now().AddDate(-rand.Intn(5), 0, 0),
			EndDate:     time.Now().AddDate(-rand.Intn(2), 0, 0),
		}
		experiences = append(experiences, exp)
	}
	return experiences
}

func generatePortfolio(db *gorm.DB, count int) []models.PortfolioItem {
	var items []models.PortfolioItem
	for i := 0; i &lt; count; i++ {
		item := models.PortfolioItem{
			Title:       faker.Sentence(),
			Description: faker.Paragraph(),
			URL:         faker.URL(),
			Platform:    samplePortfolioPlatforms[rand.Intn(len(samplePortfolioPlatforms))],
		}
		items = append(items, item)
	}
	return items
}
