import { users } from "../data/mockData";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

/**
 * Mock login. Replace with POST /auth/login.
 */
export async function loginRequest(username, password, role) {
  await delay();
  const user = users.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password &&
      u.role === role
  );
  if (!user) {
    const err = new Error("Invalid ID or password for this role.");
    throw err;
  }
  const { password: _pw, ...safe } = user;
  return safe;
}
