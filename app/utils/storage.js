export const DEFAULT_BOARD = {
  todo: [],
  inprogress: [],
  done: [],
};

export function createTask(title, description) {
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: title.trim(),
    description: description.trim(),
    createdAt: new Date().toISOString(),
  };
}
