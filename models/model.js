const mongoose = require('mongoose');
const schema = mongoose.Schema;

const model = new schema({
    name: {
        type: String,
        required: 'Please fill model name',
        trim: true
    },
    image: {
        type: String,
        required: 'Please fill model image.',
        trim: true
    },
    color: {
        type: String,
        required: 'Please fill model color.',
        trim: true
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: 'Please fill model price.'
    },
    storage: {
        type: String,
        required: 'Please fill model storage'
    }
});

module.exports = mongoose.model('Model', model);