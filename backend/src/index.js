const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');
const app = express();

app.use(express.json());

mongoose.connect(config.connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(routes);

app.listen(3333);
