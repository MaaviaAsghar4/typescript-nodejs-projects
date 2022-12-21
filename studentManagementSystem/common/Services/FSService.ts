import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

class FSService {
    static __filename = fileURLToPath(import.meta.url);
    static __dirname = dirname(this.__filename);
    static __filePath = join(this.__dirname, "..", "UserStorage", "users.json");

    static readFile() {
       fs.readFile(this.__filePath, (err, data) => {
            if (err) {
                throw err
            }
            let _data = JSON.parse(data.toString());
            console.log(_data)
       })
    }

    static writeToFile(data:string) {
        fs.writeFile(this.__filePath, data, (err) => {
            if (err) throw err;
            console.log("write successful")
        } )
    }
}

export default FSService;