import StudentBase from "./StudentBase.js";

class Student extends StudentBase {

    protected balance = 0;
    protected courses: string[] = [];

    constructor(name:string, email:string, password:string) {
        super(name, email, password)
    }

    get _balance() {
        return this.balance;
    }

    set _balance(amount:number) {
        this.balance = amount;
    }

    get _courses() {
        return this.courses;
    }
    
    set _courses(_course: string[]) {
        this.courses = _course;
    }

    enrollInNewCourse(subject:string) {
        this.courses.push(subject);
    }

    showStatus() {
        return {
            balance: this._balance,
            courses: this._courses,
            ...super.getInfo()
        }
    }

    payTuitionFee(amount:number) {
        this.balance = amount + this.balance;
    }

}

export default Student;