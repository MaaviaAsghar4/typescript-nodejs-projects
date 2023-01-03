import { Request, Response } from "express";
import { IUser, Users } from "../data/users.js";

const users: IUser[] = JSON.parse(JSON.stringify(Users));

class UserController {

    checkIfUserExists = (userId: string) => {
        let user = users.find((usr) => usr.userId === userId);
        if (user && Object.keys(user).length) {
            return true
        }
        return false
    }

    signUp = (req: Request, res: Response) => {
        const { username, email, userId } = req.body;
        if (!username || !email || !userId) {
            res.status(400);
            throw new Error("Incomplete data")
        }
        let isUserExist = this.checkIfUserExists(userId)
        if (isUserExist) {
            res.status(400);
            throw new Error("User already exists")
        }

        users.push({ username, userId, email })
        res.status(200).json({ "msg": "success" });
    }

    signIn = (req: Request, res: Response) => {
        const { username, email } = req.body;
        let user = users.find((usr) => usr.username === username && usr.email === email);
        if (user && Object.keys(user).length) {
            res.status(200).json(user)
            return
        }
        res.status(400);
        throw new Error("No user found")
    }
}

let userController = new UserController();

export default userController;