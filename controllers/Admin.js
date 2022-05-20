const Admin = require("../models/Admin");
const auth = require("../auth/auth");
const { compare } = require("bcrypt");
const helperFunction = require("../helper/helper");

const adminController = {
  adminLogin: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email || !password)
        return res.status(403).json({ err: "Invalid body type" });
      let admin = await Admin.findOne({ email });
      if (!admin) return res.json({ err: "Email doesn't exist" });
      let result = await compare(password, admin.password);
      if (admin && result) {
        let createdToken = await auth.generateJwt(admin);
        res.json({
          admin: { ...helperFunction.adminInfo(admin), createdToken },
          message: "User is loggedin",
        });
      } else return res.status(403).json({ err: "credential is incorrect" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = adminController;
