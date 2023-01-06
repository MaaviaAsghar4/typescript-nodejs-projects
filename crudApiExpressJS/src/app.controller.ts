import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";
import passport from "passport";
import PassportAuthService from "./services/PassportAuthService.js";

dotenv.config();
class StartAppWithExpress {
    public app;
    public port;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.setUpMiddlewares();
        this.setUpRoutes();
    }

    setUpMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        PassportAuthService(passport);
    }

    setUpRoutes() {
        this.app.use("/api/users",  userRoute);
        this.app.use("/api/books", passport.authenticate("jwt", { session: false }), bookRoute);
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`app listening on port ${this.port}!`);
        });
    }
}

let App = new StartAppWithExpress();
export default App;
