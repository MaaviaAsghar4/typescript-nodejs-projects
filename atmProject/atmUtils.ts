import inquirer from "inquirer";
import { UserInfo } from "./types.js";
import fs from "fs";

enum RecieptType {
  WITHDRAW_CASE,
  BALANCE_CHECK,
}

const displayReceipt = (
  type: RecieptType,
  remainingBalance: number,
  withdrawalAmount?: number
) => {
  let date = new Date();
  console.log("\x1b[32m", "***********************************************");
  console.log("\x1b[32m", "********* Thanks for using Sample ATM *********");
  if (type === RecieptType.WITHDRAW_CASE) {
    console.log(
      "\x1b[34m",
      `******** Your withdrawal amount is $${withdrawalAmount} ******`
    );
  }
  console.log(
    "\x1b[34m",
    `****** Your remaining balance is $${remainingBalance} *******`
  );
  console.log(
    "\x1b[34m",
    `************** Date: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ****************`
  );
  console.log("\x1b[32m", "********* Have a nice day. Thank you **********");
  console.log("\x1b[32m", "***********************************************");
};

const updateUsersInfo = (userInfo: UserInfo, balanceRemaining: number) => {
  try {
    fs.readFile("sampleData.json", (err, data) => {
      if (err) throw err;
      let users = JSON.parse(data.toString());
      let index = users.findIndex(
        (user: UserInfo) =>
          user.username === userInfo.username &&
          user.password === userInfo.password
      );
      users[index] = { ...userInfo, balance: balanceRemaining };
      fs.writeFile("sampleData.json", JSON.stringify(users), (err) => {
        if (err) throw err;
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const withdrawCash = async (userInfo: UserInfo) => {
  try {
    const { amount } = await inquirer.prompt([
      {
        type: "number",
        message: "Enter the amount you wish to draw",
        name: "amount",
      },
    ]);

    if (amount > userInfo.balance) {
      console.log(
        "\x1b[31m",
        "**** You do not have sufficient balance in your account ****"
      );
      return;
    }
    let balanceRemaining = userInfo.balance - amount;
    displayReceipt(RecieptType.WITHDRAW_CASE, balanceRemaining, amount);
    updateUsersInfo(userInfo, balanceRemaining);
  } catch (error) {
    console.error(error);
  }
};

export const checkBalance = async (userInfo: UserInfo) => {
  try {
    displayReceipt(RecieptType.BALANCE_CHECK, userInfo.balance);
  } catch (error) {
    console.error(error);
  }
};

export const verifyUser = async (): Promise<UserInfo | void> => {
  try {
    const userInfo = await inquirer.prompt([
      {
        name: "username",
        message: "Enter your username:",
      },
      {
        name: "password",
        type: "password",
        message: "Enter your password:",
      },
    ]);

    let data = fs.readFileSync("sampleData.json");
    let usersData = JSON.parse(data.toString());
    let userData = usersData.find(
      (user: UserInfo) =>
        user.username === userInfo.username &&
        user.password === userInfo.password
    );

    if (userData && Object.keys(userData).length) {
      return { ...userData, success: true };
    }

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};
