import inquirer from "inquirer";
import { exchangeRate, supportedCurrencies } from "./constants.js";

const startApp = async () => {
    console.log("\x1b[32m", "Welcome to Simple Exchange Rate");
    console.log("\x1b[33m", "List of supported currencies");
    console.log("\x1b[33m", supportedCurrencies.join(", "));
    const { currentCurrency, amount, targetCurrency } = await inquirer.prompt([
        { message: "Enter your currency code; e.g PKR", name: "currentCurrency" },
        { name: "amount", type: "number", message: "Enter your amount" },
        { message: "Enter currency code in which you want to convert; e.g PKR", name: "targetCurrency" }
    ]);

    const amountInUSD = amount / exchangeRate[currentCurrency];
    const result = amountInUSD * exchangeRate[targetCurrency];

    console.log("\x1b[32m", `Result: ${result.toFixed(2).toLocaleString()} ${targetCurrency}`);
}

startApp()