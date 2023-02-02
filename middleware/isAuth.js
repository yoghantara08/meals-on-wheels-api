const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Internal Server error!" });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  next();
};
