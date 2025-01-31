import { postTodo } from "./../api/index";
import { GET_TODOS, POST_TODO } from "@/constants";
import { getTodos } from "@/api";
import { Todo } from "@/types";

import { AppDispatch } from "@/store/store";

export const getTodosAction = () => async (dispatch: AppDispatch) => {
  try {
    const res = await getTodos();
    const data = await res.data;
    dispatch({ type: GET_TODOS, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const postTodoAction =
  ({ todo }: { todo: Todo }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await postTodo({ newTodo: todo });
      const data = await response.data;
      dispatch({ type: POST_TODO, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
