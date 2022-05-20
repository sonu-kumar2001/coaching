const Admin = require("../models/Admin");

Admin.findOne({ email: process.env.EMAIL }, (err, admin) => {
  if (err) throw new Error("something went wrong during seeding");
  if (!admin) {
    Admin.create({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });
  }
});
