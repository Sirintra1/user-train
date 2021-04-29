const mongoose = require('mongoose');
const schema = mongoose.Schema;

const movie = new schema({
    image: {
        type: String,
        required: 'Please fill image.',
        trim: true
    },
    detail: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    movie: {
        type: String,
        required: 'Please fill movie.',
        trim: true
    },
    seats: [
        {
            type: schema.ObjectId,
            ref: 'Seat'
        }
    ]
});

module.exports = mongoose.model('Movie', movie);