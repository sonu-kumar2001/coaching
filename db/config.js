const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    mongoose.connect(
      `${process.env.MONGODB_URL}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("connected to database");
          require("../utils/seed");
        }
      }
    );
  },
};
