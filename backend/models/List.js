const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
});

module.exports = mongoose.model("List", ListSchema);