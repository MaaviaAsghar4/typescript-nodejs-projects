import Student from "../../models/Students/Student.js";

class UserStore {
    private emptyUser = new Student("", "", "")
    private userInfo = this.emptyUser

    getUserInfo() {
        return this.userInfo
    }

    setUserInfo(userInfo:Student) {
        this.userInfo = userInfo
    }

}

let userStore = new UserStore();

export default userStore;