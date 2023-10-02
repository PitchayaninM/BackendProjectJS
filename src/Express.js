const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// Initialize SQLite3 databases
const dbCustomer = new sqlite3.Database('./Database/Customer.sqlite');
const dbBook = new sqlite3.Database('./Database/Book.sqlite');
const dbDate = new sqlite3.Database('./Database/Date.sqlite');

app.use(express.json());

// Create Customers table if not exists
dbCustomer.run(`CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    book_id INTEGER,
    date_id INTEGER
)`);

// Create Books table if not exists
dbBook.run(`CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

// Create Dates table if not exists
dbDate.run(`CREATE TABLE IF NOT EXISTS Dates (
    id INTEGER PRIMARY KEY,
    borrowed_date TEXT,
    return_date TEXT
)`);

// REST API for Customers
// ... (Existing routes for Customers)

// REST API for Books
// ... (Existing routes for Books)

// REST API for Dates
// ... (Existing routes for Dates)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
