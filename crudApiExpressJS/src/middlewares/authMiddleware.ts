// import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { IUser } from "../types/types.js";


class AuthMiddleware {

    static generateHashPassword = (password:string) => {
        let salt = crypto.randomBytes(32).toString("hex");
        let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return { salt, hash };
    }

    static checkIsPasswordValid = (password:string, hash:string, salt:string) => {
        let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return hash === hashVerify
    }

    static issueJWT(user:IUser) {
        const expiresIn = "1d";
        const payload = {
            sub: user.email,
            iat: Date.now()
        };

        const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn });

        return {
            token: "Bearer " + signedToken,
            expiresIn
        }
    }
}

export default AuthMiddleware;
