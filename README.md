# Agent-Sync
# Project Overview
This project is a MERN-Stack based dashboard application with authentication, CSV file upload functionality, and user role management.

## Features
- **User Authentication:** Users can log in using their email and password.
- **Dashboard:** Provides access to different sections like managing agents and uploading CSV files.
- **Logout Functionality:** Users can securely log out, removing their session tokens.
- **Upload CSV:** Users can upload CSV files, which are sent to the backend.
- **Navigation:** Users can navigate between different pages easily.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/agent-sync.git
   cd agent-sync
   ```
   
2. Backend Directory :
   ```bash
   cd backend
   ```
   
3. Install dependencies :
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   
5. Frontend Directory :
   ```bash
   cd frontend
   ```
   
6. Install dependencies :
   ```bash
   npm install
   ```
7. Start the frontend:
   ```bash
   npm start
   ```

## File Structure
- **`Dashboard.js`**: Contains the main dashboard UI and logout functionality.
- **`Agent.js`**: Allow admin to add agents, and see agents lists.
- **`Login.js`**: Handles user authentication and login logic.
- **`UploadCSV.js`**: Allows users to upload CSV files.
- **`BackButton.js`**: A reusable component for navigation.

## Usage
- Start the server and open `http://localhost:3000` in the browser.
- Log in using valid credentials.
- Navigate through the dashboard and use available features.
- Upload CSV files by selecting a file and clicking the upload button.
- Log out when finished.

## API Endpoints
- **Login:** `POST /api/login` (Requires email and password)
- **Agents:** `POST /api/add` (Requires agents details)
- **Lists:** `GET /api/all` (Get Lists of Agents)
- **Upload CSV:** `POST /api/upload` (Requires file and authentication token)

## Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB
- React Router
- Tailwind CSS
- Fetch API

## Author
Developed by [Lovely Singh].
