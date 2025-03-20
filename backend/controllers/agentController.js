const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const existingAgent  = await Agent.findOne({ email });
  if (existingAgent ) {
    return res.status(400).json({ message: "Email already exists." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.json({ message: "Agent added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding agent" });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json({ message: "Agents fetched successfully", agents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching agents" });
  }
};


