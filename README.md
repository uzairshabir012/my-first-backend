# My Practice — Spotify-style Music Backend

A Node.js/Express REST API for a music-streaming style app. Users can register/login,
artists can upload music and organize it into albums, and everyone can browse the
public catalog.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (JSON Web Tokens) stored in HTTP-only cookies + bcrypt password hashing
- **File uploads:** Multer (in-memory) + ImageKit (cloud storage/CDN for audio files)

## Project Structure

```
├── server.js                 # Entry point — loads env, connects DB, starts server
├── src/
│   ├── app.js                 # Express app setup & route mounting
│   ├── db/db.js               # MongoDB connection
│   ├── models/                # Mongoose schemas (user, music, album)
│   ├── controllers/           # Route handler logic
│   ├── routes/                # Express routers
│   ├── middleware/             # Auth middleware (JWT verification, role checks)
│   └── services/               # External service integrations (ImageKit upload)
```

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root (see `.env.example` below):
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   Server runs on `http://localhost:3000`.

## API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint    | Description              |
|--------|-------------|--------------------------|
| POST   | `/register` | Register a new user      |
| POST   | `/login`    | Login and receive a JWT cookie |
| POST   | `/logout`   | Clear the auth cookie    |

### Music (`/api/music`)
| Method | Endpoint             | Auth required        | Description                     |
|--------|-----------------------|-----------------------|----------------------------------|
| POST   | `/create-music`       | Artist only           | Upload a music file with a title |
| POST   | `/create-album`       | Artist only           | Create an album from existing tracks |
| GET    | `/`                   | Logged-in user        | List all music tracks            |
| GET    | `/albums`             | Public                | List all albums                  |
| GET    | `/albums/:albumID`    | Logged-in user        | Get a single album by ID          |

## Roles

Users have a `role` field: `user` (default) or `artist`. Only artists can upload
music and create albums; this is enforced via the `authArtist` middleware.

## Notes / Future Improvements

- Add request validation (e.g. with `zod` or `joi`) for request bodies.
- Add automated tests.
- Add pagination for `GET /api/music` and `GET /api/music/albums`.
- Move JWT expiry/cookie options (e.g. `httpOnly`, `maxAge`) into an explicit config.
