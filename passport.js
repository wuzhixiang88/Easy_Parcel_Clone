const passportJwt = require('passport-jwt');
const customerModel = require('./models/customers');
const deliverymanModel = require("./models/deliverymen")
const { JwtStrategy, ExtractJwt } = passportJwt;

const options = {
    secretOrKey: process.env.SECRET_KEY_JWT,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken
}

const customerStrategy = new JwtStrategy(options, async (payload, done) => {
    const customer = customerModel.findOne({ username: payload.username })

    if (err) {
        return done(err, false)
    }
    if (customer) {
        return done(null, {username: customer.username})
    }
});

const deliverymanStrategy = new JwtStrategy(options, async (payload, done) => {
    const deliveryman = deliverymanModel.findOne({ username: payload.username })

    if (err) {
        return done(err, false)
    }
    if (customer) {
        return done(null, {username: deliveryman.username})
    }
});

module.exports = {
    customerStrategy,
    deliverymanStrategy
}