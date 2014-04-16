var express = require('express'),
    router = express.Router();

var userController = require('../app/controllers/UserController.js');

module.exports = function (app) {

    app.route('/').
        get(function (req, res, next) {
            res.render('index', { title: 'GolManager' });
        });

    app.route('/users').
        get(userController.index);
};
