import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { hazardTypes } from "../../data/mockData";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FormField from "../../components/FormField";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import styles from "./HazardReport.module.css";

export default function HazardReport() {
  const { user } = useAuth();
  const { hazards, addHazard } = useData();
  const [form, setForm] = useState({
    type: "Fall hazard",
    severity: "Medium",
    location: "",
    description: "",
    photoName: "",
    photoData: "",
  });
  const [done, setDone] = useState("");
  const [error, setError] = useState("");

  const mine = hazards.filter((h) => h.workerId === user.id);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, photoName: file.name, photoData: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.location.trim() || !form.description.trim()) {
      setError("Location and description are required.");
      return;
    }
    setError("");
    await addHazard({ ...form, workerId: user.id });
    setDone("Hazard report submitted. Your supervisor can review it now.");
    setForm({ type: "Fall hazard", severity: "Medium", location: "", description: "", photoName: "", photoData: "" });
  };

  return (
    <div className="stack">
      <header className="page-header">
        <h1>Report a hazard</h1>
      </header>
      <Card>
        <form onSubmit={submit}>
          <FormField id="htype" label="Hazard type" as="select" value={form.type} onChange={set("type")} options={hazardTypes} />
          <FormField
            id="sev"
            label="Severity"
            as="select"
            value={form.severity}
            onChange={set("severity")}
            options={["Low", "Medium", "High"]}
          />
          <FormField id="loc" label="Location" value={form.location} onChange={set("location")} required />
          <FormField id="desc" label="Description" as="textarea" value={form.description} onChange={set("description")} required />
          <FormField id="photo" label="Photo (optional)">
            <input id="photo" type="file" accept="image/*" onChange={onFile} />
          </FormField>
          {form.photoData ? (
            <img className={styles.preview} src={form.photoData} alt="Hazard preview" />
          ) : null}
          {error ? <p className={styles.err} role="alert">{error}</p> : null}
          {done ? <p className={styles.ok} role="status">{done}</p> : null}
          <Button type="submit" fullWidth>
            Submit hazard report
          </Button>
        </form>
      </Card>
      <Card title="My past reports">
        {mine.length === 0 ? (
          <EmptyState title="No reports yet" />
        ) : (
          <ul className={styles.past}>
            {mine.map((h) => (
              <li key={h.id}>
                <div>
                  <strong>{h.type}</strong>
                  <p className="muted">{h.location}</p>
                </div>
                <StatusBadge status={h.severity} />
                <StatusBadge status={h.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
