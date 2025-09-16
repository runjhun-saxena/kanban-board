"use client";
import { useState } from "react";
import { createTask } from "@/app/utils/storage";

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
    <form onSubmit={handleSubmit} className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
      <input
        aria-label="Task title"
        className="w-full flex-1 px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ backgroundColor: 'var(--card-bg)' }}
      />
      <input
        aria-label="Task description"
        className="w-full sm:w-1/3 px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Optional description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ backgroundColor: 'var(--card-bg)' }}
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-4 py-2 rounded-md text-white shadow-sm hover:opacity-90 transition"
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        Add Task
      </button>
    </form>
  );
}
