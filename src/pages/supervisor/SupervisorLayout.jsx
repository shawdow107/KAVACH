import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import styles from "./SupervisorLayout.module.css";

export default function SupervisorLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className={styles.body}>
        <TopBar name={user.name} onLogout={logout} onMenu={() => setOpen(true)} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
