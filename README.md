# Courseify

**Built as per the Harkirat Week 8 Assignment**

Courseify is a simple course management and purchase platform. Administrators can create and manage courses; students can register, browse courses, and purchase access. This repository contains both backend (Node.js/Express/MongoDB) and frontend (React) components.

---

## Features

| Feature                     | Description                                                                          |
|-----------------------------|--------------------------------------------------------------------------------------|
| User Roles & Authentication | Admins can manage courses; Students can register/login, browse, and purchase.        |
| Course Management           | Each course has a title, description, price, and content URL, with timestamps.       |
| Purchase Flow               | Purchases record `purchasedAt`, `validTill`, and reference both `User` and `Course`. |
| Security                    | Password hashing (bcrypt), JWT authentication, and role-based access.                 |

---

## Database Schema

| Model       | Field         | Type                               | Description                              |
|-------------|---------------|------------------------------------|------------------------------------------|
| **Admin**   | `email`       | String, required, unique           | Admin’s login email                      |
|             | `password`    | String, required                   | Hashed password                          |
|             | `role`        | String, default `"admin"`          | User role                                |
| **User**    | `email`       | String, required, unique           | Student’s login email                    |
|             | `password`    | String, required                   | Hashed password                          |
|             | `role`        | String, default `"student"`        | User role                                |
| **Course**  | `title`       | String, required                   | Course title                             |
|             | `description` | String, required                   | Course description                       |
|             | `price`       | Number, required                   | Course price                             |
|             | `contentUrl`  | String, required                   | URL to course content                    |
|             | `createdAt`   | Date, auto-generated               | Timestamp when created                   |
|             | `updatedAt`   | Date, auto-generated               | Timestamp when updated                   |
| **Purchase**| `userId`      | ObjectId, ref `"User"`, required   | Reference to purchasing user             |
|             | `courseId`    | ObjectId, ref `"Course"`, required | Reference to purchased course            |
|             | `purchasedAt` | Date, default `Date.now`           | Purchase date                            |
|             | `validTill`   | Date, required                     | Subscription validity end date           |

---

## Tech Stack

| Component | Technologies                                                                   |
|-----------|--------------------------------------------------------------------------------|
| Backend   | Node.js, Express.js, MongoDB, Mongoose, bcrypt, JSON Web Tokens (JWT)         |
| Frontend  | React, React Router, Axios, Material-UI (or equivalent)                       |
| DevOps    | npm, GitHub, (Optional: Heroku, Vercel, Netlify)                              |

---

## Project Structure

| Path                         | Contents                                                                                                                                      |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `Courseify-backend/`         | `controllers/`, `models/`, `routes/`, `middleware/`, `config/`, `.env.example`, `server.js`, `package.json`                                  |
| ├── `controllers/`           | Express route handlers                                                                                                                         |
| ├── `models/`                | `Admin.js`, `User.js`, `Course.js`, `Purchase.js` (Mongoose schemas)                                                                          |
| ├── `routes/`                | API route definitions                                                                                                                          |
| ├── `middleware/`            | `auth.js` (JWT middleware)                                                                                                                     |
| ├── `config/`                | `db.js` (MongoDB connection)                                                                                                                   |
| ├── `.env.example`           | Example environment variables                                                                                                                  |
| ├── `server.js`              | Entry point                                                                                                                                   |
| └── `package.json`           | Dependencies and scripts                                                                                                                       |
| `Courseify-frontend/`        | `public/`, `src/`, `.env.example`, `package.json`                                                                                              |
| ├── `public/`                | `index.html`                                                                                                                                   |
| ├── `src/`                   | `components/`, `pages/`, `services/`, `App.js`, `index.js`, `styles/`                                                                          |
| ├── `.env.example`           | Example frontend environment variables                                                                                                         |
| └── `package.json`           | Dependencies and scripts                                                                                                                       |
| `.gitignore`                 | Files/folders to ignore                                                                                                                        |
| `README.md`                  | This file                                                                                                                                     |

---

## Setup & Installation

| Step                         | Command                                                |
|------------------------------|--------------------------------------------------------|
| **Backend: install deps**     | `cd Courseify-backend`<br>`npm install`                |
| **Backend: copy env**         | `cp .env.example .env`                                 |
| **Backend: run dev server**   | `npm run dev`                                          |
| **Frontend: install deps**    | `cd Courseify-frontend`<br>`npm install`               |
| **Frontend: copy env**        | `cp .env.example .env`                                 |
| **Frontend: run dev**         | `npm start`                                            |

---

## Environment Variables

| File                       | Variable            | Description                                         |
|----------------------------|---------------------|-----------------------------------------------------|
| `Courseify-backend/.env`   | `MONGODB_URI`       | MongoDB connection string                           |
|                            | `JWT_SECRET`        | Secret for JWT signing                              |
|                            | `PORT`              | Backend server port (default: 5000)                 |
| `Courseify-frontend/.env`  | `REACT_APP_API_URL` | Backend API base URL (e.g. `http://localhost:5000/api`)|

---

## Scripts

| Path                       | Script         | Description                         |
|----------------------------|----------------|-------------------------------------|
| `Courseify-backend`        | `npm run dev`  | Start backend with nodemon          |
|                            | `npm start`    | Start backend in production mode    |
| `Courseify-frontend`       | `npm start`    | Start React development server      |
|                            | `npm run build`| Create optimized production build   |

---

## API Endpoints

| Method | Endpoint                     | Description                         | Protected       |
|--------|------------------------------|-------------------------------------|-----------------|
| POST   | `/api/auth/register`         | Register new user/admin             | No              |
| POST   | `/api/auth/login`            | Login and receive JWT               | No              |
| GET    | `/api/courses`               | Get all courses                     | No              |
| GET    | `/api/courses/:courseId`     | Get course by ID                    | No              |
| POST   | `/api/courses`               | Create a new course                 | Yes (Admin)     |
| PUT    | `/api/courses/:courseId`     | Update existing course              | Yes (Admin)     |
| DELETE | `/api/courses/:courseId`     | Delete a course                     | Yes (Admin)     |
| POST   | `/api/purchases`             | Purchase a course                   | Yes (Student)   |
| GET    | `/api/purchases/:userId`     | List all purchases for a user       | Yes (Student)   |

---

## Screenshots

| Name             | Screenshot                                                                                  |
|------------------|---------------------------------------------------------------------------------------------|
| Login Dashboard  | ![Login Dashboard](https://github.com/user-attachments/assets/0f6fbde9-2b06-4809-89f6-6691dc70288c) |
| Course List      | ![Course List](https://github.com/user-attachments/assets/c04717f2-7f50-4a63-9ad3-2b97dbd25c6a)       |
| Course Details   | ![Course Details](https://github.com/user-attachments/assets/7d36d41d-1183-4c99-819e-0eb5089af252)    |
| Admin Dashboard  | ![Admin Dashboard](https://github.com/user-attachments/assets/18d6331b-133f-4c79-bc09-5627a60f409c)    |

---
