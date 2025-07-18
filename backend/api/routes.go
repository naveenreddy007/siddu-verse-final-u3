package api

import (
	"siddu-verse-backend/internal/handlers"
	"siddu-verse-backend/internal/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SetupRoutes configures all the API endpoints and injects the database dependency.
func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	// Apply CORS middleware to all routes
	router.Use(middleware.CORS())

	// Create a new handler instance with the database connection
	h := handlers.NewBaseHandler(db)

	// Group API routes under /api
	apiGroup := router.Group("/api")
	{
		// --- Public Routes ---
		auth := apiGroup.Group("/auth")
		{
			auth.POST("/register", h.RegisterUser)
			auth.POST("/login", h.LoginUser)
		}

		// Publicly accessible GET routes
		apiGroup.GET("/movies", h.GetMovies)
		apiGroup.GET("/movies/:id", h.GetMovieByID)
		apiGroup.GET("/awards", h.GetAwards)
		apiGroup.GET("/awards/:id", h.GetAwardByID)
		apiGroup.GET("/cricket/matches", h.GetCricketMatches)
		apiGroup.GET("/cricket/matches/:id", h.GetCricketMatchByID)
		apiGroup.GET("/talent/profiles", h.GetTalentProfiles)
		apiGroup.GET("/talent/profiles/:id", h.GetTalentProfileByID)
		apiGroup.GET("/talent/casting-calls", h.GetCastingCalls)
		apiGroup.GET("/talent/casting-calls/:id", h.GetCastingCallByID)
		apiGroup.GET("/pulses", h.GetPulses)
		apiGroup.GET("/users/:id", h.GetUserByID) // Public user profile

		// --- Protected Routes ---
		authed := apiGroup.Group("/")
		authed.Use(middleware.AuthMiddleware())
		{
			// Protected Award routes
			authed.POST("/awards", h.CreateAward)
			authed.PUT("/awards/:id", h.UpdateAward)
			authed.DELETE("/awards/:id", h.DeleteAward)

			// Protected Movie routes
			authed.POST("/movies", h.CreateMovie)

			// Protected Talent Hub routes
			talent := authed.Group("/talent")
			{
				// Profile Management
				profiles := talent.Group("/profiles")
				{
					profiles.POST("", h.CreateTalentProfile)
					profiles.PUT("/:id", h.UpdateTalentProfile) // Update own profile

					// Skills Management
					profiles.POST("/:id/skills", h.AddSkillToProfile)
					profiles.DELETE("/:id/skills/:skill_id", h.RemoveSkillFromProfile)

					// Experience Management
					profiles.POST("/:id/experience", h.AddExperienceToProfile)
					profiles.PUT("/:id/experience/:exp_id", h.UpdateExperienceOnProfile)
					profiles.DELETE("/:id/experience/:exp_id", h.RemoveExperienceFromProfile)

					// Portfolio Management
					profiles.POST("/:id/portfolio", h.AddPortfolioItem)
					profiles.DELETE("/:id/portfolio/:item_id", h.RemovePortfolioItem)

					// Get applications submitted by this profile
					profiles.GET("/:id/applications", h.GetMyApplications)
				}

				// Casting Call Management
				casting := talent.Group("/casting-calls")
				{
					casting.POST("", h.CreateCastingCall)
					// Apply to a casting call
					casting.POST("/:id/apply", h.ApplyToCastingCall)
					// Get applications for a specific casting call (for recruiter)
					casting.GET("/:id/applications", h.GetApplicationsForCastingCall)
				}

				// Direct Application Management (for recruiter or applicant)
				applications := talent.Group("/applications")
				{
					applications.GET("/:app_id", h.GetApplicationByID)
					applications.PUT("/:app_id", h.UpdateApplicationStatus)
				}
			}

			// Protected Social Pulse routes
			pulses := authed.Group("/pulses")
			{
				pulses.POST("", h.CreatePulse)
				pulses.POST("/:id/like", h.LikePulse)
				pulses.POST("/:id/comment", h.CommentOnPulse)
			}
		}
	}
}
