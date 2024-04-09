const express = require("express");
const {
  registerController,
  requireSignIn,
} = require("../controllers/userController");
const { loginController } = require("../controllers/userController");
const { updateController } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.put("/update-user", requireSignIn, updateController);

module.exports = router;
