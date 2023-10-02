const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Book.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY,
    name TEXT
)`);

app.get('/Books', (req, res) => {
    db.all('SELECT * FROM Books', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Books/: id', (req, res) => {
    db.get('SELECT * FROM Books WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Books not found');
            } else {
                res.json(row);
            }
    }
 });
});

app.post('/Books', (req, res) => {
    const book = req.body;
    db.run('INSERT INTO Books (name) VALUES (?)', book.name, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            book.id = this.lastID;
            res.send(book);
        }
    });
});

app.put('/Books/:id', (req, res) => {
    const book = req.body;
    db.run('UPDATE Books SET name = ? WHERE id = ?',
        book.name, req.params.id,
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(book);
            }
        });
});

app.delete('/Books/:id', (req, res) => {
    db.run('DELETE FROM Books WHERE id = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
