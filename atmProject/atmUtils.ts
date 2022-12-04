import inquirer from "inquirer";

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

export const withdrawCash = async () => {
  const amount = await inquirer.prompt([
    {
      type: "number",
      message: "Enter the amount you wish to draw",
      name: "amount",
    },
  ]);

  console.log(amount, "amount");
  displayReceipt(RecieptType.WITHDRAW_CASE, 2000, 90);
};

export const checkBalance = async () => {
  displayReceipt(RecieptType.BALANCE_CHECK, 3000);
};

export const verifyUser = async () => {
  const userName = await inquirer.prompt([
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

  console.log(userName);
};
