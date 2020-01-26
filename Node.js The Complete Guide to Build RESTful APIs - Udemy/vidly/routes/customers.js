const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 20
    },
}));

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validateCustomers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customers = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customers = await customers.save();

    res.send(customers);
});

router.put('/:id', async (req, res) => {
    const {
        error
    } = validateCustomers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customers = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });
    if (!customers) return res.status(404).send('The customers with the given ID was not found.');

    res.send(customers);
});

router.delete('/:id', async (req, res) => {
    const customers = await Customer.findByIdAndRemove(req.params.id);
    if (!customers) return res.status(404).send('The customers with the given ID was not found.');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customers = await Customer.findById(req.params.id);
    if (!customers) return res.status(404).send('The customers with the given ID was not found.');
    res.send(customers);
});

function validateCustomers(customers) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(9).max(20).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customers, schema);
}

module.exports = router;