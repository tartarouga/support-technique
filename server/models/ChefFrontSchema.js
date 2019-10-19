var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chefFrontSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: Number,
    state: { type: Boolean, default: false }

})
module.exports = mongoose.model('chFront', chefFrontSchema);