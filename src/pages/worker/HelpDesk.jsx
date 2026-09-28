import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { helpCategories } from "../../data/mockData";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FormField from "../../components/FormField";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import styles from "./HelpDesk.module.css";

export default function HelpDesk() {
  const { user } = useAuth();
  const { tickets, addTicket } = useData();
  const [category, setCategory] = useState("Need supervisor");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const mine = tickets.filter((t) => t.workerId === user.id);

  const send = async (urgent) => {
    if (!message.trim() && !urgent) {
      setNote("Write a short message, or use the emergency button.");
      return;
    }
    await addTicket({
      workerId: user.id,
      category: urgent ? "Injury" : category,
      message: message.trim() || "EMERGENCY — worker requested immediate help.",
      urgent,
    });
    setMessage("");
    setNote(urgent ? "Emergency request sent to your supervisor." : "Help request sent.");
  };

  return (
    <div className="stack">
      <header className="page-header">
        <h1>Help desk</h1>
      </header>
      <Card title="I need help">
        <p className="muted">Pick a category, then send a message. Use emergency only for injury or immediate danger.</p>
        <div className={styles.cats} role="group" aria-label="Help categories">
          {helpCategories.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.cat} ${category === c ? styles.on : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <FormField id="help-msg" label="Message" as="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
        {note ? <p role="status">{note}</p> : null}
        <div className={styles.actions}>
          <Button fullWidth onClick={() => send(false)}>
            Send request
          </Button>
          <Button variant="danger" fullWidth onClick={() => send(true)} ariaLabel="Urgent emergency help">
            Emergency
          </Button>
        </div>
      </Card>
      <Card title="My tickets">
        {mine.length === 0 ? (
          <EmptyState title="No tickets yet" />
        ) : (
          <ul className={styles.list}>
            {mine.map((t) => (
              <li key={t.id}>
                <div>
                  <strong>{t.category}</strong>
                  {t.urgent ? <span className={styles.urgent}>Urgent</span> : null}
                  <p>{t.message}</p>
                </div>
                <StatusBadge status={t.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
