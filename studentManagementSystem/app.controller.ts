import inquirer from "inquirer";
import courses from "./common/Constants/Courses.js";
import AuthService from "./common/Services/AuthService.js";
import FSService from "./common/Services/FSService.js";
import userStore from "./common/Store/UserStore.js";
import { IUser } from "./common/types.js";
import Student from "./models/Students/Student.js";

class AppController {

    static signUp = (): Promise<IUser> => {
        return new Promise((res, rej) => {
            inquirer.prompt([
                { name: "username", message: "Enter Username" },
                { name: "email", message: "Enter Email" },
                { name: "password", message: "Enter Password", type: "password" },
            ])
                .then((result) => {
                    res(result)
                })
                .catch((err) => {
                    console.error(err.message)
                })
        })
    }

    static signIn = (): Promise<IUser> => {
        return new Promise((res, rej) => {
            inquirer.prompt([
                { name: "email", message: "Enter Email" },
                { name: "password", message: "Enter Password", type: "password" },
            ])
                .then((result) => {
                    res(result)
                })
                .catch((err) => {
                    console.error(err.message)
                })
        })
    }

    static goBack = () => {
        inquirer.prompt([
            { 
                name: "goBack", 
                message: "What would you like to do next?", 
                type: "list", 
                choices: ["Go back", "Exit"]
            },
        ])
            .then((result) => {
                if (result.goBack === "Exit") {
                    process.exit()
                }
                this.listUserOperations()
            })
    }

    static userOperations = (student: Student, operation: string) => {
        switch (operation) {
            case "View balance":
                console.clear()
                console.log(`${student.name}, your balance is ${student._balance}`)
                this.goBack()
                break;
            case "Show Status":
                console.clear()
                console.log("Your Status")
                console.log(`Name: ${student.name}`)
                console.log(`Email: ${student.email}`)
                console.log(`Balance: ${student._balance}`)
                if (student._courses.length) {
                    console.log("courses:")
                    student._courses.forEach((course) => {
                        console.log("--------------------------------")
                        console.log(`Course Name: ${course.courseName}`)
                        console.log(`Course Timings: ${course.classTimings}`)
                        console.log(`Course Staring Date: ${course.startsFrom}`)
                        console.log(`Course Teacher: ${course.teacher}`)
                        console.log(`Course Fee: ${course.tuitionFee}`)
                        console.log("-------------------------------- \n")
                    })
                } else {
                    console.log(`courses: Not available`)
                }
                this.goBack()
                break;
            case "Enroll in a new course": {
                inquirer.prompt([{
                    name: "courseID",
                    type: "checkbox",
                    message: "Select courses to enroll",
                    choices: courses.map((course) => course.courseName)
                }])
                    .then((result) => {
                        let selectedCourses = courses.filter((course) => result.courseID.includes(course.courseName))
                        let totalFee = 0;
                        selectedCourses.forEach((course) => {
                            totalFee += course.tuitionFee
                        })
                        student.enrollInNewCourse(selectedCourses, totalFee)
                        FSService.writeToFile(JSON.stringify(student))
                        this.goBack()
                    })
                break;
            }
            case "List all available courses":
                courses.forEach((course) => {
                    console.log("--------------------------------")
                    console.log(`Course Name: ${course.courseName}`)
                    console.log(`Course Timings: ${course.classTimings}`)
                    console.log(`Course Staring Date: ${course.startsFrom}`)
                    console.log(`Course Teacher: ${course.teacher}`)
                    console.log(`Course Fee: ${course.tuitionFee}`)
                    console.log("-------------------------------- \n")
                })
                this.goBack()
                break;
            default:
                break;
        }
    }

    static authorizeUser(): Promise<Student> {
        return new Promise((res, rej) => {
            inquirer.prompt([
                {
                    name: "operation",
                    type: "list",
                    message: "Login or Signup",
                    choices: [
                        "Sign Up",
                        "Sign In"
                    ],
                },
            ])
                .then(({ operation }) => {
                    if (operation === "Sign Up") {
                        this.signUp()
                            .then((result:IUser) => {
                                const { username, email, password } = result;
                                AuthService.signUp(username!, email, password)
                                    .then((result:Student) => {
                                        res(result)
                                    })
                                    .catch(err => {
                                        rej(err)
                                    })
                            })
                            .catch(err => {
                                console.error(err.message)
                            })
                    } else {
                        this.signIn()
                            .then((result:IUser) => {
                                const { email, password } = result;
                                AuthService.signIn(email, password)
                                    .then((result:Student) => {
                                        res(result)
                                    })
                                    .catch(err => {
                                        rej(err)
                                    })
                            })
                            .catch(err => {
                                console.error(err.message)
                            })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        })
    }

    static listUserOperations() {
        return new Promise((res, rej) => {
            inquirer.prompt([
                {
                    name: "operation",
                    type: "list",
                    message: "What would you like to do today",
                    choices: [
                        "View balance",
                        "Show Status",
                        "Enroll in a new course",
                        "List all available courses",
                    ],
                },
            ])
                .then(({ operation }) => {
                    this.userOperations(userStore.getUserInfo() ,operation)
                })
                .catch(err => {
                    rej(err)
                })
        })
    }
}

export default AppController;
