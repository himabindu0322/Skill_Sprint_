const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
} = require("../controllers/resumeController");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Resume Route Working");
});

// UPLOAD ROUTE
router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);

module.exports = router;
