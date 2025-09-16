"use client";
import { motion } from "framer-motion";
import { setDragData } from "@/app/utils/drag";
import { useState, useEffect } from "react";

export default function TaskCard({ task, columnId, onDelete }) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const isDone = columnId === "done";

  useEffect(() => {
    if (isDone) {
      setShowCheckmark(true);
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [isDone]);

  function handleDragStart(e) {
    setDragData(e.dataTransfer, task.id, columnId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDelete(e) {
    e.stopPropagation();
    onDelete(task.id);
  }
  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { type: "spring", duration: 1.5, bounce: false },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      draggable={!isDone} // Optional: prevent dragging from done column
      onDragStart={handleDragStart}
      className={`p-2 sm:p-3 rounded-md mb-2 sm:mb-3 card-shadow hover:shadow-md transition-shadow w-full break-words relative ${isDone ? 'border-green-500 border' : ''} ${isDone && showCheckmark ? 'task-completed' : ''}`}
      style={{ backgroundColor: 'var(--card-bg)' }}
      role="article"
      aria-roledescription="task"
      aria-label={task.title}
    >
      {/* Tick mark animation overlay */}
      {showCheckmark && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-opacity-70 bg-white dark:bg-opacity-70 dark:bg-gray-800 rounded-md z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.svg 
            width="80" 
            height="80" 
            viewBox="0 0 100 100" 
            className="text-green-500 stroke-current checkmark-bounce"
            style={{ originX: '50%', originY: '50%' }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                transition: { duration: 0.5, delay: 0.2 }
              }}
            />
            <motion.path
              d="M28 50 L45 67 L72 40"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>
        </motion.div>
      )}
      
      {/* Task content */}
      <div className="flex justify-between">
        <h4 className="font-bold text-sm sm:text-base truncate">{task.title}</h4>
        {isDone && (
          <button 
            onClick={handleDelete}
            className="delete-btn h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            aria-label="Delete task"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      {task.description && <p className="text-xs sm:text-sm mt-1 line-clamp-3">{task.description}</p>}
      <div className="text-xs text-gray-400 mt-2 truncate">{new Date(task.createdAt).toLocaleString()}</div>
    </motion.div>
  );
}
