import { PrismaClient } from '@prisma/client'
import { IUser, IBooks } from '../types/types.js';
const prisma = new PrismaClient();

class DatabaseService {
    static prisma = prisma;

    static registerUser = (user: IUser) => {
        return new Promise((res, rej) => {
            this.prisma.user.create({
                data: user
            })
                .then(() => {
                    res("user created successfull")
                    console.log("user created successfull")
                })
                .catch(err => {
                    rej(err.message)
                    console.error(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    }

    static getUser = (email:string): Promise<IUser | null> => {
        return new Promise((res, rej) => {
            this.prisma.user.findFirst({
                where: {
                    email
                }
            })
                .then((user) => {
                    res(user)
                })
                .catch(err => {
                    rej({})
                    console.error(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    }

    static getBooks = (): Promise<IBooks[] | null> => {
        return new Promise((res, rej) => {
            this.prisma.books.findMany()
                .then((books) => {
                    res(books)
                })
                .catch(err => {
                    rej({})
                    console.error(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    };

    static getBookById = (bookId: string): Promise<IBooks | null> => {
        return new Promise((res, rej) => {
            this.prisma.books.findFirst({
                where: {
                    bookId,
                }
            })
                .then((book) => {
                    res(book)
                })
                .catch(err => {
                    rej({})
                    console.error(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    };

    static addNewBook = (book: IBooks) => {
        return new Promise((res, rej) => {
            this.prisma.books.create({
                data: book
            })
                .then(() => {
                    res("book added")
                })
                .catch(err => {
                    rej(err.message)
                    console.error(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    };

    static deleteBook = (bookId:string) => {
        return new Promise((res, rej) => {
            this.prisma.books.delete({
                where: {
                    bookId
                }
            })
                .then(() => {
                    res("book deleted")
                })
                .catch(err => {
                    rej(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    };

    static updateBook = (book:IBooks) => {
        return new Promise((res, rej) => {
            this.prisma.books.update({
                where: {
                    bookId: book.bookId
                },
                data: book
            })
                .then(() => {
                    res("book updated")
                })
                .catch(err => {
                    rej(err.message)
                })
                .finally(() => {
                    this.prisma.$disconnect()
                })
        })
    };

}

export default DatabaseService;
