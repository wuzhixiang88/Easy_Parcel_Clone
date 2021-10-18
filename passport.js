const passportJwt = require("passport-jwt");
const userModel = require("./models/users");
const { Strategy } = passportJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

const options = {
  secretOrKey: process.env.SECRET_KEY_JWT,
  jwtFromRequest: cookieExtractor,
  ignoreExpiration: true
};

const userStrategy = new Strategy(options, (payload, done) => {
  if (new Date(payload.exp * 1000) < new Date()) {
    return done(new Error("Token has expired"), null)
  }
  userModel.findOne({ username: payload.username}, (err, user) => {
    if (err) {
      return done(err, null)
    }
    if (!user) {
      return done(null, false, { message: "User is not authorized"})
    }
    if (user) {
      return done(null, { username: user.username, role: user.role });
    }
  })
});


module.exports = userStrategy;
