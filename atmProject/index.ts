import inquirer from "inquirer";
import { checkBalance, verifyUser, withdrawCash } from "./atmUtils.js";

const startATMProcess = async () => {
  try {
    // change the color to green
    console.log("\x1b[32m", "**** Welcome to the Sample ATM ****");
    await verifyUser();
    const options = await inquirer.prompt([
      {
        name: "options",
        type: "list",
        message: "Please select the operation you want to perform",
        choices: ["Withdraw Cash", "Check Balance"],
      },
    ]);

    let selectedOption = options.options.replace(" ", "").toLowerCase();
    console.log(selectedOption);
    if (selectedOption === "withdrawcash") {
      withdrawCash();
    } else {
      checkBalance();
    }
  } catch (error) {
    console.error(error);
  }
};

startATMProcess();
