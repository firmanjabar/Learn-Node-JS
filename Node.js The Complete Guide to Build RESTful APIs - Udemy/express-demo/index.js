const config = require('config');
const sDebug = require('debug')('app:stratup');
const dDebug = require('debug')('app:db');
const express = require('express');
const helmet = require('helmet');
const Joi = require('joi');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

app.use(logger);
app.use(auth);
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    sDebug('morgan enabled');
}

dDebug('database debugger');
//to call in cmd: set DEBUG=app:startup for single
//to call in cmd: set DEBUG=app:startup,app:db for multiple
//to call in cmd: set DEBUG=app:* for all

console.log(`name: ${config.get('name')}`)
console.log(`server: ${config.get('mail.host')}`)
console.log(`pass: ${config.get('mail.password')}`)

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
    res.render('index', {
        title: 'My Express App',
        message: 'Hello from server using pug'
    });
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