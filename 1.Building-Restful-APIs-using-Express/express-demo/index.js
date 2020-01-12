const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(logger);
app.use(auth);

const courses = [{
        id: 1,
        name: 'course 1'
    },
    {
        id: 2,
        name: 'course 2'
    },
    {
        id: 3,
        name: 'course 3'
    },
    {
        id: 4,
        name: 'course 4'
    },
];

app.get('/', (req, res) => {
    res.send('<h1>Hello Firman Abdul Jabar</h1>');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not Found!');

    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not Found!');
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not Found!');

    const del = courses.indexOf(course);
    courses.splice(del, 1);

    res.send(courses);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));