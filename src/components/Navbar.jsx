import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const ITEMS = [
  { to: "/worker/home", label: "Home" },
  { to: "/worker/task", label: "Task" },
  { to: "/worker/hazard", label: "Hazard" },
  { to: "/worker/help", label: "Help" },
  { to: "/worker/report", label: "Report" },
];

export default function Navbar() {
  return (
    <nav className={styles.nav} aria-label="Worker navigation">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
