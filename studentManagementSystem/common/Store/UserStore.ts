
class UserStore {
    private _name = "";
    private _email = "";
    private _balance = 0;

    getUserInfo() {
        return {
            name: this._name,
            email: this._email,
            balance: this._balance,
        }
    }

    setUserInfo(name:string, email:string, balance:number) {
        this._name = name;
        this._email = email;
        this._balance = balance;
    }

}

let userStore = new UserStore();

export default userStore;