# Sudan University of Science and Technology
### College of Computer Science and Information Technology
*Developed by Abeer Yasser*

# Alzikrayat (MERN Edition)

This is my project for the Advanced Web Technologies course. It is a photo-sharing website built using the MERN stack.

## Technologies Used
- Backend: Node.js and Express.js
- Database: MongoDB with Mongoose
- Frontend: React.js (using Vite)
- Authentication: Basic Login with bcrypt for passwords
- File Upload: Multer

## Features Implemented
- User can register and login.
- User can upload photos with a title and description.
- The gallery shows all photos and has a button to switch between grid and list views.
- Clicking on a photo opens a details page.
- Logged-in users can leave comments on photos.
- Users can only delete their own photos.
- The Navbar shows the user's name when logged in.

## How to Run the Project Locally

### 1. Server Side
Open a terminal and go to the server folder:
`cd server`

Install the packages:
`npm install`

Create a `.env` file in the server folder and add your database link:
`MONGODB_URI=your_database_link_here`
`PORT=5000`

Run the server:
`npm run dev`

### 2. Client Side
Open a new terminal and go to the client folder:
`cd client`

Install the packages:
`npm install`

Run the React app:
`npm run dev`

The website will open on http://localhost:5173

## Project Structure

Here is a quick explanation of the main folders:

- **/server**: Contains all the backend code.
  - `/models`: The database schemas (User, Photo, Comment).
  - `/controllers`: The functions that handle the logic.
  - `/routes`: The API endpoints.
  - `/middleware`: Validation codes.
  - `/uploads`: The folder where uploaded images are saved.
  - `server.js`: The main entry point for the backend.

- **/client**: Contains all the frontend code (React).
  - `/src/components`: Reusable parts like Navbar and Comment Form.
  - `/src/pages`: The main pages like Home, Gallery, and Login.
  - `/src/context`: For managing user authentication state.
  - `App.jsx`: The main file for routes (React Router).
