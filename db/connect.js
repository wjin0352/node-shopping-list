 // You will require this anywhere that you need to connect to the database:
var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config');

mongoose.connect(config[env].url);
