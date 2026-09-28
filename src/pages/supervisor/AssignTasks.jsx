import { useMemo, useState } from "react";
import { useData } from "../../context/DataContext";
import { ppeCatalog, todayISO, workTypes } from "../../data/mockData";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FormField from "../../components/FormField";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import styles from "./AssignTasks.module.css";

const emptyForm = () => ({
  id: "",
  title: "",
  description: "",
  location: "",
  workType: "Wiring",
  workerIds: [],
  priority: "Medium",
  materialsText: "",
  safetyGear: ["helmet", "vest", "boots"],
  deadline: todayISO(),
  status: "Assigned",
});

export default function AssignTasks() {
  const { tasks, workers, workerName, saveTask, removeTask } = useData();
  const [form, setForm] = useState(emptyForm);
  const [statusFilter, setStatusFilter] = useState("All");
  const [workerFilter, setWorkerFilter] = useState("All");
  const [msg, setMsg] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleWorker = (id) => {
    setForm((f) => ({
      ...f,
      workerIds: f.workerIds.includes(id) ? f.workerIds.filter((x) => x !== id) : [...f.workerIds, id],
    }));
  };

  const toggleGear = (id) => {
    setForm((f) => ({
      ...f,
      safetyGear: f.safetyGear.includes(id) ? f.safetyGear.filter((x) => x !== id) : [...f.safetyGear, id],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.workerIds.length) {
      setMsg("Title and at least one worker are required.");
      return;
    }
    const materials = form.materialsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    await saveTask({
      id: form.id || undefined,
      title: form.title,
      description: form.description,
      location: form.location,
      workType: form.workType,
      workerIds: form.workerIds,
      priority: form.priority,
      materials,
      safetyGear: form.safetyGear,
      deadline: form.deadline,
      status: form.status || "Assigned",
    });
    setForm(emptyForm());
    setMsg("Task saved. Assigned workers will see it on My Task.");
  };

  const edit = (task) => {
    setForm({
      ...task,
      materialsText: (task.materials || []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = useMemo(
    () =>
      tasks.filter((t) => {
        const st = statusFilter === "All" || t.status === statusFilter;
        const wr = workerFilter === "All" || t.workerIds.includes(workerFilter);
        return st && wr;
      }),
    [tasks, statusFilter, workerFilter]
  );

  return (
    <div className="page">
      <header className="page-header">
        <h1>Assign tasks</h1>
      </header>
      <div className="grid grid-2">
        <Card title={form.id ? "Edit task" : "New task"}>
          <form onSubmit={submit}>
            <FormField id="tt" label="Task title" value={form.title} onChange={set("title")} required />
            <FormField id="td" label="Description" as="textarea" value={form.description} onChange={set("description")} />
            <FormField id="tl" label="Location / floor" value={form.location} onChange={set("location")} />
            <FormField id="tw" label="Work type" as="select" value={form.workType} onChange={set("workType")} options={workTypes} />
            <fieldset className={styles.fs}>
              <legend>Assigned worker(s)</legend>
              {workers.map((w) => (
                <label key={w.id}>
                  <input type="checkbox" checked={form.workerIds.includes(w.id)} onChange={() => toggleWorker(w.id)} />
                  {w.name} ({w.id})
                </label>
              ))}
            </fieldset>
            <FormField id="pr" label="Priority" as="select" value={form.priority} onChange={set("priority")} options={["Low", "Medium", "High"]} />
            <FormField
              id="mat"
              label="Required materials (comma separated)"
              value={form.materialsText}
              onChange={set("materialsText")}
              placeholder="Leave empty for NULL"
            />
            <fieldset className={styles.fs}>
              <legend>Required safety gear</legend>
              {ppeCatalog.map((g) => (
                <label key={g.id}>
                  <input type="checkbox" checked={form.safetyGear.includes(g.id)} onChange={() => toggleGear(g.id)} />
                  {g.label}
                </label>
              ))}
            </fieldset>
            <FormField id="dl" label="Deadline" type="date" value={form.deadline} onChange={set("deadline")} />
            {form.id ? (
              <FormField
                id="st"
                label="Status"
                as="select"
                value={form.status}
                onChange={set("status")}
                options={["Assigned", "In Progress", "Completed"]}
              />
            ) : null}
            {msg ? <p role="status">{msg}</p> : null}
            <div className="row">
              <Button type="submit">{form.id ? "Update task" : "Assign task"}</Button>
              {form.id ? (
                <Button variant="secondary" onClick={() => setForm(emptyForm())}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </form>
        </Card>
        <Card title="Assigned tasks">
          <div className="filter-bar">
            <FormField
              id="sf"
              label="Status"
              as="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={["All", "Assigned", "In Progress", "Completed"]}
            />
            <FormField
              id="wf"
              label="Worker"
              as="select"
              value={workerFilter}
              onChange={(e) => setWorkerFilter(e.target.value)}
              options={[{ value: "All", label: "All workers" }, ...workers.map((w) => ({ value: w.id, label: w.name }))]}
            />
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No matching tasks" />
          ) : (
            <ul className={styles.list}>
              {filtered.map((t) => (
                <li key={t.id}>
                  <div>
                    <strong>{t.title}</strong>
                    <p className="muted">
                      {t.location} · {t.workerIds.map(workerName).join(", ")}
                    </p>
                    <StatusBadge status={t.status} />
                  </div>
                  <div className={styles.actions}>
                    <Button variant="secondary" onClick={() => edit(t)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => removeTask(t.id)}>
                      Delete
                    </Button>
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
