const passport = require("passport");

const authorize = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      let message = "Unauthorized";
      if (strategy == "admin-jwt") message = "Unauthorized, only admin";
      
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: message });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = authorize;
