import inquirer from "inquirer";
import { checkBalance, verifyUser, withdrawCash } from "./atmUtils.js";
import { UserInfo } from "./types.js";

const startATMProcess = async () => {
  try {
    // change the color to green
    console.log("\x1b[32m", "**** Welcome to the Sample ATM ****");
    let userInfo: UserInfo | void = await verifyUser();
    if (!userInfo) {
      console.log("\x1b[31m", "**** User not found ****");
      return;
    }
    console.log("\x1b[32m", `**** Greetings, ${userInfo.username} ****`);
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
      withdrawCash(userInfo);
    } else {
      checkBalance(userInfo);
    }
  } catch (error) {
    console.error(error);
  }
};

startATMProcess();
