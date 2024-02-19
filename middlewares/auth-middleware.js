const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("req.headers.authorization: ", req.headers.Authorization)
    if (!authHeader) {
      throw new Error("Unauthorized error 1");
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("Unauthorized error 2");
    }
    //console.log(accessToken)
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Unauthorized error 3");
    }

    req.user = userData;
    next();
  } catch (e) {
    console.log(e);
  }
};
