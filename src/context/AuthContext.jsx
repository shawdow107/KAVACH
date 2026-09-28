import { createContext, useContext, useMemo, useState } from "react";
import { loginRequest } from "../services/authService";

const AUTH_KEY = "kavach-auth";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (username, password, role) => {
    setLoading(true);
    setError("");
    try {
      const next = await loginRequest(username, password, role);
      setUser(next);
      localStorage.setItem(AUTH_KEY, JSON.stringify(next));
      return next;
    } catch (err) {
      setError(err.message || "Login failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const value = useMemo(
    () => ({ user, loading, error, setError, login, logout }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
