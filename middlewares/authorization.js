const joi = require("joi");
const jwt = require("jsonwebtoken");
const UsersModel = require("../db/ScemaUsers");
const validate = require("../helpers/validator");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    console.log("token", token);

    if (token) {
      validate(joi.string().min(20).required(), token);

      const user = await UsersModel.findOne({ "tokens.token": token });

      if (!user) {
        return new Error("tocken not valid");
      }

      const tokenRecord = user.tokens.find(
        (userToken) => userToken.token === token
      );

      jwt.decode(tokenRecord.token, "test");

      req.user = user;
    } else {
      throw new Error("Not authorized");
    }

    next();
  } catch (e) {
    return e;
  }
};
