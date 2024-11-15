import { z } from "zod";

const postTodoSchema = z.object({
  title: z.string().max(20),
  body: z.string(),
  isCompleted: z.boolean(),
});

const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string().max(20).optional(),
  body: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

const getSingleTodoSchema = z.number();

export { postTodoSchema, updateTodoSchema, getSingleTodoSchema };
