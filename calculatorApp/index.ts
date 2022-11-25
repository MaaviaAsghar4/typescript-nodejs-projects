import inquirer from "inquirer";
import { ALLOWED_OPERATIONS } from "./constants.js";
import {
  performDMASOperations,
  performSingleNumberOperations,
} from "./mathOperations.js";

const calculateResult = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        name: "operation",
        type: "list",
        message: "Which operation you want to perform",
        loop: false,
        choices: ALLOWED_OPERATIONS,
      },
    ]);

    if (
      [
        "Addition",
        "Subtraction",
        "Multiplication",
        "Division",
        "Exponent",
      ].includes(answer.operation)
    ) {
      performDMASOperations(answer.operation);
    } else {
      performSingleNumberOperations(answer.operation);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.error(error);
    }
  }
};

calculateResult();
