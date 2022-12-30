import Student from "../../models/Students/Student.js"
import userStore from "../Store/UserStore.js";
import FSService from "./FSService.js";
class AuthService {

    static checkIfUserAlreadyExist(users: Student[], email: string, password: string) {
        if (!users.length) return false;
        let isExistingUser = users.find((usr:any) => usr.email === email && usr.password === password);
        if (isExistingUser && Object.keys(isExistingUser).length) return true;
        return false;
    }

    static signUp(name: string, email: string, password: string) {
        return new Promise((res, rej) => {
            let newStudent = new Student(name, email, password);
            newStudent._balance = 1000; 
            newStudent._courses = [];
            FSService.readFile()
                .then((result) => {
                    let data = JSON.parse(result.toString());
                    let isUserExist = this.checkIfUserAlreadyExist(data.users, email, password);
                    if (isUserExist) throw new Error("User already exists");
                    data.users = [...data.users, { ...newStudent }]
                    FSService.writeToFile(JSON.stringify(data))
                    userStore.setUserInfo(newStudent.name, newStudent.email, newStudent._balance);
                    console.log("Sign Up Successful")
                    res(newStudent)
                })
                .catch((err) => {
                    console.error(err.message)
                    rej(err.message)
                })
        })
    }

    static signIn(email:string, password: string) {
        return new Promise((res, rej) => {
            FSService.readFile()
                .then((result) => {
                    let data = JSON.parse(result.toString());
                    if (!data.users.length) throw Error("No user found");
                    let user = data.users.find((usr:any) => usr.email === email && usr.password === password);
                    if (!Object.keys(user).length) throw Error("Incorrect credentials");
                    let newStudent = new Student(user.name, user.email, user.password);
                    newStudent._balance = user.balance;
                    newStudent._courses = user.courses
                    userStore.setUserInfo(newStudent.name, newStudent.email, newStudent._balance);
                    console.log("Sign In Successful");
                    res(newStudent);
                })
                .catch((err) => {
                    console.log("Error Signing In")
                    console.error(err.message)
                    rej("Error Signing In");
                })
        })
    }
}

export default AuthService;