import inquirer from "inquirer";
import FSService from "./common/Services/FSService.js";
const startApp = async () => {
  console.log("Welcome to the SMS");
  const { operation } = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "What would you like to do today",
      choices: [
        "Sign Up", 
        "Sign In",
        "View balance",
        "Pay tution fee",
        "Show Status",
        "Enroll in a new course",
        "List all available courses",
        "Add a new course",
      ],
    },
  ]);
};

startApp();
