var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'chefBack', 'chefFront', 'techFront', 'techBack', 'conseiller', 'client'] },
    admin: { type: Schema.Types.ObjectId, ref: 'admin' },
    chefFront: { type: Schema.Types.ObjectId, ref: 'chFront' },
    chefBack: { type: Schema.Types.ObjectId, ref: 'chBack' },
    techFront: { type: Schema.Types.ObjectId, ref: 'techFront' },
    techBack: { type: Schema.Types.ObjectId, ref: 'techBack' },
    conseiller: { type: Schema.Types.ObjectId, ref: 'conseiller' },
    client: { type: Schema.Types.ObjectId, ref: 'client' },
    status: { type: String, enum: ['active', 'suspended'], default: 'suspended' },
    avatar: { type: String },
    connected: { type: Boolean, default: false }


})
module.exports = mongoose.model('user', userSchema);