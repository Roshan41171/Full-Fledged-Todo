import { z } from "zod";

const postTodoSchema = z.object({
  title: z.string().max(20),
  body: z.string(),
  isCompleted: z.boolean(),
});

const update_and_delete_TodoSchema = z.object({
  id: z.number(),
  title: z.string().max(20).optional(),
  body: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

export { postTodoSchema, update_and_delete_TodoSchema };
