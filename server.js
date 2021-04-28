const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('./config/mongo-connector');
require('./models/user');

const app = express();

app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(require('./routes'));
const port = process.env.PORT || '5000'
app.listen(port, () => {
    console.log('app start at port : ' + port);
});
