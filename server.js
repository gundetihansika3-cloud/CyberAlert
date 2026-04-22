require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

const app = express(); // <--- YOU MUST INITIALIZE APP FIRST!
app.use(express.json()); // Allows your server to parse incoming JSON data

// Database connection
const db = mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

// Add this line to serve static files from your project root
app.use(express.static(__dirname)); 

// Now your existing routes will work
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// Change this section in your server.js
const PORT = process.env.PORT || 8080; 

// IMPORTANT: Bind to 0.0.0.0, not localhost
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
