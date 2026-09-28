import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  dailyPlan,
  initialAttendance,
  initialHazards,
  initialSubmissions,
  initialTasks,
  initialTickets,
  todayISO,
  workers,
} from "../data/mockData";
import { checkInRequest, checkOutRequest } from "../services/attendanceService";
import {
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "../services/taskService";
import {
  createHazardRequest,
  createSubmissionRequest,
  reviewHazardRequest,
} from "../services/reportService";
import { createTicketRequest, resolveTicketRequest } from "../services/helpDeskService";

const DATA_KEY = "kavach-data-v1";

const DataContext = createContext(null);

function loadState() {
  const seed = {
    attendance: initialAttendance,
    tasks: initialTasks,
    hazards: initialHazards,
    tickets: initialTickets,
    submissions: initialSubmissions,
    ppeAcks: {},
  };
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) return seed;
    return { ...seed, ...JSON.parse(raw) };
  } catch {
    return seed;
  }
}

function hoursBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const [ih, im] = checkIn.split(":").map(Number);
  const [oh, om] = checkOut.split(":").map(Number);
  const mins = oh * 60 + om - (ih * 60 + im);
  return Math.max(0, Math.round((mins / 60) * 10) / 10);
}

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function persistPatch(setState, updater) {
  setState((prev) => {
    const next = updater(prev);
    localStorage.setItem(DATA_KEY, JSON.stringify(next));
    return next;
  });
}

export function DataProvider({ children }) {
  const [state, setState] = useState(loadState);

  const workerName = useCallback((id) => workers.find((w) => w.id === id)?.name || id, []);

  const checkIn = useCallback(async (workerId) => {
    const date = todayISO();
    const time = nowTime();
    const late = time > "08:10";
    await checkInRequest({ workerId, date, time });
    persistPatch(setState, (prev) => {
      const existing = prev.attendance.find((a) => a.workerId === workerId && a.date === date);
      const row = {
        id: existing?.id || uid("att"),
        workerId,
        date,
        checkIn: time,
        checkOut: "",
        status: late ? "Late" : "Present",
        hours: 0,
      };
      return {
        ...prev,
        attendance: existing
          ? prev.attendance.map((a) => (a.id === existing.id ? row : a))
          : [...prev.attendance, row],
      };
    });
  }, []);

  const checkOut = useCallback(async (workerId) => {
    const date = todayISO();
    const time = nowTime();
    await checkOutRequest({ workerId, date, time });
    persistPatch(setState, (prev) => ({
      ...prev,
      attendance: prev.attendance.map((a) =>
        a.workerId === workerId && a.date === date && a.checkIn
          ? { ...a, checkOut: time, hours: hoursBetween(a.checkIn, time) }
          : a
      ),
    }));
  }, []);

  const saveTask = useCallback(async (task) => {
    const payload = { ...task, id: task.id || uid("task") };
    if (task.id) await updateTaskRequest(payload);
    else await createTaskRequest(payload);
    persistPatch(setState, (prev) => {
      const exists = prev.tasks.some((t) => t.id === payload.id);
      return {
        ...prev,
        tasks: exists ? prev.tasks.map((t) => (t.id === payload.id ? payload : t)) : [payload, ...prev.tasks],
      };
    });
  }, []);

  const removeTask = useCallback(async (id) => {
    await deleteTaskRequest(id);
    persistPatch(setState, (prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) }));
  }, []);

  const setTaskStatus = useCallback(async (id, status) => {
    await updateTaskRequest({ id, status });
    persistPatch(setState, (prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
  }, []);

  const addHazard = useCallback(async (item) => {
    const payload = { ...item, id: uid("haz"), status: "Open", createdAt: new Date().toISOString() };
    await createHazardRequest(payload);
    persistPatch(setState, (prev) => ({ ...prev, hazards: [payload, ...prev.hazards] }));
  }, []);

  const reviewHazard = useCallback(async (id) => {
    await reviewHazardRequest(id);
    persistPatch(setState, (prev) => ({
      ...prev,
      hazards: prev.hazards.map((h) => (h.id === id ? { ...h, status: "Reviewed" } : h)),
    }));
  }, []);

  const addTicket = useCallback(async (item) => {
    const payload = { ...item, id: uid("tkt"), status: "Open", createdAt: new Date().toISOString() };
    await createTicketRequest(payload);
    persistPatch(setState, (prev) => ({ ...prev, tickets: [payload, ...prev.tickets] }));
  }, []);

  const resolveTicket = useCallback(async (id) => {
    await resolveTicketRequest(id);
    persistPatch(setState, (prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t)),
    }));
  }, []);

  const addSubmission = useCallback(async (item) => {
    const payload = { ...item, id: uid("sub"), date: item.date || todayISO() };
    await createSubmissionRequest(payload);
    persistPatch(setState, (prev) => ({ ...prev, submissions: [payload, ...prev.submissions] }));
  }, []);

  const ackPpe = useCallback((workerId) => {
    const key = `${workerId}:${todayISO()}`;
    persistPatch(setState, (prev) => ({ ...prev, ppeAcks: { ...prev.ppeAcks, [key]: true } }));
  }, []);

  const hasPpeAck = useCallback(
    (workerId) => Boolean(state.ppeAcks[`${workerId}:${todayISO()}`]),
    [state.ppeAcks]
  );

  const value = useMemo(
    () => ({
      ...state,
      workers,
      dailyPlan,
      workerName,
      checkIn,
      checkOut,
      saveTask,
      removeTask,
      setTaskStatus,
      addHazard,
      reviewHazard,
      addTicket,
      resolveTicket,
      addSubmission,
      ackPpe,
      hasPpeAck,
    }),
    [
      state,
      workerName,
      checkIn,
      checkOut,
      saveTask,
      removeTask,
      setTaskStatus,
      addHazard,
      reviewHazard,
      addTicket,
      resolveTicket,
      addSubmission,
      ackPpe,
      hasPpeAck,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
