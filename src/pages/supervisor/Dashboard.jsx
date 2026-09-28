import { useMemo } from "react";
import { useData } from "../../context/DataContext";
import { todayISO } from "../../data/mockData";
import Card from "../../components/Card";
import StatusBadge from "../../components/StatusBadge";
import ProgressRing from "../../components/ProgressRing";
import BarChart from "../../components/BarChart";
import EmptyState from "../../components/EmptyState";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { workers, attendance, tasks, hazards, dailyPlan, workerName } = useData();
  const today = todayISO();
  const todayAtt = attendance.filter((a) => a.date === today);
  const present = todayAtt.filter((a) => a.status === "Present" || a.status === "Late").length;
  const absent = workers.length - present;
  const pct = workers.length ? Math.round((present / workers.length) * 100) : 0;

  const taskStats = useMemo(() => {
    const assigned = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const remaining = assigned - completed;
    return { assigned, completed, inProgress, remaining };
  }, [tasks]);

  const liveWork = tasks.filter((t) => t.status !== "Completed");
  const recentHazards = hazards.slice(0, 4);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">North Tower — Block B · {today}</p>
        </div>
      </header>

      <div className="grid grid-4">
        <Card>
          <p className={styles.kpiLabel}>Total workers</p>
          <p className={styles.kpi}>{workers.length}</p>
        </Card>
        <Card>
          <p className={styles.kpiLabel}>Present today</p>
          <p className={styles.kpi}>{present}</p>
        </Card>
        <Card>
          <p className={styles.kpiLabel}>Absent today</p>
          <p className={styles.kpi}>{absent}</p>
        </Card>
        <Card>
          <ProgressRing value={pct} label="On site" />
        </Card>
      </div>

      <div className={`grid grid-2 ${styles.block}`}>
        <Card title="Task statistics">
          <div className="grid grid-4">
            <div>
              <p className={styles.kpiLabel}>Assigned</p>
              <p className={styles.kpiSm}>{taskStats.assigned}</p>
            </div>
            <div>
              <p className={styles.kpiLabel}>Completed</p>
              <p className={styles.kpiSm}>{taskStats.completed}</p>
            </div>
            <div>
              <p className={styles.kpiLabel}>In progress</p>
              <p className={styles.kpiSm}>{taskStats.inProgress}</p>
            </div>
            <div>
              <p className={styles.kpiLabel}>Remaining</p>
              <p className={styles.kpiSm}>{taskStats.remaining}</p>
            </div>
          </div>
          <BarChart
            ariaLabel="Task status chart"
            items={[
              { label: "Completed", value: taskStats.completed, color: "#15803D" },
              { label: "In progress", value: taskStats.inProgress, color: "#CA8A04" },
              { label: "Remaining", value: Math.max(0, taskStats.remaining - taskStats.inProgress), color: "#18181B" },
            ]}
          />
        </Card>
        <Card title="Today's work">
          {liveWork.length === 0 ? (
            <EmptyState title="No live work" />
          ) : (
            <ul className={styles.work}>
              {liveWork.map((t) => (
                <li key={t.id}>
                  <div>
                    <strong>
                      {t.location}: {t.workType}
                    </strong>
                    <p className="muted">
                      {t.workerIds.length} worker{t.workerIds.length === 1 ? "" : "s"} —{" "}
                      {t.workerIds.map(workerName).join(", ")}
                    </p>
                  </div>
                  <StatusBadge status={t.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className={`grid grid-2 ${styles.block}`}>
        <Card title="Daily report">
          <h3>Completed so far</h3>
          <ul>
            {dailyPlan.completed.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {tasks
              .filter((t) => t.status === "Completed")
              .map((t) => (
                <li key={t.id}>{t.title}</li>
              ))}
          </ul>
          <h3>Planned today</h3>
          <ul>
            {dailyPlan.planned.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card title="Recent hazard alerts">
          {recentHazards.length === 0 ? (
            <EmptyState title="No hazards" />
          ) : (
            <ul className={styles.work}>
              {recentHazards.map((h) => (
                <li key={h.id}>
                  <div>
                    <strong>{h.type}</strong>
                    <p className="muted">
                      {h.location} · {workerName(h.workerId)}
                    </p>
                  </div>
                  <StatusBadge status={h.severity} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
