# EmployWise Frontend Assignment

A modern, responsive user management application built with React and Tailwind CSS, powered by the [Reqres API](https://reqres.in). This app enables authentication, user listing, editing, deletion, and client-side search — all styled to match the official EmployWise brand aesthetics.

# Live Demo

View Live App : https://your-deployed-url.vercel.app

# Test Credentials

Use the credentials below to log in and test the application:
Email: eve.holt@reqres.in 
Password: cityslicka

# Features
- Login with email and password
- Paginated list of users
- Edit and delete users
- Client-side search
- Responsive UI

# Tech Stack

- React
- Tailwind CSS
- Axios
- React Router DOM
- Vercel (Hosting)

# Project Structure

src/
├── components/
│   ├── Login.jsx
│   ├── UserList.jsx
│   ├── UserCard.jsx
│   ├── UserEdit.jsx
│   ├── UI/
│   │   ├── Loader.jsx
│   │   ├── Pagination.jsx
│   │   └── Alert.jsx
├── services/
│   ├── api.js
│   └── authService.js
├── hooks/
│   ├── useAuth.js
│   └── useUsers.js
└── utils/
    └── constants.js

# Setup Instructions

```bash
git clone https://github.com/yourusername/EmployWise-App.git
cd EmployWise-App
npm install
npm start
The app will run on http://localhost:3000

# API Endpoints Used

- POST /api/login – Authenticate
- GET /api/users?page=1 – Fetch paginated users
- PUT /api/users/{id} – Update user info
- DELETE /api/users/{id} – Delete user
- API Base: https://reqres.in

# Author
Built with ❤️ as part of the EmployWise frontend internship assignment.




