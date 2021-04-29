const mongoose = require('mongoose');
const schema = mongoose.Schema;

const seat = new schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: 'Please fill seats price.'
    },
    type: {
        type: String,
        required: 'Please fill seats type.',
        trim: true
    }
});

module.exports = mongoose.model('Seat', seat);