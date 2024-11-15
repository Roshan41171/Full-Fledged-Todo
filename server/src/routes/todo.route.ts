import { Router } from "express";
import { getTodo, postTodo, updateTodo } from "../controllers/todo.controller";

const router = Router();

router.route("/todo").get(getTodo).post(postTodo);
router.patch("/todo/:id", updateTodo);

export default router;
