import { ICourse } from "../../common/types.js";
import StudentBase from "./StudentBase.js";

class Student extends StudentBase {

    protected balance = 0;
    protected courses: ICourse[] = [];

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
    
    set _courses(_course: ICourse[]) {
        this.courses = _course;
    }

    enrollInNewCourse(subjects:ICourse[], totalFee: number) {
        if (this._balance < totalFee) {
            console.log("Not enough balance")
            return
        }
        this.courses = [...this.courses, ...subjects];
        this._balance = this._balance - totalFee;
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