require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
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

// API Route for registration
app.post('/api/register', (req, res) => {
    const { name, email, officer_id, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: 'Error hashing password' });

        // Corrected SQL: password_hash matches your table schema
        const sql = "INSERT INTO users (name, email, officer_id, password_hash) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [name, email, officer_id, hash], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: 'Database error' });
            }
            // Response must be INSIDE this callback to ensure DB success
            res.status(200).json({ message: 'User registered successfully!' });
        });
    });
});
// API Route for login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

        const user = results[0];
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).json({ error: 'Invalid email or password' });

            // Success: Send back user info (excluding password hash)
            res.status(200).json({
                message: 'Login successful!',
                user: { name: user.name, email: user.email }
            });
        });
    });
});

// Port configuration
const PORT = process.env.PORT || 8080;

// IMPORTANT: Bind to 0.0.0.0 to ensure accessibility
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
