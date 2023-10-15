const AuthController = require("../controllers/AuthController");

module.exports = function (app) {
  app.post("/auth/register", AuthController.register);
  app.post("/auth/login", AuthController.login);
};
