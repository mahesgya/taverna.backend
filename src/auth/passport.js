const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const AuthQuery = require("../databases/auth.query");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  "admin-jwt",
  new JWTStrategy(opts, async function (jwtPayload, done) {
    const expDate = new Date(jwtPayload.exp * 1000);
    if (expDate < new Date()) {
      return done(null, false);
    }

    const user = jwtPayload;
    const isValidAdmin = await AuthQuery.isValidAdmin(user.id);
    if (isValidAdmin) return done(null, user);
    else return done(null, false);
  })
);
