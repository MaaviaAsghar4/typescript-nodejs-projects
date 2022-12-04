export const enum TodoOperations {
  CREATE = "Create a todo",
  UPDATE = "Update todos",
  DELETE = "Delete todos",
  LIST = "List todos",
}

export interface Todos {
  id: number;
  todo: string;
  completed: boolean;
}
