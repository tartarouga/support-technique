var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reclamationSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['Front', 'Back'] },
    description: String,
    titre: String,
    etat: { type: String, required: true, enum: ['Traitee', 'Non traitee', 'En cours'], default: 'Non traitee' },
    pv: { type: Schema.Types.ObjectId, ref: 'pv' },
    client: { type: Schema.Types.ObjectId, ref: 'client' }

})
module.exports = mongoose.model('reclamation', reclamationSchema);