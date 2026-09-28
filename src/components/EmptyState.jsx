import styles from "./EmptyState.module.css";

export default function EmptyState({ title, body }) {
  return (
    <div className={styles.empty} role="status">
      <strong>{title}</strong>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
