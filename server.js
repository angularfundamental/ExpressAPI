const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);
const adUnitRoutes = require('./routes/adunit.route');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
//CORS Handler

// app.use((req, res, next) => {
//     res.append('Content-Type', 'application/json');
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });


const port = process.env.PORT || 8080;

app.use('/adunits', adUnitRoutes);

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});