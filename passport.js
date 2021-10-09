const passportJwt = require('passport-jwt');
const userModel = require("./models/users")
const { Strategy } = passportJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.token;
    }
    return token;
};


const options = {
    secretOrKey: process.env.SECRET_KEY_JWT,
    jwtFromRequest: cookieExtractor,
}

const userStrategy = new Strategy(options, async (payload, done) => {
    const user = userModel.findOne({ username: payload.username })

    if (err) {
        return done(err, false)
    }
    if (user) {
        return done(null, {username: customer.username})
    }
});

module.exports = userStrategy;