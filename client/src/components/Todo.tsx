"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/types";

import {
  addTodoMutation,
  updateTodoMutation,
  deleteTodoMutation,
} from "@/services/mutations";

const API_BASE_URL = "http://localhost:5000/api";

export default function Todo() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/todo`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const queryClient = useQueryClient();

  const addTodoMutate = useMutation({
    mutationFn: addTodoMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutate = useMutation({
    mutationFn: updateTodoMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutate = useMutation({
    mutationFn: deleteTodoMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addTodo = () => {
    if (inputTitle.trim() !== "") {
      if (editingId !== null) {
        const todoToUpdate = todos.find((todo: Todo) => todo.id === editingId);
        if (todoToUpdate) {
          updateTodoMutate.mutate({
            ...todoToUpdate,
            title: inputTitle,
            body: inputBody,
          });
        }
        setEditingId(null);
      } else {
        addTodoMutate.mutate({
          title: inputTitle,
          body: inputBody,
          isCompleted: false,
        });
      }
      setInputTitle("");
      setInputBody("");
    }
  };

  const deleteTodo = (id: number) => {
    deleteTodoMutate.mutate(id);
  };

  const toggleTodo = (todo: Todo) => {
    updateTodoMutate.mutate({
      ...todo,
      isCompleted: !todo.isCompleted,
    });
  };

  const editTodo = (todo: Todo) => {
    setInputTitle(todo.title);
    setInputBody(todo.body);
    setEditingId(todo.id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Some Error Occurred</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <div className="flex flex-col gap-2 mb-4">
        <Input
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Todo title"
          className="flex-grow"
        />
        <Input
          type="text"
          value={inputBody}
          onChange={(e) => setInputBody(e.target.value)}
          placeholder="Todo description"
          className="flex-grow"
        />
        <Button onClick={addTodo}>
          {editingId !== null ? "Update" : "Add"}
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <div className="flex items-center">
              <Checkbox
                checked={todo.isCompleted}
                onCheckedChange={() => toggleTodo(todo)}
                className="mr-2"
              />
              <div
                className={`${
                  todo.isCompleted ? "line-through text-gray-500" : ""
                }`}
              >
                <div className="font-medium">{todo.title}</div>
                <div className="text-sm text-gray-600">{todo.body}</div>
              </div>
            </div>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editTodo(todo)}
                className="mr-1"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
