export interface IBooks {
    bookId: string;
    bookName: string;
    bookAuthor: string;
    authorId: string;
}

export interface IUser {
    username: string;
    email: string;
    userId: string; 
    salt: string;
    hash: string;
}