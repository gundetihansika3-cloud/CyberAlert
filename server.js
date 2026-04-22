require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

// Serve static files (CSS, JS, etc.)
app.use(express.static(__dirname));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Update this route in your server.js
app.post('/api/register', (req, res) => {
    // These keys now match the 'data' object in your login.html
    const { name, email, officer_id, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Error hashing password' });

        // Ensure your database table 'users' has columns matching these fields
        const sql = "INSERT INTO users (name, email, officer_id, password) VALUES (?, ?, ?, ?)";
        db.query(sql, [name, email, officer_id, hash], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ message: 'User registered successfully!' });
        });
    });
});

// Port configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
