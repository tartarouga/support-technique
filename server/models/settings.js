var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var settingsSchema = new mongoose.Schema({

    code: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'user' }

})
module.exports = mongoose.model('settings', settingsSchema);
