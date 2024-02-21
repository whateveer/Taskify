const { jwtDecode } = require("jwt-decode");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = decodeURIComponent(req.cookies.accessToken);

    if (!authHeader) {
      throw new Error("Unauthorized error 1");
    }

    const accessToken = authHeader.split(" ")[1];
    // const decoded = jwtDecode(accessToken);
    // console.log(decoded.id);

    if (!accessToken) {
      throw new Error("Unauthorized error 2");
    }
    //console.log(accessToken)
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Unauthorized error 3");
    }
    console.log("User is valid. Access granted");
    req.user = userData;
    next();
  } catch (e) {
    console.log(e);
  }
};
