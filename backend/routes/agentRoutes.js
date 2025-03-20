const express = require("express");
const { addAgent, getAgents } = require("../controllers/agentController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", auth, addAgent);
router.get("/all", auth, getAgents);

module.exports = router;

