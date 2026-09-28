import Button from "./Button";
import styles from "./TopBar.module.css";

export default function TopBar({ name, onLogout, onMenu }) {
  return (
    <header className={styles.bar}>
      <button type="button" className={styles.menu} onClick={onMenu} aria-label="Open navigation">
        Menu
      </button>
      <p className={styles.who}>
        Supervisor <strong>{name}</strong>
      </p>
      <Button variant="primary" onClick={onLogout}>
        Logout
      </Button>
    </header>
  );
}
