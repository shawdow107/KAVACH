import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Button from "../../components/Button";
import Card from "../../components/Card";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import styles from "./MyTask.module.css";

export default function MyTask() {
  const { user } = useAuth();
  const { tasks, setTaskStatus } = useData();
  const task = tasks.find((t) => t.workerIds.includes(user.id) && t.status !== "Completed") ||
    tasks.find((t) => t.workerIds.includes(user.id));

  if (!task) {
    return <EmptyState title="No assigned task" body="Your supervisor has not assigned work yet." />;
  }

  const materials = task.materials?.length ? task.materials : null;

  return (
    <div className="stack">
      <header className="page-header">
        <h1>My task</h1>
      </header>
      <Card>
        <div className={styles.head}>
          <h2>{task.title}</h2>
          <StatusBadge status={task.status} />
        </div>
        <p>{task.description}</p>
        <dl className={styles.dl}>
          <div>
            <dt>Location / floor</dt>
            <dd>{task.location}</dd>
          </div>
          <div>
            <dt>Work type</dt>
            <dd>{task.workType}</dd>
          </div>
          <div>
            <dt>Priority</dt>
            <dd>{task.priority}</dd>
          </div>
          <div>
            <dt>Deadline</dt>
            <dd>{task.deadline}</dd>
          </div>
        </dl>
        <h3>Materials required</h3>
        {materials ? (
          <ul className={styles.list}>
            {materials.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.null}>NULL</p>
        )}
        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={() => setTaskStatus(task.id, "In Progress")}
            disabled={task.status === "Completed"}
          >
            Mark in progress
          </Button>
          <Button onClick={() => setTaskStatus(task.id, "Completed")} disabled={task.status === "Completed"}>
            Mark completed
          </Button>
        </div>
      </Card>
    </div>
  );
}
