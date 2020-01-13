const express = require('express');
const router = express.Router();
const Joi = require('joi');

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

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not Found!');

    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

router.get('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not Found!');
    res.send(course);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;