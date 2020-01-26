const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateCustomers(customers) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(9).max(20).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customers, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomers;