"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

type Todo = {
  id: number;
  content: string;
  done: boolean;
};

export function TodoList() {
    const [newTodo, setNewTodo] = useState("");
    const utils = api.useUtils();

    const { data: todos, isLoading, error } =  api.todo.getTodos.useQuery();

    const addTodo = api.todo.addTodo.useMutation({
        onSuccess: () => {
        setNewTodo("");
        utils.todo.getTodos.invalidate();
        },
    });

    const toggleDone = api.todo.setDone.useMutation({
        onSuccess: () => utils.todo.getTodos.invalidate(),
    });

    const deleteTodo = api.todo.deleteTodo.useMutation({
        onSuccess: () => utils.todo.getTodos.invalidate(),
    });

    const handleAdd = () => {
        if (newTodo.length) {
        addTodo.mutate(newTodo);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading todos: {error.message}</div>;    

    return (
        <div>
            <div>
                <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a todo"
                />
                <button onClick={handleAdd}>Add Todo</button>
            </div>
            {todos?.length === 0 ? (
                <div>No todos found.</div>
            ) : (
                <ul>
                {todos?.map((todo: Todo) => (
                    <li key={todo.id} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() =>
                        toggleDone.mutate({ id: todo.id, done: !todo.done })
                        }
                    />
                    <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                        {todo.content}
                    </span>
                    <button onClick={() => deleteTodo.mutate(todo.id)}>🗑️</button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}