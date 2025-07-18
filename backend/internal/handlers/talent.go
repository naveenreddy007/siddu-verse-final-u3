package handlers

import (
	"net/http"
	"siddu-verse-backend/internal/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// isProfileOwner checks if the authenticated user is the owner of the talent profile.
func isProfileOwner(db *gorm.DB, userID uint, profileID string) bool {
	var profile models.TalentProfile
	profileIDUint, err := strconv.ParseUint(profileID, 10, 32)
	if err != nil {
		return false
	}

	if err := db.First(&profile, uint(profileIDUint)).Error; err != nil {
		return false
	}
	return profile.UserID == userID
}

// isCastingCallOwner checks if the authenticated user is the one who posted the casting call.
func isCastingCallOwner(db *gorm.DB, userID uint, castingCallID string) bool {
	var call models.CastingCall
	callIDUint, err := strconv.ParseUint(castingCallID, 10, 32)
	if err != nil {
		return false
	}

	if err := db.First(&call, uint(callIDUint)).Error; err != nil {
		return false
	}
	return call.PostedByUserID == userID
}

// --- Talent Profile Handlers ---

type CreateTalentProfileInput struct {
	FullName string `json:"fullName" binding:"required"`
	Headline string `json:"headline"`
	Bio      string `json:"bio"`
}

func (h *BaseHandler) CreateTalentProfile(c *gin.Context) {
	var input CreateTalentProfileInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// Check if user already has a talent profile
	var existingProfile models.TalentProfile
	if h.DB.First(&existingProfile, "user_id = ?", userID.(uint)).Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User already has a talent profile"})
		return
	}

	profile := models.TalentProfile{
		UserID:   userID.(uint),
		FullName: input.FullName,
		Headline: input.Headline,
		Bio:      input.Bio,
	}

	if result := h.DB.Create(&profile); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create talent profile"})
		return
	}

	c.JSON(http.StatusCreated, profile)
}

func (h *BaseHandler) UpdateTalentProfile(c *gin.Context) {
	profileID := c.Param("id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to update this profile"})
		return
	}

	var profile models.TalentProfile
	if err := h.DB.First(&profile, profileID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	var input CreateTalentProfileInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.DB.Model(&profile).Updates(models.TalentProfile{
		FullName: input.FullName,
		Headline: input.Headline,
		Bio:      input.Bio,
	})

	c.JSON(http.StatusOK, profile)
}

func (h *BaseHandler) GetTalentProfiles(c *gin.Context) {
	var profiles []models.TalentProfile
	if result := h.DB.Find(&profiles); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch talent profiles"})
		return
	}
	c.JSON(http.StatusOK, profiles)
}

func (h *BaseHandler) GetTalentProfileByID(c *gin.Context) {
	id := c.Param("id")
	var profile models.TalentProfile
	if result := h.DB.Preload("Skills").Preload("Experiences").Preload("Portfolio").First(&profile, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Talent profile not found"})
		return
	}
	c.JSON(http.StatusOK, profile)
}

// --- Skills Handlers ---

func (h *BaseHandler) AddSkillToProfile(c *gin.Context) {
	profileID := c.Param("id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	var skill models.Skill
	if err := c.ShouldBindJSON(&skill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	profileIDUint, _ := strconv.ParseUint(profileID, 10, 32)
	skill.TalentProfileID = uint(profileIDUint)

	if err := h.DB.Create(&skill).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add skill"})
		return
	}

	c.JSON(http.StatusCreated, skill)
}

func (h *BaseHandler) RemoveSkillFromProfile(c *gin.Context) {
	profileID := c.Param("id")
	skillID := c.Param("skill_id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	if err := h.DB.Delete(&models.Skill{}, skillID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove skill"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Skill removed successfully"})
}

// --- Experience Handlers ---

func (h *BaseHandler) AddExperienceToProfile(c *gin.Context) {
	profileID := c.Param("id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	var experience models.Experience
	if err := c.ShouldBindJSON(&experience); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	profileIDUint, _ := strconv.ParseUint(profileID, 10, 32)
	experience.TalentProfileID = uint(profileIDUint)

	if err := h.DB.Create(&experience).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add experience"})
		return
	}

	c.JSON(http.StatusCreated, experience)
}

func (h *BaseHandler) UpdateExperienceOnProfile(c *gin.Context) {
	profileID := c.Param("id")
	expID := c.Param("exp_id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	var experience models.Experience
	if err := h.DB.First(&experience, expID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Experience not found"})
		return
	}

	var input models.Experience
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	h.DB.Model(&experience).Updates(input)
	c.JSON(http.StatusOK, experience)
}

func (h *BaseHandler) RemoveExperienceFromProfile(c *gin.Context) {
	profileID := c.Param("id")
	expID := c.Param("exp_id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	if err := h.DB.Delete(&models.Experience{}, expID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove experience"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Experience removed successfully"})
}

// --- Portfolio Handlers ---

func (h *BaseHandler) AddPortfolioItem(c *gin.Context) {
	profileID := c.Param("id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	var item models.PortfolioItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	profileIDUint, _ := strconv.ParseUint(profileID, 10, 32)
	item.TalentProfileID = uint(profileIDUint)

	if err := h.DB.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add portfolio item"})
		return
	}

	c.JSON(http.StatusCreated, item)
}

func (h *BaseHandler) RemovePortfolioItem(c *gin.Context) {
	profileID := c.Param("id")
	itemID := c.Param("item_id")
	userID, _ := c.Get("userID")

	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to modify this profile"})
		return
	}

	if err := h.DB.Delete(&models.PortfolioItem{}, itemID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove portfolio item"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Portfolio item removed successfully"})
}

// --- Casting Call Handlers ---

type CreateCastingCallInput struct {
	ProjectTitle string `json:"projectTitle" binding:"required"`
	ProjectType  string `json:"projectType"`
	Description  string `json:"description"`
}

func (h *BaseHandler) CreateCastingCall(c *gin.Context) {
	var input CreateCastingCallInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	castingCall := models.CastingCall{
		PostedByUserID: userID.(uint),
		ProjectTitle:   input.ProjectTitle,
		ProjectType:    input.ProjectType,
		Description:    input.Description,
	}

	if result := h.DB.Create(&castingCall); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create casting call"})
		return
	}

	c.JSON(http.StatusCreated, castingCall)
}

func (h *BaseHandler) GetCastingCalls(c *gin.Context) {
	var calls []models.CastingCall
	if result := h.DB.Preload("PostedByUser").Find(&calls); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch casting calls"})
		return
	}
	c.JSON(http.StatusOK, calls)
}

func (h *BaseHandler) GetCastingCallByID(c *gin.Context) {
	id := c.Param("id")
	var call models.CastingCall
	if result := h.DB.Preload("PostedByUser").Preload("Roles").First(&call, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Casting call not found"})
		return
	}
	c.JSON(http.StatusOK, call)
}

// --- Application Handlers ---

type ApplyToCastingCallInput struct {
	CoverLetter string `json:"coverLetter"`
}

func (h *BaseHandler) ApplyToCastingCall(c *gin.Context) {
	userID, _ := c.Get("userID")
	castingCallIDStr := c.Param("id")

	var input ApplyToCastingCallInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 1. Find the user's talent profile
	var talentProfile models.TalentProfile
	if err := h.DB.First(&talentProfile, "user_id = ?", userID.(uint)).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "User must have a talent profile to apply."})
		return
	}

	castingCallID, _ := strconv.ParseUint(castingCallIDStr, 10, 32)

	// 2. Check if already applied
	var existingApplication models.Application
	err := h.DB.First(&existingApplication, "talent_profile_id = ? AND casting_call_id = ?", talentProfile.ID, uint(castingCallID)).Error
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "You have already applied to this casting call."})
		return
	}

	// 3. Create new application
	application := models.Application{
		TalentProfileID: talentProfile.ID,
		CastingCallID:   uint(castingCallID),
		CoverLetter:     input.CoverLetter,
		Status:          "pending",
	}

	if result := h.DB.Create(&application); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit application."})
		return
	}

	c.JSON(http.StatusCreated, application)
}

func (h *BaseHandler) GetApplicationsForCastingCall(c *gin.Context) {
	userID, _ := c.Get("userID")
	castingCallID := c.Param("id")

	// Verify the user owns the casting call
	if !isCastingCallOwner(h.DB, userID.(uint), castingCallID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to view applications for this casting call."})
		return
	}

	var applications []models.Application
	if err := h.DB.Preload("TalentProfile").Where("casting_call_id = ?", castingCallID).Find(&applications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch applications."})
		return
	}

	c.JSON(http.StatusOK, applications)
}

func (h *BaseHandler) GetMyApplications(c *gin.Context) {
	userID, _ := c.Get("userID")
	profileID := c.Param("id")

	// Verify the user owns the profile they are requesting applications for
	if !isProfileOwner(h.DB, userID.(uint), profileID) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to view these applications."})
		return
	}

	var applications []models.Application
	if err := h.DB.Preload("CastingCall").Where("talent_profile_id = ?", profileID).Find(&applications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch your applications."})
		return
	}

	c.JSON(http.StatusOK, applications)
}

type UpdateApplicationStatusInput struct {
	Status string `json:"status" binding:"required,oneof=shortlisted rejected hired pending"`
}

func (h *BaseHandler) UpdateApplicationStatus(c *gin.Context) {
	userID, _ := c.Get("userID")
	appID := c.Param("app_id")

	var input UpdateApplicationStatusInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the application
	var application models.Application
	if err := h.DB.First(&application, appID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Application not found."})
		return
	}

	// Verify the current user owns the casting call associated with the application
	castingCallIDStr := strconv.FormatUint(uint64(application.CastingCallID), 10)
	if !isCastingCallOwner(h.DB, userID.(uint), castingCallIDStr) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to update this application."})
		return
	}

	// Update the status
	if err := h.DB.Model(&application).Update("status", input.Status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update application status."})
		return
	}

	c.JSON(http.StatusOK, application)
}

func (h *BaseHandler) GetApplicationByID(c *gin.Context) {
	userID, _ := c.Get("userID")
	appID := c.Param("app_id")

	var application models.Application
	if err := h.DB.Preload("TalentProfile").Preload("CastingCall").First(&application, appID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Application not found."})
		return
	}

	// Check if user is the applicant
	isApplicant := application.TalentProfile.UserID == userID.(uint)

	// Check if user is the recruiter
	castingCallIDStr := strconv.FormatUint(uint64(application.CastingCallID), 10)
	isRecruiter := isCastingCallOwner(h.DB, userID.(uint), castingCallIDStr)

	if !isApplicant && !isRecruiter {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to view this application."})
		return
	}

	c.JSON(http.StatusOK, application)
}
