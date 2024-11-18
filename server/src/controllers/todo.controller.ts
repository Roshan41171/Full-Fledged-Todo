import {
  getSingleTodoSchema,
  postTodoSchema,
  updateTodoSchema,
} from "../configs/zodConfig";
import type { Request, Response } from "express";
import { z } from "zod";
import {
  createTodo,
  deleteTodoById,
  findTodoById,
  getAllTodos,
  updateTodoService,
} from "../services/todo.service";
import { StatusCodes as SC, ErrorMessages as EM } from "../constants";

const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await getAllTodos();

    res.status(SC.OK).json(todos);
    return;
  } catch (error) {
    res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: EM.INTERNAL_SERVER_ERROR });
    return;
  }
};

const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = getSingleTodoSchema.parse(parseInt(req.params.id));

    const todo = await findTodoById(id);

    if (!todo) {
      res.status(SC.NOT_FOUND).json({ error: EM.INVALID_ID });
      return;
    }
    res.status(SC.OK).json({ todo });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(SC.NOT_ACCEPTABLE).json({ error: EM.INVALID_INPUT_TYPE });
      return;
    }
    res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: EM.INTERNAL_SERVER_ERROR });
    return;
  }
};

const postTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = postTodoSchema.parse(req.body);
    const todo = await createTodo(validatedData);

    res.status(SC.CREATED).json({ message: "Todo created successfully", todo });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(SC.NOT_ACCEPTABLE).json({ error: EM.INVALID_INPUT_TYPE });
      return;
    }
    res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: EM.INTERNAL_SERVER_ERROR });
    return;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = updateTodoSchema.parse({
      id: parseInt(req.params.id),
      ...req.body,
    });

    const todo = await findTodoById(validatedData.id);

    if (!todo) {
      res.status(SC.NOT_FOUND).json({ error: EM.INVALID_ID });
      return;
    }

    const updatedTodo = await updateTodoService(validatedData);

    res
      .status(SC.OK)
      .json({ message: "Todo Updated Successfully", updatedTodo });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(SC.NOT_ACCEPTABLE).json({ error: EM.INVALID_INPUT_TYPE });
      return;
    }
    res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: EM.INTERNAL_SERVER_ERROR });
    return;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = getSingleTodoSchema.parse(parseInt(req.params.id));
    const todo = await findTodoById(id);

    if (!todo) {
      res.status(SC.NOT_FOUND).json({ error: EM.INVALID_ID });
      return;
    }
    await deleteTodoById(id);
    res.status(SC.OK).json({ message: `Todo of ID ${id} is deleted.` });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(SC.NOT_ACCEPTABLE).json({ error: EM.INVALID_INPUT_TYPE });
      return;
    }
    res
      .status(SC.INTERNAL_SERVER_ERROR)
      .json({ error: EM.INTERNAL_SERVER_ERROR });
    return;
  }
};

export { getTodoById, getTodos, postTodo, updateTodo, deleteTodo };
