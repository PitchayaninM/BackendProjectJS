// Import required modules
const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// Initialize SQLite3 database
const db = new sqlite3.Database('./Database/Customer.sqlite');

// Use JSON middleware
app.use(express.json());

// Create Customers table if not exists
db.run(`CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    book_id INTEGER,
    date_id INTEGER
)`);

// Get all customers
app.get('/Customers', (req, res) => {
    db.all('SELECT * FROM Customers', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// Get customer by ID
app.get('/Customers/: id', (req, res) => {
    db.get('SELECT * FROM Customers WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Customer not found');
            } else {
                res.json(row);
            }
        }
    });
});

// Add a new customer
app.post('/Customers', (req, res) => {
    const customer = req.body;

    // Insert the customer into the Customers table
    db.run('INSERT INTO Customers (name, book_id, date_id) VALUES (?, ?, ?)', customer.name, customer.book_id, customer.date_id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            customer.id = this.lastID;
            res.send(customer);
        }
    });
});

app.put('/Customers/:id', (req, res) => {
    const customer = req.body;
    db.run('UPDATE Customers SET name = ?, book_id = ?, date_id = ? WHERE id = ?',
        customer.name, customer.book_id, customer.date_id, req.params.id,
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(customer);
            }
        });
});

app.delete('/Customers/:id', (req, res) => {
    db.run('DELETE FROM Customers WHERE id = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

