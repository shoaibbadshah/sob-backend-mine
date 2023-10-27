const User = require("../models/UserModel");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
(exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = await utils.generateAuthToken(
        existingUser._id,
        process.env.jwtPrivateKey
      );
      const emailResp = await utils.sendMail(email, token);

      return apiResponse.successResponseWithData(res, "", token);
    }

    const user = new User({ email });

    await user.save();
    const token = await utils.generateAuthToken(
      user._id,
      process.env.jwtPrivateKey
    );

    await utils.sendMail(email, token);

    return apiResponse.successResponseWithData(
      res,
      "Token sent to your email"
      // token
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
}),
  (exports.login = async (req, res) => {
    try {
      const { token } = req.body;
      console.log("🚀 ~ file: AuthController.js:61 ~ token:", token);

      try {
        jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
          if (err) {
            return apiResponse.ErrorResponse(res, "Invalid token " + err);
          } else {
            return apiResponse.successResponseWithData(res, "Success", {
              userID: decoded._id,
              token: token,
            });
          }
        });
      } catch (error) {
        return res.status(400).send({ message: "unauthorized" });
      }
    } catch (error) {
      console.error(error);
      apiResponse.ErrorResponse(res, "Error", error);
    }
  });
