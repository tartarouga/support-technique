var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: Number,
    adresse: String,
    state: { type: Boolean, default: false }

})
module.exports = mongoose.model('admin', adminSchema);