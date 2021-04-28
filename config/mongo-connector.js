const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:1234@cluster0.qhvs6.mongodb.net/training?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('connect mongoDB success');
}).catch(err => {
    console.log('connect mongoDB failed' + err);
    process.exit();
});