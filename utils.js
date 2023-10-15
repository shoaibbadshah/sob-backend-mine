const jwt = require("jsonwebtoken");

module.exports.generateAuthToken = (id, key) => {
  const token = jwt.sign({ _id: id }, key);
  return token;
};

module.exports.decodeAuthToken = (token, key) => {
  return new Promise((resolve, reject) => {
    try {
      let decode = jwt.verify(token, key);
      resolve(decode);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.decodeBase64 = (str) => {
  return Buffer.from(str, "base64").toString("utf-8");
};

module.exports.encodeBase64 = (str) => {
  return Buffer.from(str, "utf8").toString("base64");
};
