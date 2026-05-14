# Fleet Management & Tourism Platform

A modern full-stack fleet and tourism management application with separate Admin and Driver portals.

## Features

- Role-based login and secure JWT authentication
- Admin dashboard with bookings, fleet, drivers, inspections, incidents, analytics
- Driver portal with trip management, inspections, incident reporting, profile updates
- PostgreSQL schema, cloud storage support, calendar booking system, real-time notifications
- Mobile-friendly responsive UI built with React + Tailwind CSS
- Backend API powered by Node.js + Express with Socket.IO notifications

## Folder structure

- `backend/` - Express server, PostgreSQL integration, authentication, API routes
- `frontend/` - Vite React application with Tailwind CSS, portal pages, UI components
- `database/` - SQL schema and seed example

## Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   npm --prefix backend install
   npm --prefix frontend install
   ```

3. Create your PostgreSQL database and apply schema:
   ```bash
   psql -d postgres -f database/schema.sql
   # Then run the backend seed script after updating .env
   node backend/seed.js
   ```

4. Start with local development servers:
   ```bash
   npm run dev
   ```

5. Visit the app:
   - Admin Portal: `http://localhost:5173/admin/login`
   - Driver Portal: `http://localhost:5173/driver/login`

## Demo credentials

- Admin: `admin@fleetapp.test` / `Admin123!`
- Driver: `driver@fleetapp.test` / `Driver123!`

## Production

- Build frontend: `npm --prefix frontend run build`
- Start backend: `npm --prefix backend run start`
