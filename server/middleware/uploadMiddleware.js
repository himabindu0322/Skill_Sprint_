const multer = require("multer");
const path = require("path");

// STORAGE
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },

});

// FILE FILTER
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC/DOCX files allowed"), false);
  }
};

// MULTER
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
