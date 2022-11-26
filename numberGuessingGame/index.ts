import inquirer from "inquirer";

const computerNumber = Math.floor(Math.random() * 100);
let triesRemaining: number = 3;
let hasUserWon = false;

const startGame = async () => {
  console.log("Let the game begins...");
  while (triesRemaining !== 0) {
    const inputNumber = await inquirer.prompt([
      {
        name: "input",
        type: "number",
        message: `Enter your guess between 1-100. You have ${triesRemaining} try/tries remaining`,
      },
    ]);
    if (inputNumber.input === computerNumber) {
      console.log(`You have guessed it correctly :)`);
      hasUserWon = true;
      break;
    } else {
      console.log("Wrong Answer :(");
    }
    triesRemaining--;
  }

  if (!hasUserWon) {
    console.log(`Sorry! You lose. Correct answer is ${computerNumber}`);
  }

  const playAgain = await inquirer.prompt([
    {
      name: "tryAgain",
      message: "Press any key to try again and q to quit",
    },
  ]);

  if (playAgain.tryAgain.toLowerCase() === "q") {
    process.exit();
  } else {
    triesRemaining = 3;
    hasUserWon = false;
    startGame();
  }
};

startGame();
