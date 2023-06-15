const jwt = require("jsonwebtoken");
const Farmer = require("../models/farmer.model");
const Investor = require("../models/investor.model");

const protect = (async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.farmer = await Farmer.findById({_id: decoded._id}).select("-password");
      req.investor = await Investor.findById({_id: decoded._id}).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
