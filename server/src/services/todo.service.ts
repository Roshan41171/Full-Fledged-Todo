import prisma from "../prisma/prismaConfig";

export const findTodoById = async (id: number) => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
  });
};

export const getAllTodos = async () => {
  return await prisma.todo.findMany();
};
