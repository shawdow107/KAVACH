import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import PpeModal from "./PpeModal";
import styles from "./WorkerLayout.module.css";

export default function WorkerLayout() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.shell}>
      <header className={styles.top}>
        <Logo variant="light" compact={false} />
        <p className={styles.name}>{user.name}</p>
        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Navbar />
      <PpeModal />
    </div>
  );
}
