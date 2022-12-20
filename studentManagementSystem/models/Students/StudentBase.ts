class StudentBase {
    public email = "";
    public name = "";

    protected id = "";

    #password = "";

    constructor(name:string, email:string, password:string) {
        this.name = name;
        this.email = email;
        this.#password = password;
        this.id = Math.random().toString();
    }
 
    getInfo() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
        }
    }
}

export default StudentBase;