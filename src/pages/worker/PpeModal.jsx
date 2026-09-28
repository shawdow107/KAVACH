import { useMemo, useState } from "react";
import { ppeCatalog } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Button from "../../components/Button";
import styles from "./PpeModal.module.css";

const ICONS = {
  helmet: "⛑",
  vest: "🦺",
  boots: "🥾",
  gloves: "🧤",
  goggles: "🥽",
  harness: "🪢",
  ear: "🎧",
};

export default function PpeModal() {
  const { user } = useAuth();
  const { tasks, hasPpeAck, ackPpe } = useData();
  const [checked, setChecked] = useState({});

  const required = useMemo(() => {
    const mine = tasks.find(
      (t) => t.workerIds.includes(user.id) && t.status !== "Completed"
    );
    const ids = mine?.safetyGear?.length
      ? mine.safetyGear
      : ["helmet", "vest", "boots", "gloves"];
    return ppeCatalog.filter((item) => ids.includes(item.id));
  }, [tasks, user.id]);

  if (hasPpeAck(user.id)) return null;

  const allOn = required.every((item) => checked[item.id]);

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  return (
    <div className={styles.full} role="dialog" aria-modal="true" aria-labelledby="ppe-title">
      <div className={styles.panel}>
        <h1 id="ppe-title">Confirm your PPE</h1>
        <p className="muted">
          Tick every item you are wearing. You cannot continue until all required gear is confirmed.
          This cannot be dismissed.
        </p>
        <ul className={styles.list}>
          {required.map((item) => (
            <li key={item.id}>
              <label className={styles.item}>
                <input
                  type="checkbox"
                  checked={Boolean(checked[item.id])}
                  onChange={() => toggle(item.id)}
                />
                <span className={styles.icon} aria-hidden="true">
                  {ICONS[item.id] || "•"}
                </span>
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
        <Button fullWidth disabled={!allOn} onClick={() => ackPpe(user.id)}>
          I&apos;m Ready and Wearing All Gear
        </Button>
      </div>
    </div>
  );
}
