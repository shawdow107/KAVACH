import { useMemo, useState } from "react";
import { useData } from "../../context/DataContext";
import { todayISO } from "../../data/mockData";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FormField from "../../components/FormField";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import styles from "./Attendance.module.css";

function workerPercent(records) {
  if (!records.length) return 0;
  const present = records.filter((r) => r.status === "Present" || r.status === "Late").length;
  return Math.round((present / records.length) * 100);
}

export default function Attendance() {
  const { attendance, workers } = useData();
  const [date, setDate] = useState(todayISO());
  const [status, setStatus] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 8;

  const rows = useMemo(() => {
    return workers
      .map((w) => {
        const a = attendance.find((x) => x.workerId === w.id && x.date === date);
        return {
          id: a?.id || `${w.id}-${date}`,
          workerId: w.id,
          name: w.name,
          checkIn: a?.checkIn || "",
          checkOut: a?.checkOut || "",
          status: a?.status || "Absent",
          hours: a?.hours || 0,
          percent: workerPercent(attendance.filter((x) => x.workerId === w.id)),
        };
      })
      .filter((a) => (status === "All" ? true : a.status === status))
      .filter((a) => a.name.toLowerCase().includes(q.trim().toLowerCase()));
  }, [attendance, workers, date, status, q]);

  const overall = workerPercent(attendance.filter((a) => a.date === date));
  const slice = rows.slice(page * pageSize, page * pageSize + pageSize);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));

  const exportCsv = () => {
    const header = "Name,ID,Check-in,Check-out,Status,Hours,Attendance %";
    const body = rows
      .map((r) => [r.name, r.workerId, r.checkIn || "", r.checkOut || "", r.status, r.hours, r.percent].join(","))
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kavach-attendance-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    { key: "name", label: "Worker" },
    { key: "workerId", label: "ID" },
    { key: "checkIn", label: "Check-in", render: (r) => r.checkIn || "—" },
    { key: "checkOut", label: "Check-out", render: (r) => r.checkOut || "—" },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "hours", label: "Hours" },
    { key: "percent", label: "Attendance %", render: (r) => `${r.percent}%` },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Attendance sheet</h1>
          <p className="muted">
            Overall for {date}: <strong>{overall}%</strong> · roster {workers.length} workers
          </p>
        </div>
        <Button onClick={exportCsv}>Export CSV</Button>
      </header>
      <Card>
        <div className="filter-bar">
          <FormField id="att-date" label="Date" type="date" value={date} onChange={(e) => { setDate(e.target.value); setPage(0); }} />
          <FormField
            id="att-status"
            label="Status"
            as="select"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(0); }}
            options={["All", "Present", "Late", "Absent"]}
          />
          <FormField id="att-q" label="Search name" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Worker name" />
        </div>
        <DataTable columns={columns} rows={slice} />
        <div className={styles.pager}>
          <Button variant="secondary" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span>
            Page {page + 1} of {pages}
          </span>
          <Button variant="secondary" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
