import Student from "../../models/Students/Student.js"
class AuthService {

    static signUp(name: string, email: string, password: string) {
        let newStudent = new Student(name, email, password);
        newStudent.balance = 1000;
        
    }
}

export default AuthService;