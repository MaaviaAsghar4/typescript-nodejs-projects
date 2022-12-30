import inquirer from "inquirer";
import AuthService from "./common/Services/AuthService.js";

class AppController {

    static authorizeUser() {
        return new Promise((res, rej) => {
            inquirer.prompt([
                {
                    name: "operation",
                    type: "list",
                    message: "What would you like to do today",
                    choices: [
                        "Sign Up",
                        "Sign In"
                    ],
                },
            ])
                .then(({ operation }) => {
                    if (operation === "Sign Up") {
                        AuthService.signUp("Maavia3", "maavia3@sms.com", "password34")
                            .then((result) => {
                                res(result)
                            })
                            .catch(err => {
                                rej(err)
                            })
                    } else {
                        AuthService.signIn("maavia@sms.com", "password")
                            .then((result) => {
                                res(result)
                            })
                            .catch(err => {
                                rej(err)
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
                        "Pay tution fee",
                        "Show Status",
                        "Enroll in a new course",
                        "List all available courses",
                    ],
                },
            ])
                .then(({ operation }) => {
                    console.log("list")
                    res(operation)
                })
                .catch(err => {
                    rej(err)
                })
        })
    }
}

export default AppController;
