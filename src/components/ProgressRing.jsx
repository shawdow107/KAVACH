import styles from "./ProgressRing.module.css";

export default function ProgressRing({ value, label = "Attendance" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 140 140" width="140" height="140" role="img" aria-label={`${label} ${pct} percent`}>
        <circle className={styles.track} cx="70" cy="70" r={r} />
        <circle
          className={styles.bar}
          cx="70"
          cy="70"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <text x="70" y="66" textAnchor="middle" className={styles.value}>
          {pct}%
        </text>
        <text x="70" y="88" textAnchor="middle" className={styles.caption}>
          {label}
        </text>
      </svg>
    </div>
  );
}
