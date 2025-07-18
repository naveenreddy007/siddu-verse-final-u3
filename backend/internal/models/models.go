package models

import (
	"time"

	"gorm.io/gorm"
)

// --- Core Models ---

// User represents a user of the platform. Can be a standard user, creator, or admin.
type User struct {
	gorm.Model
	Username      string `gorm:"uniqueIndex;not null"`
	Email         string `gorm:"uniqueIndex;not null"`
	PasswordHash  string `gorm:"not null"`
	AvatarURL     string
	Role          string `gorm:"default:'user'"` // e.g., user, creator, admin
	TalentProfile TalentProfile `gorm:"foreignKey:UserID"`
}

// --- Talent Hub Models ---

// TalentProfile represents a professional profile for an actor, director, etc.
type TalentProfile struct {
	gorm.Model
	UserID      uint   `gorm:"uniqueIndex"`
	FullName    string `gorm:"not null"`
	Headline    string // e.g., "Actor | Director | Writer"
	Bio         string
	AvatarURL   string
	CoverImageURL string
	Skills      []Skill         `gorm:"foreignKey:TalentProfileID"`
	Experiences []Experience    `gorm:"foreignKey:TalentProfileID"`
	Portfolio   []PortfolioItem `gorm:"foreignKey:TalentProfileID"`
	Applications []Application  `gorm:"foreignKey:TalentProfileID"`
}

// Skill represents a specific skill for a talent profile.
type Skill struct {
	gorm.Model
	TalentProfileID uint
	Name            string `gorm:"not null"`
	Proficiency     string // e.g., "Expert", "Intermediate"
}

// Experience represents a work experience entry.
type Experience struct {
	gorm.Model
	TalentProfileID uint
	Title           string `gorm:"not null"`
	CompanyName     string
	StartDate       time.Time
	EndDate         *time.Time
	Description     string
}

// PortfolioItem represents a piece of work in the talent's portfolio.
type PortfolioItem struct {
	gorm.Model
	TalentProfileID uint
	Title           string `gorm:"not null"`
	Description     string
	MediaURL        string `gorm:"not null"` // URL to video, image, etc.
	MediaType       string // "video", "image", "audio"
}

// CastingCall represents a job posting for talent.
type CastingCall struct {
	gorm.Model
	PostedByUserID uint   `gorm:"not null"`
	PostedByUser   User   `gorm:"foreignKey:PostedByUserID"`
	ProjectTitle   string `gorm:"not null"`
	ProjectType    string // e.g., "Feature Film", "Short Film", "Web Series"
	Description    string
	IsActive       bool   `gorm:"default:true"`
	Roles          []CastingCallRole `gorm:"foreignKey:CastingCallID"`
	Applications   []Application     `gorm:"foreignKey:CastingCallID"`
}

// CastingCallRole represents a specific role within a casting call.
type CastingCallRole struct {
	gorm.Model
	CastingCallID uint
	RoleName      string `gorm:"not null"`
	Description   string
	Requirements  string // e.g., "Age: 25-35, Height: 6'0\""
}

// Application represents a talent's application to a casting call.
type Application struct {
	gorm.Model
	TalentProfileID uint `gorm:"not null"`
	CastingCallID   uint `gorm:"not null"`
	Status          string `gorm:"default:'pending'"` // pending, shortlisted, rejected, hired
	CoverLetter     string
}

// --- Social/Pulse Models ---

// Pulse represents a social media post.
type Pulse struct {
	gorm.Model
	UserID    uint   `gorm:"not null"`
	User      User   `gorm:"foreignKey:UserID"`
	Content   string `gorm:"not null"`
	MediaURL  string
	MediaType string // "image", "video"
	Likes     []Like `gorm:"polymorphic:Owner;"`
	Comments  []Comment `gorm:"polymorphic:Owner;"`
}

// Comment represents a comment on a polymorphic owner (Pulse, Movie, etc.).
type Comment struct {
	gorm.Model
	UserID    uint   `gorm:"not null"`
	User      User   `gorm:"foreignKey:UserID"`
	Content   string `gorm:"not null"`
	OwnerID   uint   `gorm:"not null"`
	OwnerType string `gorm:"not null"` // e.g., "pulses", "movies"
}

// Like represents a like on a polymorphic owner.
type Like struct {
	gorm.Model
	UserID    uint `gorm:"not null"`
	User      User `gorm:"foreignKey:UserID"`
	OwnerID   uint `gorm:"not null"`
	OwnerType string `gorm:"not null"`
}


// --- Entertainment Models ---

// Movie represents a movie entity.
type Movie struct {
	gorm.Model
	Title       string `gorm:"not null"`
	PosterURL   string
	Sidduscore  float64
	Genre       string
	ReleaseDate time.Time
	Description string
	Director    string
	Comments    []Comment `gorm:"polymorphic:Owner;"`
	Likes       []Like    `gorm:"polymorphic:Owner;"`
}

// Award represents an award ceremony and its details.
type Award struct {
	gorm.Model
	Name    string `gorm:"not null"`
	Year    int
	LogoURL string
}

// CricketMatch represents a cricket match.
type CricketMatch struct {
	gorm.Model
	Team1  string
	Team2  string
	Date   time.Time
	Venue  string
	Status string // e.g., "Upcoming", "Live", "Completed"
	Score  string
}
