import { Request, Response } from "express";
import { Books, IBooks} from "../data/books.js";

let books:IBooks[] = JSON.parse(JSON.stringify(Books));

class BookController {

    checkIfBookExist = (bookId: string) => {
        let book = books.find((bk) => bk.bookId === bookId)
        if (book && Object.keys(book).length) {
            return true
        }
        return false
    }

    getBooks = (req: Request, res: Response) => {
        res.status(200).json(books);
    }

    getBookById  = (req: Request, res: Response) => {
        let book = books.find((bk) => bk.bookId === req.params.id)
        res.status(200).json(book);
    }

    addNewBook =(req: Request, res: Response) => {
        const { bookId, bookName, bookAuthor } = req.body;
        if (!bookAuthor || !bookId || !bookName) {
            res.status(400).json({msg: "bookId, bookName, and bookAuthor is required"})
            return
        }
        let isBookExist = this.checkIfBookExist(bookId)
        if (isBookExist) {
            res.status(200).json({"msg": "book already exists"});
            return
        }
        books.push({bookId, bookAuthor, bookName})
        res.status(200).json({"msg": "success"});
    }

    deleteBook = (req: Request, res: Response) => {
        if (!req.params.id) {
            res.status(400).json({msg: "bookId is required"})
            return
        }
        books = books.filter((bk) => bk.bookId !== req.params.id);
        res.status(200).json({"msg": "success"});
    }

    updateBook = (req: Request, res: Response) => {
        if (!req.params.id) {
            res.status(400).json({msg: "bookId is required"})
            return
        }
        let index = books.findIndex((bk) => bk.bookId === req.params.id);
        if (index !== -1) {
            books[index] = { ...books[index], ...req.body }
            res.status(200).json({"msg": "success"});
            return
        }
        res.status(400).json({msg: "book not found"})
        return
    }
}

let bookController = new BookController();

export default bookController;
