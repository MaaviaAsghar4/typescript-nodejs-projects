import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

class FSService {
    static __filename = fileURLToPath(import.meta.url);
    static __dirname = dirname(this.__filename);
    static __filePath = join(this.__dirname, "..", "UserStorage", "users.json");

    static readFile() {
        return fs.readFile(this.__filePath);
    }

    static writeToFile(data:string) {
        return fs.writeFile(this.__filePath, data)
    }
}

export default FSService;