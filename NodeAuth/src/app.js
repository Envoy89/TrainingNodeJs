const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSessions = require('express-session');

const router = require('./routes');

const secret = require('./config/keys').secret;

class Application {
    constructor() {
        this.expressApp = express();

        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cookieParser());
        this.expressApp.use(expressSessions({ secret }));

        this.expressApp.use(router);

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
}

module.exports = Application;