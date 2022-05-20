const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hash } = require("bcrypt");
const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let adminSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, match: re },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  if (this.password) {
    hash(this.password, 12, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else next();
});

module.exports = mongoose.model("Admin", adminSchema);
