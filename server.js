require('dotenv').config();
const express = require('express');
const mysql = require('mysql2'); // This line is required!
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');    
const db = mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});

// Add this route to your server.js
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ensure your server is listening on the correct port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
