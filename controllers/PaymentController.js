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
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      try {
        const decodedToken = utils.decodeAuthToken(
          token,
          process.env.jwtPrivateKey
        );
      } catch (error) {
        return res.status(400).send({ message: "unauthorized" });
      }
    }
    const { amount, pm_id } = req.body;
    const cents = 50 * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cents, // Amount in cents
      currency: "usd",
    });
    const confirmedIntent = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: "pi_345ubhvjgcrt", // Replace with actual payment method ID
      }
    );
    if (
      confirmedIntent.status === "succeeded" ||
      confirmedIntent.status === "processing"
    ) {
      const user_id = req.user._id;
    }
    return apiResponse.successResponseWithData(res, "Success", {
      customer_id: customer.id,
      card_id: card?.id,
    });
  } catch (error) {
    apiResponse.ErrorResponse(res, error);
  }
};
exports.BtcPay = async (req, res) => {
  try {
    const SERVER_URL = "https://btcpay0.voltageapp.io";
    const API_KEY = "GoOrvU7QEv7ii07kiZE717kbOQEd7okkGvd0W0oGp7E";
    const response = await axios.post(
      `${SERVER_URL}/invoices`,
      {
        price: 10, // Amount in satoshis
        currency: "BTC",
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
