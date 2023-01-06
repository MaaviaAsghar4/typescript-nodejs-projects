import { Request, Response } from "express";
import { Books, IBooks} from "../data/books.js";
import DatabaseService from "../services/DatabaseService.js";

let books:IBooks[] = JSON.parse(JSON.stringify(Books));

class BookController {

    checkIfBookExist = (bookId: string) => {
        return new Promise((res, rej) => {
            DatabaseService.getBookById(bookId)
                .then((book) => {
                    if (book) {
                        res(true)
                        return
                    }
                    res(false)
                })
                .catch(() => {
                    rej(false)
                })
        })
    }

    getBooks = (req: Request, res: Response) => {
        DatabaseService.getBooks()
            .then((books) => {
                if (books) {
                    res.status(200).json(books);
                    return
                    // 1673002833119
                }
                res.status(200).json([]);
            })
            .catch(() => {
                res.status(400).json({msg: "Cannot find books at the moment"});
            })
    }

    getBookById  = (req: Request, res: Response) => {
        const bookId = req.params.id;
        DatabaseService.getBookById(bookId)
                .then((book) => {
                    if (book) {
                        res.status(200).json(book);
                        return
                    }
                    res.status(200).json({});
                })
                .catch(() => {
                    res.status(400).json({msg: "cannot find book at the moment"});
                })
    }

    addNewBook =(req: Request, res: Response) => {
        const { bookId, bookName, bookAuthor, authorId } = req.body;
        if (!bookAuthor || !bookId || !bookName || !authorId) {
            res.status(400).json({msg: "bookId, bookName, and bookAuthor, authorId is required"})
            return
        }
        this.checkIfBookExist(bookId)
            .then((isBookExist) => {
                if (isBookExist) {
                    res.status(200).json({"msg": "book already exists"});
                    return
                }
                let newBook = {
                    bookId,
                    bookAuthor,
                    bookName,
                    authorId
                }
                DatabaseService.addNewBook(newBook)
                    .then((result) => {
                        res.status(200).json({"msg": "success"});
                    })
                    .catch(() => {
                        res.status(400).json({"msg": "Failed to add new book"});
                    })
            })
            .catch(() => {
                res.status(400).json({"msg": "error adding book"});
            })
    }

    deleteBook = (req: Request, res: Response) => {
        let bookId = req.params.id;
        if (!bookId) {
            res.status(400).json({msg: "bookId is required"})
            return
        }
        DatabaseService.deleteBook(bookId)
            .then(() => {
                res.status(200).json({"msg": "success"});
            })
            .catch(() => {
                res.status(400).json({"msg": "unable to delete file"});
            })
    }

    updateBook = (req: Request, res: Response) => {
        let bookId = req.params.id;
        const { bookName, bookAuthor, authorId } = req.body;
        if (!bookAuthor || !bookId || !bookName || !authorId) {
            res.status(400).json({msg: "bookId, bookName, and bookAuthor, authorId is required"})
            return
        }
        let newBook = {
            bookId,
            bookAuthor,
            bookName,
            authorId
        }
        DatabaseService.updateBook(newBook)
            .then(() => {
                res.status(200).json({"msg": "success"});
            })
            .catch(() => {
                res.status(400).json({msg: "book not found"})
            })
    }
}

let bookController = new BookController();

export default bookController;
