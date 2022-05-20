const express = require("express");

const router = express.Router();

const adminController = require("../../../controllers/Admin");

router.route("/admin/login").post(adminController.adminLogin);

module.exports = router;
