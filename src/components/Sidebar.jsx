import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

const LINKS = [
  { to: "/supervisor/dashboard", label: "Dashboard" },
  { to: "/supervisor/attendance", label: "Attendance sheet" },
  { to: "/supervisor/tasks", label: "Assign tasks" },
  { to: "/supervisor/reports", label: "Reports & hazards" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button type="button" className={styles.scrim} aria-label="Close menu" onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`} aria-label="Supervisor navigation">
        <div className={styles.brand}>
          <Logo variant="light" />
          <p className={styles.tag}>Site safety shield</p>
        </div>
        <nav className={styles.nav}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
              onClick={onClose}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
