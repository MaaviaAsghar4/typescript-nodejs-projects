import StudentBase from "./StudentBase.js";

class Student extends StudentBase {

    protected _balance = 0;
    protected _courses: string[] = [];

    constructor(name:string, email:string, password:string) {
        super(name, email, password)
    }

    get balance() {
        return this._balance;
    }

    set balance(amount:number) {
        this._balance = amount;
    }

    get courses() {
        return this._courses;
    }

    enrollInNewCourse(subject:string) {
        this._courses.push(subject);
    }

    showStatus() {
        return {
            balance: this.balance,
            courses: this.courses,
            ...super.getInfo()
        }
    }

    payTuitionFee(amount:number) {
        this.balance = amount + this.balance;
    }

}

export default Student;