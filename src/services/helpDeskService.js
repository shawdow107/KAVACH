const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/** Replace with GET /help-desk */
export async function fetchTickets(items) {
  await delay();
  return items;
}

/** Replace with POST /help-desk */
export async function createTicketRequest(item) {
  await delay();
  return item;
}

/** Replace with PATCH /help-desk/:id/resolve */
export async function resolveTicketRequest(id) {
  await delay();
  return { id, status: "Resolved" };
}
