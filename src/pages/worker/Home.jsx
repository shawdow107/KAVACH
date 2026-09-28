import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { todayISO } from "../../data/mockData";
import Button from "../../components/Button";
import Card from "../../components/Card";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuth();
  const { attendance, checkIn, checkOut } = useData();
  const today = todayISO();
  const mine = attendance.filter((a) => a.workerId === user.id);
  const todayRow = mine.find((a) => a.date === today);
  const history = mine.filter((a) => a.date !== today).slice(0, 7);

  return (
    <div className="stack">
      <header className="page-header">
        <div>
          <h1>Attendance</h1>
          <p className="muted">Check in and out with a large tap target. Time is stored on this device until an API is connected.</p>
        </div>
      </header>

      <Card>
        <p className={styles.date}>
          {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <p className={styles.clock}>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        <div className={styles.actions}>
          <Button fullWidth onClick={() => checkIn(user.id)} disabled={Boolean(todayRow?.checkIn && !todayRow?.checkOut)}>
            Check in
          </Button>
          <Button
            variant="chrome"
            fullWidth
            onClick={() => checkOut(user.id)}
            disabled={!todayRow?.checkIn || Boolean(todayRow?.checkOut)}
          >
            Check out
          </Button>
        </div>
      </Card>

      <Card title="Today">
        {todayRow ? (
          <ul className={styles.meta}>
            <li>
              Status <StatusBadge status={todayRow.status} />
            </li>
            <li>Check-in {todayRow.checkIn || "—"}</li>
            <li>Check-out {todayRow.checkOut || "—"}</li>
            <li>Hours so far {todayRow.hours || (todayRow.checkIn ? "in progress" : "0")}</li>
          </ul>
        ) : (
          <EmptyState title="Not checked in" body="Tap Check in when you arrive on site." />
        )}
      </Card>

      <Card title="Recent days">
        {history.length === 0 ? (
          <EmptyState title="No history yet" />
        ) : (
          <ul className={styles.history}>
            {history.map((row) => (
              <li key={row.id}>
                <span>{row.date}</span>
                <StatusBadge status={row.status} />
                <span>{row.hours || 0}h</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
