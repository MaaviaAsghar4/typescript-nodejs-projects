interface IUser {
    username: string;
    email: string;
    userId: string; 
}

const Users:IUser[] = [
    {
        "username": "User 1",
        "email": "user1@gmail.com",
        "userId": "1"
    },
    {
        "username": "User 2",
        "email": "user2@gmail.com",
        "userId": "2"
    },
    {
        "username": "User 3",
        "email": "user3@gmail.com",
        "userId": "3"
    },
    {
        "username": "User 4",
        "email": "user4@gmail.com",
        "userId": "4"
    }
];

export {
    Users,
    IUser
};