import { Router } from "../common/expressConfigs.js";

class UserRoute {
    public router;
    constructor() {
        this.router = Router;
        this.setupUserRoute();
    }

    setupUserRoute() {
        this.router.post("/signin", (req, res) => res.send({"users": {}}))
        this.router.post("/signup", (req, res) => res.send({"newUsers": {}}))
    }
}

let userRoute = new UserRoute();

export default userRoute.router;