import prisma from "../prisma/prismaConfig";
import {
  getSingleTodoSchema,
  postTodoSchema,
  updateTodoSchema,
} from "../zod/zodConfig";
import type { Request, Response } from "express";
import { z } from "zod";
import { findTodoById } from "../services/todo.service";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany();

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = getSingleTodoSchema.parse(parseInt(req.params.id));

    const todo = findTodoById(id);

    if (!todo) {
      res.json({ error: "Invalid ID" });
      return;
    }
    res.json({ todo });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.json({ error: "Invalid Input Type" });
      return;
    }
  }
};

const postTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = postTodoSchema.parse(req.body);
    const todo = await prisma.todo.create({
      data: {
        title: validatedData.title,
        body: validatedData.body,
        isCompleted: validatedData.isCompleted,
      },
    });

    res.json({ message: "Todo created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.json({ message: "Invalid Input Types" });
      return;
    }
    res.status(500).json({ error: "Internal Server Error" });
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
      res.json({ error: "Todo Not Found" });
      return;
    }

    const updatedData: {
      title?: string;
      body?: string;
      isCompleted?: boolean;
    } = {};
    if (validatedData.title !== undefined)
      updatedData.title = validatedData.title;
    if (validatedData.body !== undefined) updatedData.body = validatedData.body;
    if (validatedData.isCompleted !== undefined)
      updatedData.isCompleted = validatedData.isCompleted;

    const updateTodo = await prisma.todo.update({
      where: {
        id: validatedData.id,
      },
      data: updatedData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.json({ error: "Invalid Input Types" });
      return;
    }
    res.json({ error: "Internal Server Error" });
    return;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = getSingleTodoSchema.parse(parseInt(req.params.id));
    const todo = await findTodoById(id);

    if (!todo) {
      res.json({ error: "Todo Not Found" });
      return;
    }

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: `Todo of ID ${id} is deleted.` });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.json({ error: "Invalid Input Type" });
      return;
    }
    res.json({ error: "Internal Server Error" });
    return;
  }
};

export { getTodoById, getTodos, postTodo, updateTodo, deleteTodo };
