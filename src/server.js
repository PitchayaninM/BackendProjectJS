const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

const db = new sqlite3.Database('./Database/library.sqlite');

app.use(bodyParser.json());

// Endpoint to add a borrower
app.post('/borrower', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO borrowers (name) VALUES (?)', [name], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Borrower added successfully', id: this.lastID });
  });
});

// Endpoint to add a borrowing date
app.post('/borrowing_date', (req, res) => {
  const { borrower_id, borrow_date, return_date } = req.body;
  db.run('INSERT INTO borrowing_dates (borrower_id, borrow_date, return_date) VALUES (?, ?, ?)', [borrower_id, borrow_date, return_date], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Borrowing date added successfully', id: this.lastID });
  });
});

// Endpoint to add a book
app.post('/book', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO books (title) VALUES (?)', [title], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Book added successfully', id: this.lastID });
  });
});

// ... Existing code ...

// Endpoint to get all borrowers
app.get('/borrower', (req, res) => {
    db.all('SELECT * FROM borrowers', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });
  
  // Endpoint to get a specific borrower by ID
  app.get('/borrower/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM borrowers WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json(row);
    });
  });
  
  // Endpoint to update a borrower
  app.put('/borrower/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.run('UPDATE borrowers SET name = ? WHERE id = ?', [name, id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: 'Borrower updated successfully', changes: this.changes });
    });
  });
  
  // Endpoint to delete a borrower
  app.delete('/borrower/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM borrowers WHERE id = ?', [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: 'Borrower deleted successfully', changes: this.changes });
    });
  });
  
  // ... Similar code for handling borrowing dates and books ...
  
  // ... Existing code ...
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
