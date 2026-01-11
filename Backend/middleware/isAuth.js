module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn || !req.session.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized.Please Sign In First" });
  }
  next();
};
