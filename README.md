# Northcoders News Backend

This is the backend API for the Northcoders News project.
Built with Node.js, Express, and PostgreSQL, this RESTful API supports a news platform where users can browse topics, read articles, and post comments. It manages data for users, topics, articles, and comments, enabling seamless interaction with the news content.

# API Endpoints
| Endpoint          | Description                         |
|-------------------|-----------------------------------|
| GET /api/topics   | Fetch all topics                   |
| GET /api/articles | Fetch all articles                 |
| POST /api/comments| Add a comment to an article       |


# Live Demo:
https://northcoders-news-backend-1.onrender.com/api

## Prerequisites
- Node.js v16 or higher
- PostgreSQL 12 or higher

# To clone:
git clone https://github.com/your-username/northcoders-news-backend.git
cd northcoders-news-backend

Make sure you have Node.js and PostgreSQL installed:
npm install


Set Up Environment Variables:
To run this project locally, you need to create the following environment files in the root of the project:

For .env.development:
PGUSER=your_postgres_username
PGPASSWORD=your_postgres_password
PGHOST=localhost
PGDATABASE=your_dev_database_name
PGPORT=5432

For .env.test:
PGDATABASE=your_dev_database_name_test

These files are ignored by Git, so you must create them manually.

# Running the Server
Ensure your PostgreSQL server is running locally.
To run the seed script:
npm run seed

# To run the tests using Jest with:
npm test
