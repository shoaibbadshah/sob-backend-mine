const User = require("../models/UserModel");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "bezkoder-secret-key";
const jwtPrivateKey = "@#$&distr!!!ibutor-key**)&%$";

(exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = await utils.generateAuthToken(
        existingUser._id,
        jwtPrivateKey
      );
      return apiResponse.successResponseWithData(res, "", token);
    }

    const user = new User({ email });

    await user.save();
    const token = await utils.generateAuthToken(user._id, jwtPrivateKey);

    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //   if (err) {
    //     return apiResponse.ErrorResponse(res, "Invalid token " + err);
    //   }
    // });

    // Generate a JWT with a 2-hour expiration time
    // const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    //   expiresIn: "2h",
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'One-Time Login Token',
    //   text: `Your one-time login token is: ${token}`,
    // };

    // await transporter.sendMail(mailOptions);

    return apiResponse.successResponseWithData(
      res,
      "Token sent to your email",
      token
    );
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
}),
  (exports.login = async (req, res) => {
    try {
      const { token } = req.body;

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return apiResponse.ErrorResponse(res, "Invalid token " + err);
        }

        // You can implement user authentication logic here
        // For simplicity, we'll just return a success message
        return apiResponse.successResponseWithData(res, "Success", decoded);
      });
    } catch (error) {
      console.error(error);
      apiResponse.ErrorResponse(res, "Error", error);
    }
  });
