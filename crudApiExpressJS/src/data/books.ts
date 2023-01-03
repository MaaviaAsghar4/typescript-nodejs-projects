interface IBooks {
    bookId: string;
    bookName: string;
    bookAuthor: string;
}

const Books: IBooks[] = [
    {
        "bookId": "1",
        "bookName": "Book 1",
        "bookAuthor": "Author 1"
    },
    {
        "bookId": "2",
        "bookName": "Book 2",
        "bookAuthor": "Author 2"
    },
    {
        "bookId": "3",
        "bookName": "Book 3",
        "bookAuthor": "Author 3"
    },
    {
        "bookId": "4",
        "bookName": "Book 4",
        "bookAuthor": "Author 4"
    }
];

export {
    Books,
    IBooks
};