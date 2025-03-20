const express = require("express");
const multer = require("multer");
const { uploadCSV, getAgentLists } = require("../controllers/listController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); 

router.post("/upload", auth, upload.single("file"), uploadCSV);
router.get("/agent/:id", auth, getAgentLists);

module.exports = router;
