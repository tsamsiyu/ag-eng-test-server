const express = require('express');
var cors = require('cors');
const {PORT} = require('./config.js');
const bodyParser = require('body-parser');
const modules = require('./modules');

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.use('/', modules);

app.listen(PORT, () => console.log(`Example app listening!`));
