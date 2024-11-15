import prisma from "../configs/prismaConfig";

interface Itodo {
  title: string;
  body: string;
  isCompleted: boolean;
}

interface IupdateTodo {
  title?: string;
  body?: string;
  isCompleted?: boolean;
}

interface IupdateTodoWithId extends IupdateTodo {
  id: number;
}

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

export const createTodo = async (data: Itodo) => {
  return await prisma.todo.create({
    data: {
      title: data.title,
      body: data.body,
      isCompleted: data.isCompleted,
    },
  });
};

export const updateTodoService = async (data: IupdateTodoWithId) => {
  const updatedData: IupdateTodo = {};
  if (data.title !== undefined) updatedData.title = data.title;
  if (data.body !== undefined) updatedData.body = data.body;
  if (data.isCompleted !== undefined)
    updatedData.isCompleted = data.isCompleted;

  return await prisma.todo.update({
    where: {
      id: data.id,
    },
    data: updatedData,
  });
};

export const deleteTodoById = async (id: number) => {
  return await prisma.todo.delete({
    where: {
      id: id,
    },
  });
};
