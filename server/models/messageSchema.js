var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
  messages: [
    { content: String, user: { type: Schema.Types.ObjectId, ref: "user" } }
  ],
  user1: { type: Schema.Types.ObjectId, ref: "user" },
  user2: { type: Schema.Types.ObjectId, ref: "user" }
});
module.exports = mongoose.model("message", messageSchema);
