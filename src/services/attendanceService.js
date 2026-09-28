const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/** Replace with GET /attendance?date= */
export async function fetchAttendance(records) {
  await delay();
  return records;
}

/** Replace with POST /attendance/check-in */
export async function checkInRequest(payload) {
  await delay();
  return payload;
}

/** Replace with POST /attendance/check-out */
export async function checkOutRequest(payload) {
  await delay();
  return payload;
}
