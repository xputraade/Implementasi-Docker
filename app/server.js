const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rute untuk menampilkan halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Rute untuk menampilkan halaman create
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'create.html'));
});

// Rute untuk menyimpan item ke database
app.post('/items', (req, res) => {
    const title = req.body.title; // Pastikan ini sesuai dengan input yang diharapkan
    const desc = req.body.desc; // Mengganti nama variabel untuk lebih jelas
    db.run("INSERT INTO articles (title, desc) VALUES (?, ?)", [title, desc], function(err) {
        if (err) {
            console.error(err.message); // Tambahkan log untuk debugging
            return res.status(500).send(err.message);
        }
        res.redirect('/view');
    });
});

// Rute untuk menghapus item
app.post('/delete/:id', (req, res) => {
    const id = req.params.id; // Get the ID from the URL
    db.run("DELETE FROM articles WHERE id = ?", [id], function(err) {
        if (err) {
            console.error(err.message); // Log the error for debugging
            return res.status(500).send(err.message);
        }
        res.redirect('/view'); // Redirect after deletion
    });
});

// Rute untuk melihat semua item dalam format HTML
app.get('/view', (req, res) => {
    db.all("SELECT * FROM articles", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        let newsItems = rows.map(item => `
            <div class="news-item">
                <div class="container">
                    <h2>${item.title}</h2>
                    <p>${item.desc}</p>
                    <img alt="Image description for news item ${item.id}" height="400" src="https://storage.googleapis.com/a1aa/image/XWxoEWepX4WFF6IANPjNmiQaHd6V54uBSurUgK1Y3zZ11Y7JA.jpg" width="600"/>
                </div>
                <form action="/delete/${item.id}" method="POST" onsubmit="return confirm('Are you sure you want to delete this item?');">
                    <button type="submit" class="button">Delete Item</button>
                </form>
            </div>
        `).join('');

        const html = `
        <html>
            <head>
                <title>News App</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&amp;display=swap" rel="stylesheet"/>
                <style>
                    body {
                        font-family: 'Roboto', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        width: 80%;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        padding: 20px 0;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 2.5em;
                        color: #333;
                    }
                    .news-item {
                        background-color: #fff;
                        margin: 20px 0;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .news-item h2 {
                        margin: 0 0 10px;
                        font-size: 1.5em;
                        color: #333;
                    }
                    .news-item p {
                        margin: 0;
                        color: #666;
                    }
                    .news-item img {
                        max-width: 100%;
                        border-radius: 8px;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Latest News</h1>
                    </div>
                    ${newsItems}
                </div>
                <a href="/" class="button">back to menu</a>
            </body>
        </html>
        `;

        res.send(html);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});