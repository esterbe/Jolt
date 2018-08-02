//seperate server configuration from controller methods
const express = require('express');
var db = require('./db')

const app = express();

//user routes to define app urls
var router = require('./routes');
app.use('/', router);

// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(3000,() => console.log('Example app listening on port 3000!'));
