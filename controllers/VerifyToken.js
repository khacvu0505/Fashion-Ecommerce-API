const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send("Token is not valid!");
      req.user = user;
      return next();
    });
  } else {
    return res.status(401).send("You are not authenticated!");
  }
};

const VerifyTokenAndAuthorization = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).send("You are not allowed to do that!");
    }
  });
};

const VerifyTokenAndAdmin = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).send("You are not allowed to do that!");
    }
  });
};

module.exports = {
  VerifyToken,
  VerifyTokenAndAuthorization,
  VerifyTokenAndAdmin,
};
