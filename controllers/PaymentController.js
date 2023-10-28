const User = require("../models/UserModel");

//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utils = require("../utils");
const axios = require("axios");
const Stripe_Key =
  "sk_test_51NzdazEpmwbQ6obrawf4t4FOHCyEGleWBhptH64qUwoRMC6fCoVOuXOhhVjk4OGm2UHnYvLFLEjEglqxi6fKGYYi007jsrSkCg";
const stripe = require("stripe")(Stripe_Key);

const jwt = require("jsonwebtoken");
const { decodeAuthToken } = require("../utils");

exports.StripePay = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let userID = "";
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
          if (err) {
            return apiResponse.ErrorResponse(res, "Invalid token " + err);
          } else {
            userID = decoded._id;
          }
        });
      } catch (error) {
        return res.status(400).send({ message: "unauthorized" });
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: "usd",
      // Add more options as needed
    });

    const user = await User.findOne({ _id: userID });

    return apiResponse.successResponseWithData(res, "Success", {
      clientSecret: paymentIntent.client_secret,
      user: user,
    });
  } catch (error) {
    apiResponse.ErrorResponse(res, error);
  }
};
exports.StripePayproceed = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let userID = "";
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
          if (err) {
            return apiResponse.ErrorResponse(res, "Invalid token " + err);
          } else {
            userID = decoded._id;
          }
        });
      } catch (error) {
        return res.status(400).send({ message: "unauthorized" });
      }
    }

    const user = await User.findOne({ _id: userID });

    const paymentIntentq = req.query.payment_intent;
    const clientSecret = req.query.payment_intent_client_secret;
    const redirectStatus = req.query.redirect_status;

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentq
      );

      if (paymentIntent.status === "succeeded") {
        user.isPaid = true;
        await user.save();
        return apiResponse.successResponseWithData(res, "Success", {
          clientSecret: "successfully  ",
        });
      } else {
        res.status(400).send("payment not successful");
      }
    } catch (error) {
      console.error("Error processing payment:", error);

      res.status(500).send("Error processing payment");
    }
  } catch (error) {
    apiResponse.ErrorResponse(res, error);
  }
};

exports.BtcPay = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let userID = "";
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        jwt.verify(token, process.env.jwtPrivateKey, (err, decoded) => {
          if (err) {
            return apiResponse.ErrorResponse(res, "Invalid token " + err);
          } else {
            userID = decoded._id;
          }
        });
      } catch (error) {
        return res.status(400).send({ message: "unauthorized" });
      }
    }

    const user = await User.findOne({ _id: userID });
    const SERVER_URL = "https://btcpay0.voltageapp.io";
    const API_KEY = "GoOrvU7QEv7ii07kiZE717kbOQEd7okkGvd0W0oGp7E";
    const response = await axios.post(
      `${SERVER_URL}/invoices`,
      {
        price: 0.000001, // Amount in satoshis
        currency: "USD",
        metadata: {
          orderId: user._id, // User's unique identifier
        },
      },
      {
        headers: {
          Authorization: `Basic R29PcnZVN1FFdjdpaTA3a2laRTcxN2tiT1FFZDdva2tHdmQwVzBvR3A3RQ==`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ invoice: response.data.data });
  } catch (error) {
    console.error("Error creating invoice:", error.response);
    res.status(401).json({ error: "Error creating invoice" });
  }
};
exports.BtcPayWebHook = async (req, res) => {
  try {
    const event = req.body;
    console.log(
      "🚀 ~ file: PaymentController.js:149 ~ exports.BtcPayWebHook= ~ event:",
      event
    );
    const userId = event.invoice.metadata.orderId;
    console.log(
      "🚀 ~ file: PaymentController.js:150 ~ exports.BtcPayWebHook= ~ userId:",
      userId
    );
    if (event.type === "InvoiceSettled") {
      const userId = event.invoice.metadata.orderId;
      console.log(
        "🚀 ~ file: PaymentController.js:156 ~ exports.BtcPayWebHook= ~ userId:",
        userId
      );
      // Update user status to "paid"
      // Perform any other necessary actions
    }

    res.status(200).end();
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(401).json({ error: "Error creating invoice" });
  }
};
