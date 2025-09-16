"use client";
import { useState } from "react";
import { createTask } from "../utils/storage";

export default function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const task = createTask(title, desc);
    onAdd(task);
    setTitle("");
    setDesc("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        aria-label="Task title"
        className="flex-1 px-3 py-2 rounded-md border shadow-sm focus:outline-none"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        aria-label="Task description"
        className="w-1/3 px-3 py-2 rounded-md border shadow-sm focus:outline-none"
        placeholder="Optional description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-600 text-white shadow-sm hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
}
