# Secure Web Portal — Auth & Bookmarks API

A secure REST API backend for managing per-user bookmarks, built to practice production-style authentication: hashed passwords, JWT sessions, and third-party OAuth.

**Stack:** Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt · Passport (GitHub OAuth)

## Features
- User registration and login with **bcrypt**-hashed passwords
- **JWT**-based authentication for protected routes
- **GitHub OAuth** sign-in via `passport-github2`
- CRUD API for saving and managing bookmarks, scoped to the authenticated user
- Clean separation of concerns: `routes/`, `models/`, `config/`, `utils/`

## API
| Method | Route | Purpose |
| --- | --- | --- |
| `POST/GET` | `/api/users` | Register, log in, and manage the authenticated user |
| `GET/POST/DELETE` | `/api/bookmarks` | Create, list, and remove the current user's bookmarks |

Data models: `User`, `Bookmark` (Mongoose schemas in `models/`).

## Run locally
```bash
git clone https://github.com/Albina93/secure-web-portal.git
cd secure-web-portal
npm install

# create a .env file with:
#   PORT=3001
#   MONGO_URI=<your MongoDB connection string>
#   JWT_SECRET=<any long random string>
#   GITHUB_CLIENT_ID=<from your GitHub OAuth app>
#   GITHUB_CLIENT_SECRET=<from your GitHub OAuth app>

node server.js
# Server runs on http://localhost:3001
```

## What I learned
Wiring three auth mechanisms into one Express app clarified the difference between **authentication** (proving who you are — bcrypt/OAuth) and **authorization** (JWT gating which routes you can reach). Adding `passport-github2` on top of a local strategy meant normalizing very different user shapes into one `User` model.
