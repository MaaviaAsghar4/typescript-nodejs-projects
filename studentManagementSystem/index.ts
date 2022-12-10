import inquirer from "inquirer";

const startApp = async () => {
  console.log("Welcome to the SMS");
  const { operation } = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "What would you like to do today",
      choices: [
        "View Info",
        "Enroll in a new course",
        "List all available courses",
        "Add a new course",
      ],
    },
  ]);

  console.log(operation);
};

startApp();
