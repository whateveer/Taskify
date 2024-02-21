const { jwtDecode } = require("jwt-decode");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = decodeURIComponent(req.cookies.accessToken);

    if (!authHeader) {
      throw new Error("Unauthorized error 1. !authHeader");
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwtDecode(accessToken);

    if (!accessToken) {
      throw new Error("Unauthorized error 2. !accessToken");
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Unauthorized error 3. !userData");
    }

    req.user = decoded.id;
    next();
  } catch (e) {
    res.redirect("/login");

    return res.status(403).json({message:"sdvcd"});

  }
  // res.redirect("/registr");
};
