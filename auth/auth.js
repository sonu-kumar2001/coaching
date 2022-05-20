const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateJwt: async (user) => {
    let payload = { userId: user.id, email: user.email };
    let token = await sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });
    return token;
  },

  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      try {
        let payload = await verify(token, process.env.SECRET);
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).json({ error });
      }
    } else return res.status(401).json({ err: "Please SignIn" });
  },

  currentUserLoggedIn: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      try {
        let payload = await verify(token, process.env.SECRET);
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).json({ error });
      }
    } else {
      req.user = {};
      next();
    }
  },
};