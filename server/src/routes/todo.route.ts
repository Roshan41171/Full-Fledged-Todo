import { Router } from "express";
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
  getTodoById,
} from "../controllers/todo.controller";

const router = Router();

router.route("/todo").get(getTodos).post(postTodo);
router.route("/todo/:id").get(getTodoById).patch(updateTodo).delete(deleteTodo);

export default router;
