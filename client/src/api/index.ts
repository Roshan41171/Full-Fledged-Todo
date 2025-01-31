import Axios from "axios";

const API_URL = "http://localhost:5000";

const API = Axios.create({ baseURL: API_URL });

export const getTodos = () => API.get("/api/todo");

export const postTodo = ({ newTodo }: { newTodo: any }) =>
  API.post("/api/todo", newTodo);

export const updateTodo = ({
  id,
  updatedTodo,
}: {
  id: number;
  updatedTodo: any;
}) => API.patch(`/api/todo/${id}`, updatedTodo);

export const deleteTodo = ({ id }: { id: number }) =>
  API.delete(`/api/todo/${id}`);

export const getTodoById = ({ id }: { id: number }) =>
  API.get(`/api/todo/${id}`);
