import userStore from "./common/Store/UserStore.js";
import AppController from "./app.controller.js"
import Student from "./models/Students/Student.js";

const startApp = () => {
    const User = userStore.getUserInfo();
    if (User.name && User.email) {
        AppController.listUserOperations()
            .then(() => {
                // console.clear()
            })
            .catch(err => {
                console.log(err.message)
            })
    } else {
        AppController.authorizeUser()
            .then((result:Student) => {
                // console.clear()`
                console.log(`What would you like to do ${result.name}`)
                startApp();
            })
            .catch(err => {
                console.log(err.message)
            })
    }
};

startApp();
