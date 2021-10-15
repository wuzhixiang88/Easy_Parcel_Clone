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
};

const userStrategy = new Strategy(options, async (payload, done) => {
  const user = await userModel.findOne({ username: payload.username });
  
  if (!user) {
    return done(null, false, { message: "User is not authorized"})
  }
  if (user) {
    return done(null, { username: user.username });
  }
});

module.exports = userStrategy;
