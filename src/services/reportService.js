const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/** Replace with GET /hazards */
export async function fetchHazards(items) {
  await delay();
  return items;
}

/** Replace with POST /hazards */
export async function createHazardRequest(item) {
  await delay();
  return item;
}

/** Replace with PATCH /hazards/:id */
export async function reviewHazardRequest(id) {
  await delay();
  return { id, status: "Reviewed" };
}

/** Replace with GET /submissions */
export async function fetchSubmissions(items) {
  await delay();
  return items;
}

/** Replace with POST /submissions */
export async function createSubmissionRequest(item) {
  await delay();
  return item;
}
