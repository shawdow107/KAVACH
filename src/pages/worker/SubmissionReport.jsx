import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { todayISO } from "../../data/mockData";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FormField from "../../components/FormField";
import styles from "./SubmissionReport.module.css";

export default function SubmissionReport() {
  const { user } = useAuth();
  const { addSubmission, submissions } = useData();
  const [form, setForm] = useState({
    workCompleted: "",
    percent: 50,
    issues: "",
    materialsUsed: "",
    remarks: "",
  });
  const [sent, setSent] = useState(false);

  const todaySub = submissions.find((s) => s.workerId === user.id && s.date === todayISO());
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    await addSubmission({ ...form, percent: Number(form.percent), workerId: user.id });
    setSent(true);
  };

  if (sent || todaySub) {
    const rec = todaySub || { ...form, date: todayISO() };
    return (
      <Card>
        <div className={styles.confirm}>
          <h1>Report received</h1>
          <p>Thank you. Your end-of-day report for {rec.date} is with your supervisor.</p>
          <p>
            <strong>{rec.percent}%</strong> complete — {rec.workCompleted}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="stack">
      <header className="page-header">
        <h1>Submission report</h1>
      </header>
      <Card>
        <form onSubmit={submit}>
          <FormField
            id="work"
            label="Work completed"
            as="textarea"
            value={form.workCompleted}
            onChange={set("workCompleted")}
            required
          />
          <FormField id="pct" label={`Percentage complete (${form.percent}%)`}>
            <input
              id="pct"
              type="range"
              min="0"
              max="100"
              value={form.percent}
              onChange={set("percent")}
            />
          </FormField>
          <FormField id="issues" label="Issues faced" as="textarea" value={form.issues} onChange={set("issues")} />
          <FormField id="mat" label="Materials used" value={form.materialsUsed} onChange={set("materialsUsed")} />
          <FormField id="rem" label="Remarks" as="textarea" value={form.remarks} onChange={set("remarks")} />
          <Button type="submit" fullWidth>
            Submit day report
          </Button>
        </form>
      </Card>
    </div>
  );
}
