Collecting workspace information# Globetrotter Challenge

Globetrotter Challenge is a fun geography quiz game that tests your knowledge of famous destinations around the world. The application features a Node.js/Express backend with MongoDB for data storage and a React frontend.

## Project Overview

The game presents players with clues about various global destinations and asks them to identify the location from multiple choices. After answering, players receive feedback and interesting facts about each destination.

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- ES Modules
- Authentication system for user tracking

### Frontend
- React
- React Router
- Axios for API requests
- CSS for styling

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up MongoDB:
   - Make sure MongoDB is installed and running locally
   - The default connection string is `mongodb://localhost:27017/globetrotter`
   - You can modify the connection string in the .env file if needed

4. Seed the database with destinations:
   ```
   node seedDestination.js
   ```

5. Start the backend server:
   ```
   npm run dev
   ```
   
   The server will run on port 5000 by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

   The React application will run on port 3000 by default.

## How to Play

1. Register with a username to start playing
2. Read the clues about a mystery destination
3. Choose your answer from multiple-choice options
4. Submit your answer and see if you're correct
5. Learn interesting facts about the destination
6. Continue playing to improve your score

## Features

- User registration and score tracking
- Random destination selection from a database of global locations
- Multiple-choice gameplay with clues
- Fun facts and trivia for each destination
- Ability to challenge friends to play the game
- Responsive design for both desktop and mobile play

## Database Structure

The game uses two main data models:

1. `Destination` model: Stores information about locations including city, country, clues, options, fun facts, and trivia.

2. `User` model: Tracks user information including username and game statistics (correct/incorrect answers).

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login (or find) a user

### Game
- GET `/api/game/destination` - Get a random destination
- POST `/api/game/answer` - Submit an answer and get feedback

## Future Enhancements

- Leaderboards to compare scores with other players
- Additional game modes and difficulty levels
- More destinations and clues
- Timed challenges
- Achievement system

Happy Globetrotting!
