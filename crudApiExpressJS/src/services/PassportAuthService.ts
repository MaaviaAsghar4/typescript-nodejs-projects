import { PassportStatic } from "passport";
import { Strategy as JWTStrategy, ExtractJwt} from "passport-jwt";
import { Users } from "../data/users.js";
import DatabaseService from "./DatabaseService.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

const PassportAuthService = (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, (payload, done) => {
        DatabaseService.getUser(payload.sub)
            .then((user) => {
                if (!user || !Object.keys(user).length) {
                    return done(new Error("No user found"), false);
                }
                return done(null, user)
            })
    }))
}

export default PassportAuthService;
