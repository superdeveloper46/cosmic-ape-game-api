const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      msg: "No token provided!"
    });
  }

  const {secret} = keys.jwt;
  token = token.substring(7, token.length)

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        msg: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  'verifyToken': verifyToken,
};
module.exports = authJwt;
