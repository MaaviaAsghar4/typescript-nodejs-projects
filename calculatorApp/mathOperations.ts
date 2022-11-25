import inquirer from "inquirer";

export const performDMASOperations = async (operation: string) => {
  try {
    const input = await inquirer.prompt([
      {
        name: "numbers",
        message: "Enter two numbers separated by commas e.g. 2,4",
      },
    ]);

    const [number1, number2] = input.numbers.replace(/\s/g, "").split(",");
    switch (operation) {
      case "Addition":
        console.log(Number(number1) + Number(number2));
        break;
      case "Multiplication":
        console.log(Number(number1) * Number(number2));
        break;
      case "Subtraction":
        console.log(Number(number1) - Number(number2));
        break;
      case "Division":
        console.log(Number(number1) / Number(number2));
        break;
      case "Exponent":
        console.log(Math.pow(Number(number1), Number(number2)));
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

export const performSingleNumberOperations = async (operation: string) => {
  try {
    const input = await inquirer.prompt([
      {
        name: "number",
        type: "number",
        message: "Enter your number",
        // validate: (number) => {
        //   return isNaN(number) ? "Please enter a valid number" : number;
        // },
      },
    ]);
    switch (operation) {
      case "Sine":
        console.log(Math.sin(input.number));
        break;
      case "Cosine":
        console.log(Math.cos(input.number));
        break;
      case "Tangent":
        console.log(Math.tan(input.number));
        break;
      case "Square Root":
        console.log(Math.sqrt(input.number));
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};
