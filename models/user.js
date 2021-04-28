const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    name: {
        type: String,
        required: 'Please fill name',
        trim: true
    },
    surname: {
        type: String,
        required: 'Please fill surname',
        trim: true
    },
    tel: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        required: 'Please fill gender'
    }
});

module.exports = mongoose.model('User', user);