import { useData } from "../../context/DataContext";
import Button from "../../components/Button";
import Card from "../../components/Card";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import styles from "./Reports.module.css";

export default function Reports() {
  const { hazards, tickets, submissions, workerName, reviewHazard, resolveTicket } = useData();

  return (
    <div className="page">
      <header className="page-header">
        <h1>Reports and hazards</h1>
      </header>
      <div className="stack">
        <Card title="Hazard reports">
          {hazards.length === 0 ? (
            <EmptyState title="No hazard reports" />
          ) : (
            <ul className={styles.list}>
              {hazards.map((h) => (
                <li key={h.id}>
                  <div>
                    <strong>{h.type}</strong>
                    <p>
                      {h.location} · {workerName(h.workerId)}
                    </p>
                    <p className="muted">{h.description}</p>
                    {h.photoData ? <img src={h.photoData} alt="" className={styles.photo} /> : null}
                  </div>
                  <div className={styles.side}>
                    <StatusBadge status={h.severity} />
                    <StatusBadge status={h.status} />
                    {h.status !== "Reviewed" ? (
                      <Button onClick={() => reviewHazard(h.id)}>Mark reviewed</Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Help desk">
          {tickets.length === 0 ? (
            <EmptyState title="No requests" />
          ) : (
            <ul className={styles.list}>
              {tickets.map((t) => (
                <li key={t.id}>
                  <div>
                    <strong>
                      {t.category}
                      {t.urgent ? " — EMERGENCY" : ""}
                    </strong>
                    <p>
                      {workerName(t.workerId)} · {new Date(t.createdAt).toLocaleString()}
                    </p>
                    <p className="muted">{t.message}</p>
                  </div>
                  <div className={styles.side}>
                    <StatusBadge status={t.status} />
                    {t.status !== "Resolved" ? (
                      <Button onClick={() => resolveTicket(t.id)}>Resolve</Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Worker submission reports">
          {submissions.length === 0 ? (
            <EmptyState title="No submissions" />
          ) : (
            <ul className={styles.list}>
              {submissions.map((s) => (
                <li key={s.id}>
                  <div>
                    <strong>
                      {workerName(s.workerId)} · {s.date}
                    </strong>
                    <p>{s.workCompleted}</p>
                    <p className="muted">
                      {s.percent}% · Issues: {s.issues || "None"} · Materials: {s.materialsUsed || "NULL"}
                    </p>
                    {s.remarks ? <p className="muted">{s.remarks}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
