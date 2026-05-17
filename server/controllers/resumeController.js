const User = require("../models/User");

const uploadResume = async (req, res) => {

  try {

    console.log("=========== UPLOAD API HIT ===========");

    console.log("BODY:");
    console.log(req.body);

    console.log("FILE:");
    console.log(req.file);

    // CHECK FILE
    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    const { email } = req.body;

    // CHECK EMAIL
    if (!email) {

      return res.status(400).json({
        message: "Email missing",
      });

    }

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    // SAVE RESUME
    user.resume = req.file.filename;

    await user.save();

    return res.status(200).json({
      message: "Resume Uploaded Successfully",
      file: req.file.filename,
    });

  } catch (error) {

    console.log("UPLOAD ERROR:");
    console.log(error);

    return res.status(500).json({
      message: "Resume Upload Failed",
    });

  }

};

module.exports = {
  uploadResume,
};
