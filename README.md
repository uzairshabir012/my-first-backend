# Spotify Clone Backend API

A simple Spotify-style backend built with **Node.js**, **Express**, and **MongoDB**. This project allows users to register, login, upload music (artists only), create albums, and manage music.

---

## Features

- User Registration
- User Login & Logout
- JWT Authentication
- Role-based Authorization (User / Artist)
- Upload Music
- Create Album
- Get All Music
- Get All Albums
- Get Album by ID
- Update Music
- Delete Music
- Delete Album

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer
- ImageKit

---

## Folder Structure

```
project/
│
├── server.js
├── package.json
├── .env
│
└── src/
    ├── app.js
    ├── controllers/
    ├── db/
    ├── middleware/
    ├── models/
    ├── routes/
    └── services/
```

---

## Installation

### 1. Clone the project

```bash
git clone <repository-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
PORT=3000
```

### 4. Start the server

```bash
node server.js
```

Server will run on:

```
http://localhost:3000
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| POST   | /api/auth/logout   |

### Music

| Method | Endpoint                   |
| ------ | -------------------------- |
| POST   | /api/music/create-music    |
| POST   | /api/music/create-album    |
| GET    | /api/music                 |
| GET    | /api/music/albums          |
| GET    | /api/music/albums/:albumID |
| PATCH  | /api/music/:id             |
| DELETE | /api/music/:id             |
| DELETE | /api/music/album/:id       |

---

## User Roles

There are two user roles:

- User
- Artist

Only **Artist** can:

- Upload Music
- Create Album
- Update Music
- Delete Music
- Delete Album

---

## Future Improvements

- Add Pagination
- Improve Validation
- Add Search Feature
- Add Unit Testing

---

## Author

Created by **Uzair** for learning Node.js, Express.js, MongoDB, JWT Authentication, and REST APIs.
