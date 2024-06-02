const express = require("express");
const router = express.Router();
const talentController = require("../controllers/talent_controller");

// get routes
router.post("/update_talent/:email", talentController.update_talent);

router.post("/up_pending_status/:email", talentController.update_talent_pending);

// router.post("/login_user", userController.loginUser);

module.exports = router;
