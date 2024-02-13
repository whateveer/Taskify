const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Unauthorized error");
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("Unauthorized error");
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Unauthorized error");
    }

    req.user = userData;
    next();
  } catch (e) {
    throw new Error("Unauthorized error");
  }
};
