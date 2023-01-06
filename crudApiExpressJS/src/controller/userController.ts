import { Request, Response } from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import DatabaseService from "../services/DatabaseService.js";

class UserController {

    checkIfUserExists = (email: string) => {
        return new Promise((res, rej) => {
            DatabaseService.getUser(email)
                .then((result) => {
                    if (result) {
                        res(true)
                        return
                    }
                    res(false)
                })
                .catch(() => {
                    rej(false)
                })

        })
    }

    signUp = (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({msg: "username, email and password is required"})
            return
        }
        
        this.checkIfUserExists(email)
            .then((isUserExist) => {
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
                DatabaseService.registerUser(newUser)
                    .then(() => {
                        const { token, expiresIn} = AuthMiddleware.issueJWT(newUser);
                        res.status(200).json({ "msg": "success", token, expiresIn });
                    })
                    .catch(() => {
                        res.status(400).json({msg: "Something went wrong while sign up"})
                    })
            })
            .catch((err) => {
                res.status(400).json({msg: "Something went wrong while sign up"})
            })


    }

    signIn = (req: Request, res: Response) => {
        const { password, email } = req.body;
        if (!email || !password) {
            res.status(400).json({msg: "email and password fields are required"});
            return
        }

        DatabaseService.getUser(email)
            .then((user) => {
                if (user) {
                    const isValidPassword = AuthMiddleware.checkIsPasswordValid(password, user.hash, user.salt);
                    if (!isValidPassword) {
                        res.status(410).json({msg: "email or password does not match"})
                        return
                    }
                    const { token, expiresIn } = AuthMiddleware.issueJWT(user)
                    res.status(200).json({success: true, token, expiresIn})
                    return
                }
                res.status(400).json({msg: "user not found"})
            })
            .catch(() => {
                res.status(400).json({msg: "user not found"})
                return
            })

    }
}

let userController = new UserController();

export default userController;