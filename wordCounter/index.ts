import readline from "readline";
import process from "process";

const startApp = async () => {
  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt(
    `Enter a long english paragraph to count words and characters\n`
  );
  rl.prompt();
  rl.on("line", (para) => {
    let words = para.split(" ");
    let characters = words.join("");
    console.log("Total words", words.length);
    console.log("Total characters", characters.length);
    rl.close();
  });
};

startApp();
