var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new mongoose.Schema({
    id: String,
    pw: String
});

module.exports = mongoose.model('user', user);