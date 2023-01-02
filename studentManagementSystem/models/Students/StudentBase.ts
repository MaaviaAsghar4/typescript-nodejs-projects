class StudentBase {
    public email = "";
    public name = "";

    private password = "";

    constructor(name:string, email:string, password:string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getInfo() {
        return {
            email: this.email,
            name: this.name,
        }
    }
}

export default StudentBase;