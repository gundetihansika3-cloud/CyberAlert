require('dotenv').config(); // Load variables from .env

const db = mysql.createConnection({
    host: gateway01.ap - southeast - 1.prod.aws.tidbcloud.com,
    port: 4000,
    user: 16XjgHDMWzEekU6.root,
    password: n9uZKletiUngtnr,
    database: 'cyberalert',
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true // TiDB Cloud requires SSL
    }
});