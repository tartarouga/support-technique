var mongoose = require("mongoose");

var conseillerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  state: { type: Boolean, default: false }
});
module.exports = mongoose.model("conseiller", conseillerSchema);
