import { NextFunction, Request, Response } from "express";

const authorizer = (req: Request, res: Response, next: NextFunction) => {
    let authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
        res.status(400);
        throw new Error("Unauthorized user")
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(400);
        throw new Error("Unauthorized user")
    }

    next()
}

export default authorizer;
