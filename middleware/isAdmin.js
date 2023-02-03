const jwt = require("jsonwebtoken");
const Role = require("../utils/role");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.decode(token);

    if (decodedToken.role !== Role.Admin) {
      return res
        .status(401)
        .json({ message: "You don't have access to this resources" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }

  next();
};
