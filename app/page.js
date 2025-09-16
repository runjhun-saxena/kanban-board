"use client";
import { useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import NewTaskForm from "@/components/newTaskForm";
import Column from "@/components/column";
import TaskCard from "../components/taskCard";
import { DEFAULT_BOARD } from "./utils/storage";
export default function Page() {
  const [board, setBoard] = useLocalStorage("kanban-board-v1", DEFAULT_BOARD);

  const addTaskToTodo = useCallback(
    (task) => {
      setBoard((prev) => ({ ...prev, todo: [task, ...prev.todo] }));
    },
    [setBoard]
  );

  const handleDropTask = useCallback(
    ({ taskId, fromColumn, toColumn }) => {
      if (!taskId || !fromColumn || !toColumn) return;
      if (fromColumn === toColumn) return; 
      setBoard((prev) => {
        const moving = prev[fromColumn].find((t) => t.id === taskId);
        if (!moving) return prev;
        return {
          ...prev,
          [fromColumn]: prev[fromColumn].filter((t) => t.id !== taskId),
          [toColumn]: [moving, ...prev[toColumn]],
        };
      });
    },
    [setBoard]
  );

  const handleDeleteTask = useCallback(
    (taskId, columnId) => {
      setBoard((prev) => ({
        ...prev,
        [columnId]: prev[columnId].filter((task) => task.id !== taskId),
      }));
    },
    [setBoard]
  );

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center justify-center md:text-left">Dynamic Kanban Board</h1>

      <NewTaskForm onAdd={addTaskToTodo} />
      <section className="flex flex-col md:flex-row gap-4 md:gap-6 overflow-x-auto">
        <Column id="todo" title="To Do" tasks={board.todo} onDropTask={handleDropTask}>
          {board.todo.map((t) => (
            <TaskCard 
              key={t.id} 
              task={t} 
              columnId="todo" 
              onDelete={(taskId) => handleDeleteTask(taskId, "todo")}
            />
          ))}
        </Column>
        <Column id="inprogress" title="In Progress" tasks={board.inprogress} onDropTask={handleDropTask}>
          {board.inprogress.map((t) => (
            <TaskCard 
              key={t.id} 
              task={t} 
              columnId="inprogress" 
              onDelete={(taskId) => handleDeleteTask(taskId, "inprogress")}
            />
          ))}
        </Column>
        <Column id="done" title="Done" tasks={board.done} onDropTask={handleDropTask}>
          {board.done.map((t) => (
            <TaskCard 
              key={t.id} 
              task={t} 
              columnId="done" 
              onDelete={(taskId) => handleDeleteTask(taskId, "done")}
            />
          ))}
        </Column>
      </section>
    </main>
  );
}
