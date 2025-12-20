Sociax

Sociax is a full-stack social media web application built using the MERN stack, designed to replicate core features of modern social platforms while following scalable and maintainable software architecture.

The application allows users to create accounts, interact with posts, connect with other users, and manage their profiles through a clean and responsive interface.

🚀 Features

User authentication with secure login and signup

Protected routes for authenticated users

Create and view posts with image and caption support

Like and comment on posts

Follow and unfollow other users

Personalized user profiles

Infinite scrolling feed with pagination

Account settings with password change functionality

🧱 Architecture Overview
Frontend

The frontend is built with React and follows a feature-based architecture for better scalability.
State management is handled using Redux Toolkit, ensuring predictable global state and clean async handling.
Tailwind CSS is used for styling to achieve a responsive and modern UI.

Key frontend concepts used:

Redux Toolkit slices and async thunks

Protected routing with React Router

Reusable UI components

Custom hooks for infinite scrolling

Centralized Axios API configuration

Backend

The backend is structured using Node.js and Express, following a modular and scalable REST API design.
Authentication is handled using JWT, and data is stored in MongoDB.

Backend responsibilities include:

User authentication and authorization

Post, comment, and follow management

Secure password handling

API endpoints for frontend consumption

🛠 Tech Stack

Frontend

React

Redux Toolkit

Tailwind CSS

React Router

Axios

Backend

Node.js

Express

MongoDB

JWT Authentication

📁 Project Structure

This project uses a monorepo structure:

sociax/
├── client/ // Frontend application
└── server/ // Backend API

This setup simplifies development, version control, and deployment while keeping frontend and backend responsibilities clearly separated.

🎯 Purpose of the Project

Sociax was built to demonstrate real-world full-stack development practices, including:

Clean code organization

Scalable state management

Secure authentication flows

RESTful API design

Modern frontend patterns

The project is suitable for portfolio showcasing and technical interviews.

📌 Future Improvements

Image upload using cloud storage

Real-time notifications

User search functionality

Post editing and deletion

Improved UI animations and performance optimizations
