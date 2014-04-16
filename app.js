var express = require('express'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

var app = express();

var db_connect = function () {
    var options = { server: {socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.db.connection, options);
};

db_connect();

mongoose.connection.on('error', function (err) {
    console.log(err);
});

mongoose.connection.on('close', function () {
    db_connect();
});

fs.readdirSync(config.paths.models).forEach(function (file) {
    if (file.indexOf('.js') != -1 ){
        require(config.paths.models + '/' + file);
    }
});

require('./config/express.js') (app);

require('./config/routes.js') (app);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
