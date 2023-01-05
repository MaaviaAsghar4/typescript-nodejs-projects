import { Request, Response } from "express";
import { Users } from "../data/users.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

class UserController {

    checkIfUserExists = (email: string) => {
        let user = Users.find((usr) => usr.email === email);
        if (user && Object.keys(user).length) {
            return true
        }
        return false
    }

    signUp = (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({msg: "username, email and password is required"})
            return
        }
        
        let isUserExist = this.checkIfUserExists(email)
        if (isUserExist) {
            res.status(400).json({msg: "User already exists"})
            return
        }

        const saltHash = AuthMiddleware.generateHashPassword(password);

        const newUser = {
            username,
            email,
            salt: saltHash.salt,
            hash: saltHash.hash,
            userId: new Date().getTime().toString()
        }
        Users.push(newUser)

        const { token, expiresIn} = AuthMiddleware.issueJWT(newUser);
        res.status(200).json({ "msg": "success", token, expiresIn });
    }

    signIn = (req: Request, res: Response) => {
        const { password, email } = req.body;
        if (!email || !password) {
            res.status(400).json({msg: "email and password fields are required"});
            return
        }
        let user = Users.find((usr) => usr.email === email);
        if (!user || !Object.keys(user).length) {
            res.status(400).json({msg: "user not found"})
            return
        }

        const isValidPassword = AuthMiddleware.checkIsPasswordValid(password, user.hash, user.salt);
        if (!isValidPassword) {
            res.status(410).json({msg: "email or password does not match"})
            return
        }
        const { token, expiresIn } = AuthMiddleware.issueJWT(user)
        res.status(200).json({success: true, token, expiresIn})
    }
}

let userController = new UserController();

export default userController;