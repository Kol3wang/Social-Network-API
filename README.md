# Social-Network-API
Module 17 Challenge
This is a back-end API for a social network web application where users can share thoughts, react to friends’ thoughts, and manage a friend list. The API is built using TypeScript, Express.js, MongoDB, and Mongoose.

Table of Contents

	•	Installation
	•	Usage
	•	Technologies Used
	•	API Endpoints
	•	Models
	•	License

Installation

1.	Clone the repository: 
	git clone 

2.	Install dependencies:
	cd social-network-api
	npm install

3.	Set up MongoDB:
    Ensure MongoDB is running locally or provide a connection URI in the .env file (if using a remote MongoDB database).

4.	Build and Run the API:
	For development
    npx ts-node src/server.ts

Usage

1.	Run the server:
	npm start

2.	Test the API endpoints using a tool like Insomnia 

Technologies Used

	•	TypeScript: For type safety and structured code.
	•	Express.js: For routing and handling HTTP requests.
	•	MongoDB & Mongoose: For storing and managing user, thought, and reaction data.
	•	Node.js: Server runtime environment.

API Endpoints

Users

	•	GET /api/users: Retrieve all users.
	•	GET /api/users/:id: Retrieve a single user by its ID.
	•	POST /api/users: Create a new user.