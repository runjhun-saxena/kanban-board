"use client";
import { parseDragData } from "@/app/utils/drag";
export default function Column({ id, title, tasks, onDropTask, children }) {
  function handleDragOver(e) {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e) {
    e.preventDefault();
    const payload = parseDragData(e.dataTransfer);
    if (!payload) return;
    onDropTask({ taskId: payload.taskId, fromColumn: payload.fromColumn, toColumn: id });
  }

  return (
    <div className="flex-1 p-3 sm:p-4 bg-gray-100 rounded-md min-h-[250px] md:min-h-[300px] w-full md:w-auto column" style={{ backgroundColor: 'var(--column-bg)' }}>
      <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 truncate">{title}</h3>
      <div 
        onDragOver={handleDragOver} 
        onDrop={handleDrop} 
        className="min-h-[180px] sm:min-h-[220px] overflow-y-auto max-h-[60vh]"
      >
        {children}
        {tasks.length === 0 && <div className="text-sm text-gray-500 mt-2">No tasks</div>}
      </div>
    </div>
  );
}
