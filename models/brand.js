const mongoose = require('mongoose');
const schema = mongoose.Schema;

const brand = new schema({
    brand: {
        type: String,
        required: 'Please fill brand.',
        unique: 'Brand is alredy exists.',
        trim: true
    },
    logo: {
        type: String,
        required: 'Please fill logo.',
        trim: true
    },
    models: [
        {
            type: schema.ObjectId,
            ref: 'Model'
        }
    ]
});

module.exports = mongoose.model('Brand', brand);