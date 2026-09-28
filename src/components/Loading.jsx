import styles from "./Loading.module.css";

export default function Loading({ label = "Loading" }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}
