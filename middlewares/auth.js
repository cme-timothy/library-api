const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    res.statusMessage = "Request failed, token not valid";
    return res.status(400).end();
  }

  const [prefix, jwtToken] = token.split(" ");

  try {
    const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    res.statusMessage = "Request failed, token not valid";
    return res.status(403).end();
  }
  next();
}

module.exports = verifyToken;
