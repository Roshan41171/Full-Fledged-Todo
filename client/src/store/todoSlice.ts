import { UnknownAction } from "@reduxjs/toolkit";
import { GET_TODOS, POST_TODO } from "@/constants";

const initialState = { todos: [] };

const todoReducer = (state = initialState, action: UnknownAction) => {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.payload };
    case POST_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};

export default todoReducer;
