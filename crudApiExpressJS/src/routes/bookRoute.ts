import { Router } from "../common/expressConfigs.js";
import bookController from "../controller/bookController.js";

class BookRoute {
    public router;
    constructor() {
        this.router = Router;
        this.setupBookRoute();
    }

    setupBookRoute() {
        this.router.route("/")
            .get(bookController.getBooks)
            .post(bookController.addNewBook);
        this.router.route("/:id")
            .get(bookController.getBookById)
            .delete(bookController.deleteBook)
            .put(bookController.updateBook);
    }
}

let bookRoute = new BookRoute();

export default bookRoute.router;