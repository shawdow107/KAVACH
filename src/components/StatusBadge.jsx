import styles from "./StatusBadge.module.css";

const MAP = {
  Present: "success",
  Completed: "success",
  Resolved: "success",
  Reviewed: "success",
  Absent: "danger",
  High: "danger",
  Open: "danger",
  Late: "warning",
  "In Progress": "warning",
  Medium: "warning",
  Assigned: "neutral",
  Low: "neutral",
};

export default function StatusBadge({ status }) {
  const tone = MAP[status] || "neutral";
  return <span className={`${styles.badge} ${styles[tone]}`}>{status}</span>;
}
