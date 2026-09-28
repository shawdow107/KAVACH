import styles from "./Logo.module.css";

export default function Logo({ variant = "dark", compact = false }) {
  const word = variant === "light" ? "#FFFFFF" : "#18181B";
  return (
    <div className={styles.logo} aria-label="KAVACH">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <path
          d="M18 4L30 9.5v9.2c0 7.4-5 12.6-12 14.3C11 31.3 6 26.1 6 18.7V9.5L18 4z"
          fill="#CA8A04"
        />
        <path
          d="M18 10.5v13.8c4.2-1.1 7.6-4.6 7.6-9.8V12.6L18 10.5z"
          fill="#18181B"
          opacity="0.35"
        />
      </svg>
      {!compact && (
        <span className={styles.wordmark} style={{ color: word }}>
          KAVACH
        </span>
      )}
    </div>
  );
}
