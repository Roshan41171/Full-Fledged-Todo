"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText.trim() !== "") {
      if (editingId !== null) {
        setTodos(
          todos.map((todo) =>
            todo.id === editingId ? { ...todo, text: inputText } : todo
          )
        );
        setEditingId(null);
      } else {
        setTodos([
          ...todos,
          { id: Date.now(), text: inputText, completed: false },
        ]);
      }
      setInputText("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputText(todoToEdit.text);
      setEditingId(id);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2"
        />
        <Button onClick={addTodo}>
          {editingId !== null ? "Update" : "Add"}
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <div className="flex items-center">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editTodo(todo.id)}
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
