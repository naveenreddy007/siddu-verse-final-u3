package handlers

import (
	"gorm.io/gorm"
)

// BaseHandler will hold a reference to the database connection
type BaseHandler struct {
	DB *gorm.DB
}

// NewBaseHandler creates a new handler with a database connection.
func NewBaseHandler(db *gorm.DB) *BaseHandler {
	return &BaseHandler{DB: db}
}
