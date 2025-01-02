//Set-up for the PostgreSQL Connection

const { Client } = require('dotenv').config();
//The require('dotenv').config() function loads the environment variables from the .env file into process.env.

const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

client.connect().catch(err => console.error('Connection error', err.stack));
//client.connect(): Initiates the connection to the PostgreSQL database.
//.catch(err => ...): Handles any errors that occur during the connection process. If an error occurs, it logs the error message to the console.
