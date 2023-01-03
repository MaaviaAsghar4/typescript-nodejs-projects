import { Router } from "../common/expressConfigs.js";

class BookRoute {
    public router;
    constructor() {
        this.router = Router;
        this.setupBookRoute();
    }

    setupBookRoute() {
        this.router.route("/")
            .get((req, res) => res.send({"books": []}))
            .post((req, res) => res.send({"newBook": []}));
        this.router.route("/:id")
            .delete((req, res) => res.send({"delete": []}))
            .put((req, res) => res.send({"put": []}));
    }
}

let bookRoute = new BookRoute();

export default bookRoute.router;