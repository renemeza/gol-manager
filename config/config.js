var path = require('path');

module.exports = {
    development: {
        db: {
            connection: 'mongodb://localhost/golmanager',
            user: '',
            password: ''
        },
        paths: {
            root: path.normalize(__dirname + '/..'),
            models: path.join(path.normalize(__dirname + '/..'), 'app/models')
        }
    },
    production: {}
};