import inquirer from "inquirer";
import fs from "fs";
import { Todos } from "./types.js";

export const getTodos = () => {
  try {
    fs.readFile("todoList.json", (err, data) => {
      if (err) throw err;

      let todos = JSON.parse(data.toString());
      console.log("\x1b[32m", "\n Todo List \n");
      console.log("\x1b[34m", "**completed", "\x1b[33m", "**Pending\n");
      if (todos.length) {
        todos.forEach((todo: Todos) => {
          console.log(todo.completed ? "\x1b[34m" : "\x1b[33m", todo.todo);
        });
      } else {
        console.log("\x1b[34m", "No todos. Try adding one");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async () => {
  try {
    const { todo } = await inquirer.prompt([
      {
        name: "todo",
        message: "Enter your todo",
      },
    ]);
    let newTodo = {
      todo,
      id: Math.floor(Math.random() * 1e9),
      completed: false,
    };
    fs.readFile("todoList.json", (err, data) => {
      if (err) throw err;

      let todos = JSON.parse(data.toString());
      todos = [...todos, newTodo];
      fs.writeFile("todoList.json", JSON.stringify(todos), (err) => {
        if (err) throw err;

        console.log("\x1b[34m", "Todo added.");
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async () => {
  try {
    const data = fs.readFileSync("todoList.json");
    let todos = JSON.parse(data.toString());
    if (!todos.length) {
      console.log("\x1b[34m", "No todos. Try adding one");
      return;
    }
    let todosName = todos.map((val: Todos) => val.todo);
    const { prevTodo, newTodo } = await inquirer.prompt([
      {
        type: "rawlist",
        message: "Select a todo to update",
        name: "prevTodo",
        choices: [...todosName],
      },
      {
        name: "newTodo",
        message: "Enter new todo or type C to change it to complete/uncomplete",
      },
    ]);

    let newTodos = todos.map((val: Todos) => {
      return {
        ...val,
        todo:
          val.todo === prevTodo && newTodo.toLowerCase() !== "c"
            ? newTodo
            : val.todo,
        completed:
          val.todo === prevTodo && newTodo.toLowerCase() === "c"
            ? !val.completed
            : val.completed,
      };
    });

    fs.writeFile("todoList.json", JSON.stringify(newTodos), (err) => {
      if (err) throw err;

      console.log("\x1b[34m", "Todo updated.");
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async () => {
  try {
    const data = fs.readFileSync("todoList.json");
    let todos = JSON.parse(data.toString());
    if (!todos.length) {
      console.log("\x1b[34m", "No todos. Try adding one");
      return;
    }
    let todosName = todos.map((val: Todos) => val.todo);
    const { deleteTodos } = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Select a todo",
        name: "deleteTodos",
        choices: [...todosName],
      },
    ]);

    if (!deleteTodos.length) {
      console.log("\x1b[34m", "No todo selected.");
      return;
    }

    let newTodos = todos.filter(
      (val: Todos) => !deleteTodos.includes(val.todo)
    );

    fs.writeFile("todoList.json", JSON.stringify(newTodos), (err) => {
      if (err) throw err;

      console.log("\x1b[34m", "Todos deleted.");
    });
  } catch (error) {
    console.error(error);
  }
};
