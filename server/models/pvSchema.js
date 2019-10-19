var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pvSchema = new mongoose.Schema({

    description: String,


})
module.exports = mongoose.model('pv', pvSchema);