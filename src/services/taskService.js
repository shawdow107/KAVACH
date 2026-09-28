const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/** Replace with GET /tasks */
export async function fetchTasks(tasks) {
  await delay();
  return tasks;
}

/** Replace with POST /tasks */
export async function createTaskRequest(task) {
  await delay();
  return task;
}

/** Replace with PATCH /tasks/:id */
export async function updateTaskRequest(task) {
  await delay();
  return task;
}

/** Replace with DELETE /tasks/:id */
export async function deleteTaskRequest(id) {
  await delay();
  return { id };
}
