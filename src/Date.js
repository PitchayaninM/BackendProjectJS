const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Date.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS Dates (
    id INTEGER PRIMARY KEY,
    borrowed_date TEXT,
    return_date TEXT
)`);

app.get('/Dates', (req, res) => {
    db.all('SELECT * FROM Dates', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Dates/: id', (req, res) => {
    db.get('SELECT * FROM Dates WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Dates not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Dates', (req, res) => {
    const dates = req.body;
    db.run('INSERT INTO Dates (borrowed_date, return_date) VALUES (?, ?)', dates.borrowed_date, dates.return_date, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            dates.id = this.lastID;
            res.send(dates);
        }
    });
});

app.put('/Dates/:id', (req, res) => {
    const dates = req.body;
    db.run('UPDATE Dates SET borrowed_date = ?, return_date = ? WHERE id = ?',
        dates.borrowed_date, dates.return_date, req.params.id,
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(dates);
            }
        });
});

app.delete('/Dates/:id', (req, res) => {
    db.run('DELETE FROM Dates WHERE id = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

