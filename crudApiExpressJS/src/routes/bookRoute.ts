import { Router } from "../common/expressConfigs.js";
import bookController from "../controller/bookController.js";
import authorizer from "../middlewares/authMiddleware.js";

class BookRoute {
    public router;
    constructor() {
        this.router = Router;
        this.setupBookRoute();
    }

    setupBookRoute() {
        this.router.route("/")
            .get(authorizer, bookController.getBooks)
            .post(authorizer, bookController.addNewBook);
        this.router.route("/:id")
            .get(authorizer, bookController.getBookById)
            .delete(authorizer, bookController.deleteBook)
            .put(authorizer, bookController.updateBook);
    }
}

let bookRoute = new BookRoute();

export default bookRoute.router;