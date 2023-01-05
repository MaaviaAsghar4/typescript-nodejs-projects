import { PassportStatic } from "passport";
import { Strategy as JWTStrategy, ExtractJwt} from "passport-jwt";
import { Users } from "../data/users.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "my-secret",
}

const PassportAuthService = (passport: PassportStatic) => {
    passport.use(new JWTStrategy(options, (payload, done) => {
        let user = Users.find((usr) => usr.email === payload.sub);
        if (!user || !Object.keys(user).length) {
            return done(new Error("No user found"), false);
        }
        return done(null, user)
    }))
}

export default PassportAuthService;
