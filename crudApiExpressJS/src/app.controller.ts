import express from "express";
import userRoute from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";

class StartAppWithExpress {
    public app;
    public port;
    public router;
    constructor() {
        this.app = express();
        this.router = express.Router()
        this.port = 5000;
        this.setUpMiddlewares();
        this.setUpRoutes();
    }

    setUpMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    setUpRoutes() {
        this.app.use("/api/users", userRoute);
        this.app.use("/api/books", bookRoute);
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`app listening on port ${this.port}!`);
        });
    }
}

let App = new StartAppWithExpress();
export default App;
