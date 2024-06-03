const express = require("express");
const router = express.Router();
const talentController = require("../controllers/talent_controller");
const multer = require("multer");

const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10 MB
  },
});

// get routes
router.post("/update_talent/:email", upload.single("profile_pic"), talentController.update_talent);

router.post("/up_pending_status/:email", talentController.update_talent_pending);

router.post("/up_shorlisted_status/:email", talentController.update_talent_short);

router.get("/get_all_talent", talentController.get_all_talent);

// router.post("/login_user", userController.loginUser);

module.exports = router;
