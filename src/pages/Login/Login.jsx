import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DEMO_PASSWORD } from "../../data/mockData";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import Logo from "../../components/Logo";
import styles from "./Login.module.css";

export default function Login() {
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("supervisor");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!username.trim()) next.username = "Enter your ID.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    try {
      const user = await login(username, password, role);
      navigate(user.role === "supervisor" ? "/supervisor/dashboard" : "/worker/home");
    } catch {
      /* error is stored in AuthContext */
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Logo />
        <p className={styles.lead}>Site safety, attendance and task control.</p>

        <div className={styles.tabs} role="tablist" aria-label="Choose role">
          {["supervisor", "worker"].map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={role === r}
              className={`${styles.tab} ${role === r ? styles.tabOn : ""}`}
              onClick={() => setRole(r)}
            >
              {r === "supervisor" ? "Supervisor" : "Worker"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} noValidate>
          <FormField
            id="username"
            label="ID / username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={fieldErrors.username}
            placeholder={role === "supervisor" ? "SUP001" : "WRK001"}
            required
          />
          <FormField id="password" label="Password" error={fieldErrors.password} required>
            <div className={styles.pass}>
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                aria-invalid={Boolean(fieldErrors.password)}
              />
              <button type="button" onClick={() => setShow((s) => !s)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </FormField>
          {error ? (
            <p className={styles.banner} role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <aside className={styles.demo} aria-label="Demo credentials">
          <h2>Demo logins</h2>
          <p>Password for all accounts: <strong>{DEMO_PASSWORD}</strong></p>
          <ul>
            <li>Supervisor — SUP001</li>
            <li>Worker — WRK001 (Ravi, wiring)</li>
            <li>Worker — WRK002 (Meena, plumbing)</li>
            <li>Worker — WRK003 (Arjun, masonry)</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}
