export function setDragData(dataTransfer, taskId, fromColumn) {
  dataTransfer.setData("application/json", JSON.stringify({ taskId, fromColumn }));
}

export function parseDragData(dataTransfer) {
  try {
    const payload = dataTransfer.getData("application/json");
    if (!payload) return null;
    return JSON.parse(payload);
  } catch (err) {
    return null;
  }
}
