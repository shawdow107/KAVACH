import styles from "./BarChart.module.css";

export default function BarChart({ items, ariaLabel = "Chart" }) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <ul className={styles.chart} aria-label={ariaLabel}>
      {items.map((item) => (
        <li key={item.label}>
          <span className={styles.label}>{item.label}</span>
          <div className={styles.track}>
            <div
              className={styles.bar}
              style={{ width: `${(item.value / max) * 100}%`, background: item.color }}
            />
          </div>
          <span className={styles.value}>{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
