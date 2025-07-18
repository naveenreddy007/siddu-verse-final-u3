# Go Backend Development Plan for Siddu-Verse

This document outlines the detailed plan for developing the Go backend for the Siddu-Verse project. The backend will initially operate with in-memory seed data, with a clear path for future integration with a PostgreSQL database using GORM. This plan is designed for an AI agent to autonomously build the backend, emphasizing modularity, performance, and scalability.

## 1. Project Setup and Structure

**Objective:** Establish a well-organized Go module within the project, ensuring a clear separation of concerns and ease of development.

**To-Do List:**
- [ ] Create a new directory named `backend/` at the root of the `siddu-verse-final-u3` project (i.e., `c:\Users\bilvalabs\Music\siddu\siddu-verse-final-u3\backend`).
- [ ] Initialize a new Go module within the `backend/` directory using the command: `go mod init siddu-verse-backend`.
- [ ] Establish the following directory structure within `backend/`:
    - `cmd/`: Contains the main application entry point.
        - `main.go`: The primary file for server initialization and startup.
    - `internal/`: Houses the core business logic, ensuring it's not directly importable by external projects.
        - `models/`: Defines the data structures (structs) for various entities.
        - `handlers/`: Implements the logic for handling API requests.
        - `seed/`: Manages in-memory seed data for development and testing.
        - `middleware/`: Contains custom middleware functions (e.g., CORS, authentication).
    - `pkg/`: For reusable, shareable packages that might be used across different parts of the backend or even other projects (if applicable, otherwise can be omitted initially).
    - `api/`: Defines API routes and potentially API versioning.
        - `routes.go`: Centralizes the definition of all API endpoints.
- [ ] Configure the backend to run on a dedicated port (e.g., `8080`) to avoid conflicts with the Next.js frontend and facilitate inter-service communication.

## 2. Dependencies and Tools

**Objective:** Install necessary Go libraries to support web framework functionalities and future ORM integration, while initially focusing on in-memory data handling.

**To-Do List:**
- [ ] Install the Gin web framework for handling HTTP requests and routing:
    ```bash
    go get github.com/gin-gonic/gin
    ```
- [ ] Install GORM, the ORM library for Go, to prepare for future database interactions (even though it won't be actively used with a database initially):
    ```bash
    go get github.com/jinzhu/gorm
    ```
- [ ] Consider installing `golang.org/x/crypto` if any cryptographic operations (e.g., password hashing) are anticipated for user management, even with seed data.
    ```bash
    go get golang.org/x/crypto
    ```
- [ ] Ensure `go.mod` and `go.sum` files are correctly updated after installing dependencies.
- [ ] Maintain a lean dependency list to optimize AI-driven development and minimize overhead.

## 3. Define Models and Seed Data

**Objective:** Create Go structs that represent the data entities required by the frontend and populate them with in-memory seed data to simulate a database.

**To-Do List:**
- [ ] Define Go structs in `internal/models/` for key entities based on the frontend's data consumption patterns. Examples include:
    - `Movie`: `ID`, `Title`, `Genre`, `ReleaseDate`, `Ratings`, `Description`, `Cast`, `Director`, `PosterURL`.
    - `CricketMatch`: `ID`, `Team1`, `Team2`, `Date`, `Time`, `Venue`, `Status` (`Upcoming`, `Live`, `Completed`), `Scorecard` (nested struct or map), `HighlightsURL`.
    - `User`: `ID`, `Username`, `Email`, `PasswordHash` (for future authentication), `Role` (`Admin`, `Regular`), `Preferences`.
    - `TalentProfile`: `ID`, `Name`, `Skills` (array of strings), `Experience`, `Bio`, `PortfolioURL`, `ContactInfo`.
    - `Award`: `ID`, `Name`, `Category`, `Year`, `Winner`, `Nominees`.
- [ ] Implement seed data generation in `internal/seed/seed.go`.
    - [ ] Create global variables (e.g., slices of the defined structs) to hold the in-memory data.
    - [ ] Develop a `LoadSeedData()` function that populates these global variables with realistic mock data. This data should align with the types of mock data currently used or expected by the Next.js frontend (e.g., `components/collections/mock-data.ts`, `components/cricket/mock-data.ts`).
    - [ ] Ensure the `LoadSeedData()` function is called once during application startup (e.g., in `cmd/main.go`) to initialize the in-memory store.

## 4. API Endpoints and Handlers

**Objective:** Implement RESTful API endpoints using Gin and create corresponding handlers that serve data from the in-memory seed store.

**To-Do List:**
- [ ] Define API routes in `api/routes.go`.
    - [ ] Map specific URL paths to handler functions.
    - [ ] Examples of required endpoints:
        - `GET /api/movies`: Retrieve a list of all movies.
        - `GET /api/movies/:id`: Retrieve details for a specific movie.
        - `POST /api/movies`: Add a new movie (for demonstration/testing with seed data).
        - `GET /api/cricket/matches`: Retrieve a list of cricket matches.
        - `GET /api/cricket/matches/:id`: Retrieve details for a specific match.
        - `GET /api/talent/profiles`: Retrieve a list of talent profiles.
        - `GET /api/talent/profiles/:id`: Retrieve details for a specific talent profile.
        - `POST /api/talent/profiles`: Create a new talent profile.
        - `GET /api/users/:id`: Retrieve user profile (for admin/self-view).
- [ ] Implement handler functions in `internal/handlers/` for each defined API endpoint.
    - [ ] These handlers will interact directly with the in-memory seed data (e.g., filtering slices, retrieving elements by ID).
    - [ ] Ensure all responses are formatted as JSON using `c.JSON()` from Gin.
    - [ ] Handle common HTTP status codes (e.g., `200 OK`, `201 Created`, `404 Not Found`, `500 Internal Server Error`).

## 5. Security and Best Practices

**Objective:** Incorporate fundamental security measures and adhere to Go best practices to ensure a robust and maintainable backend.

**To-Do List:**
- [ ] Implement CORS (Cross-Origin Resource Sharing) middleware to allow the Next.js frontend to make requests to the Go backend. This should be configured in `internal/middleware/cors.go` and applied in `api/routes.go`.
- [ ] For future authentication, consider a basic in-memory user authentication system using seed user data (e.g., simple username/password check for admin routes).
- [ ] Implement centralized error handling to provide consistent and informative error responses to the frontend.
- [ ] Ensure all code adheres to Go's idiomatic conventions and best practices (e.g., proper error handling, clear variable names, modular functions).
- [ ] Document API endpoints and expected request/response formats, possibly in a separate `API_DOCS.md` file within the `backend/` directory.

## 6. Testing and Integration

**Objective:** Verify the functionality of the backend components and prepare for seamless integration with the frontend and future database connections.

**To-Do List:**
- [ ] Write unit tests for handler functions in `internal/handlers/` using Go's built-in testing package. Focus on testing API responses and data manipulation with seed data.
- [ ] Set up a simple `main.go` in `cmd/` to start the Gin server.
- [ ] Verify API endpoints manually using tools like `curl` or Postman to ensure they return the expected seed data.
- [ ] Document the process for running the backend server and accessing its endpoints.
- [ ] **Future Integration Point:** Clearly mark sections in the code where the in-memory seed data logic will be replaced with GORM-based database interactions (specifically with PostgreSQL) once a real database connection is established. This will involve:
    - [ ] Modifying models to include GORM tags.
    - [ ] Implementing database connection logic.
    - [ ] Replacing direct seed data access with GORM queries.
    - [ ] Migrating seed data to initial database seeding scripts.

This detailed plan provides a clear roadmap for your AI agent to construct the Go backend efficiently, ensuring it meets the project's current needs while being prepared for future enhancements.