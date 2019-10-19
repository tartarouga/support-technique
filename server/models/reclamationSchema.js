var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reclamationSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['Front', 'Back'] },
    description: String,
    etat: { type: String, required: true, enum: ['Traitée', 'Non traitée', 'En cours'], default: 'Non traité' },
    pv: { type: Schema.Types.ObjectId, ref: 'pv' }

})
module.exports = mongoose.model('reclamation', reclamationSchema);