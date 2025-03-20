const express = require("express");
const upload = require("../middleware/uploadMiddleware")
const auth = require("../middleware/authMiddleware");

const { uploadCSV, getGroupedAgentLists } = require("../controllers/listController");

const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadCSV);
router.get("/grouped-agents", auth, getGroupedAgentLists);

module.exports = router;
