const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if(err) {
        console.log('could not connect to: ' + config.db);
    } else {
        console.log('connected to: ' + config.db);
    }
});

const api = require('./routes/api');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'));
});

app.listen(port, function() {
    console.log('listening on port: ' + port);
});
