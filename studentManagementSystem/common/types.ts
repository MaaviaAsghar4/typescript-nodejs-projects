
export interface IUser {
    username?: string,
    email: string,
    password: string,
}

export interface ICourse {
    courseId: number;
    courseName: string;
    classTimings: string;
    startsFrom: string;
    teacher: string;
    tuitionFee: number;
}

export interface IUserInfo {
    name: string,
    email: string,
    password: string,
    balance: number,
    courses: ICourse[]
}