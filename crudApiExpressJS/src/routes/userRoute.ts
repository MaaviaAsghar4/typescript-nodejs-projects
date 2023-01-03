import { Router } from "../common/expressConfigs.js";
import userController from "../controller/userController.js";

class UserRoute {
    public router;
    constructor() {
        this.router = Router;
        this.setupUserRoute();
    }

    setupUserRoute() {
        this.router.post("/signin", userController.signIn)
        this.router.post("/signup", userController.signUp)
    }
}

let userRoute = new UserRoute();

export default userRoute.router;