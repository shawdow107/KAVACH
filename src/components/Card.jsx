import styles from "./Card.module.css";

export default function Card({ children, title, action, as: Tag = "section", className = "" }) {
  return (
    <Tag className={`${styles.card} ${className}`.trim()}>
      {(title || action) && (
        <header className={styles.head}>
          {title ? <h2>{title}</h2> : <span />}
          {action}
        </header>
      )}
      {children}
    </Tag>
  );
}
