var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
  messages: [{
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: Date, default: Date.now() }
  }],
  user1: { type: Schema.Types.ObjectId, ref: "user" },
  user2: { type: Schema.Types.ObjectId, ref: "user" }
});
module.exports = mongoose.model("message", messageSchema);
