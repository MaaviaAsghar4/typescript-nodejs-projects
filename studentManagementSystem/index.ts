import userStore from "./common/Store/UserStore.js";
import AppController from "./app.controller.js"

const startApp = () => {
    console.log("Welcome to the SMS");
    const { name, email } = userStore.getUserInfo();
    if (name && email) {
        AppController.listUserOperations()
            .then((result) => {
                console.log(result)
            })
            .catch(err => {
                console.log(err.message)
            })
    } else {
        AppController.authorizeUser()
            .then((result) => {
                console.log(result)
                startApp();
            })
            .catch(err => {
                console.log(err.message)
            })
    }
};

startApp();
