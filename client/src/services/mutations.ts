// import { Todo } from "@/types/todo";
import { Todo } from "@/types";

const API_BASE_URL = "http://localhost:5000/api";

export const addTodoMutation = async (newTodo: Omit<Todo, "id">) => {
  const response = await fetch(`${API_BASE_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

export const updateTodoMutation = async (todo: Todo) => {
  const response = await fetch(`${API_BASE_URL}/todo/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodoMutation = async (id: number) => {
  await fetch(`${API_BASE_URL}/todo/${id}`, {
    method: "DELETE",
  });
};
