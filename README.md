# PeopleCore

PeopleCore is a full stack employee management application built to centralize workforce records in a clean, production-oriented interface. The platform supports employee creation, reading, updating, and deletion through a connected frontend, backend, and relational database.

## Overview

This project was developed as a business-focused CRUD solution for HR and internal operations use cases. It combines a modern React interface with a Node.js and Express API, connected to MySQL for persistent data storage.

The application demonstrates:
- end-to-end full stack integration
- form validation and business rules
- cloud deployment across frontend, backend, and database services
- a portfolio-ready UI with real online accessibility

## Core Features

- employee directory with searchable tabular view
- create, read, update, and delete employee records
- form validations for age, gender, email, and salary formatting
- individual employee detail pages
- responsive and visually polished interface
- production deployment with public access

## Tech Stack

### Frontend
- React
- Axios
- React Router
- CSS

### Backend
- Node.js
- Express
- mysql2
- CORS

### Database and Deployment
- MySQL
- Vercel
- Render
- Railway

## Architecture

PeopleCore follows a classic three-layer full stack structure:

1. `client/`
Frontend application built with React.
Responsible for UI rendering, routing, and API consumption.

2. `server/`
REST API built with Express.
Responsible for employee CRUD operations and database communication.

3. `MySQL database`
Persistent employee storage hosted online.

## Business Rules Implemented

- `Gender` is restricted to predefined options
- `Age` must be 18 or older
- `Salary` is formatted as currency during input
- `Email` follows a controlled validation format

## Public Demo

- Frontend: [PeopleCore Live Demo](https://peoplecore-xi.vercel.app)
- Backend API: [PeopleCore API](https://peoplecore-1.onrender.com/empleados)

## Repository Structure

```text
Proyecto-empleados/
├── client/
│   ├── public/
│   └── src/
│       ├── elements/
│       ├── api.js
│       ├── App.js
│       ├── App.css
│       └── utils.js
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Local Setup

### Frontend
```bash
cd client
npm install
npm start
```

### Backend
```bash
cd server
npm install
npm start
```

## Environment Variables

The backend expects database configuration through environment variables.
Use `server/.env.example` as a reference.

## Why This Project Matters

PeopleCore was built not just as a local CRUD exercise, but as a complete full stack application with real deployment, real data persistence, and a professional UI. It is designed to demonstrate practical software development skills relevant for IT roles, especially around frontend-backend integration, validation logic, and deployment readiness.
