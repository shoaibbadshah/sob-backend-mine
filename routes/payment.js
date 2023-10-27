const StripeController = require("../controllers/PaymentController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

// module.exports = function (app) {
//   app.post("/pay/createCustomer", StripeController.StripePay);
//   //   app.post("/auth/login", AuthController.login);
// };
// router.use(passport.authenticate("jwt", { session: false }));

router.post("/StripePay", StripeController.StripePay);
router.get("/StripePayProceed", StripeController.StripePayproceed);
router.post("/create-invoice", StripeController.BtcPay);
router.post("/btcPay_webhook", StripeController.BtcPayWebHook);
// router.post('/confirm_intent',paymentsController.confirm_intent)

module.exports = router;
