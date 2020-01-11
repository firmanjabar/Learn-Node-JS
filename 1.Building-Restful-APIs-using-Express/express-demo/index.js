const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello Firman Abdul Jabar</h1>');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4, 5]);
});

app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));