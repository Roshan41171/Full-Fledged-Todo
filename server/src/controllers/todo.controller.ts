import prisma from "../prisma/prismaConfig";
import { postTodoSchema, update_and_delete_TodoSchema } from "../zod/zodConfig";
import type { Request, Response } from "express";
import { z } from "zod";

const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await prisma.todo.findMany();

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
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
    const validatedData = update_and_delete_TodoSchema.parse({
      id: req.params.id,
      ...req.body,
    });
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

export { getTodo, postTodo, updateTodo };
