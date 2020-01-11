const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello Firman</h1>');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4, 5]);
});

app.listen(3000, () => console.log('Listening on Port 3000'));