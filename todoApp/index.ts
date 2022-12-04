import inquirer from "inquirer";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./todoUtils.js";
import { TodoOperations } from "./types.js";

const startApp = async () => {
  console.log("\x1b[32m", "**** Welcome to Todo App ****");
  const { operation } = await inquirer.prompt([
    {
      name: "operation",
      message: "What do you wish to do?",
      type: "rawlist",
      choices: [
        TodoOperations.CREATE,
        TodoOperations.UPDATE,
        TodoOperations.DELETE,
        TodoOperations.LIST,
      ],
    },
  ]);

  switch (operation) {
    case TodoOperations.CREATE:
      createTodo();
      break;
    case TodoOperations.UPDATE:
      updateTodo();
      break;
    case TodoOperations.LIST:
      getTodos();
      break;
    case TodoOperations.DELETE:
      deleteTodo();
      break;
    default:
      break;
  }
};

startApp();
