/** Seed data for KAVACH. Later this can be replaced by API responses. */

export const DEMO_PASSWORD = "kavach123";

export const users = [
  {
    id: "SUP001",
    username: "SUP001",
    password: DEMO_PASSWORD,
    role: "supervisor",
    name: "Anita Sharma",
    site: "North Tower — Block B",
  },
  {
    id: "WRK001",
    username: "WRK001",
    password: DEMO_PASSWORD,
    role: "worker",
    name: "Ravi Kumar",
    trade: "Wiring",
  },
  {
    id: "WRK002",
    username: "WRK002",
    password: DEMO_PASSWORD,
    role: "worker",
    name: "Meena Patel",
    trade: "Plumbing",
  },
  {
    id: "WRK003",
    username: "WRK003",
    password: DEMO_PASSWORD,
    role: "worker",
    name: "Arjun Singh",
    trade: "Masonry",
  },
];

export const workers = [
  { id: "WRK001", name: "Ravi Kumar", trade: "Wiring" },
  { id: "WRK002", name: "Meena Patel", trade: "Plumbing" },
  { id: "WRK003", name: "Arjun Singh", trade: "Masonry" },
];

export const workTypes = [
  "Wiring",
  "Plumbing",
  "Masonry",
  "Carpentry",
  "Painting",
  "Scaffolding",
];

export const ppeCatalog = [
  { id: "helmet", label: "Safety helmet" },
  { id: "vest", label: "Reflective vest" },
  { id: "boots", label: "Safety boots" },
  { id: "gloves", label: "Work gloves" },
  { id: "goggles", label: "Safety goggles" },
  { id: "harness", label: "Fall-arrest harness" },
  { id: "ear", label: "Ear protection" },
];

export const hazardTypes = [
  "Fall hazard",
  "Electrical",
  "Fire / hot work",
  "Chemical / spill",
  "Unstable structure",
  "Missing PPE",
  "Other",
];

export const helpCategories = [
  "Injury",
  "Equipment problem",
  "Material shortage",
  "Need supervisor",
  "Other",
];

/** ISO date helper (local calendar day). */
export function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysAgoISO(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const today = todayISO();
const d1 = daysAgoISO(1);
const d2 = daysAgoISO(2);
const d3 = daysAgoISO(3);

export const initialAttendance = [
  { id: "att-t-1", workerId: "WRK001", date: today, checkIn: "08:02", checkOut: "", status: "Present", hours: 0 },
  { id: "att-t-2", workerId: "WRK002", date: today, checkIn: "08:21", checkOut: "", status: "Late", hours: 0 },
  { id: "att-t-3", workerId: "WRK003", date: today, checkIn: "", checkOut: "", status: "Absent", hours: 0 },
  { id: "att-1-1", workerId: "WRK001", date: d1, checkIn: "07:58", checkOut: "17:05", status: "Present", hours: 9.1 },
  { id: "att-1-2", workerId: "WRK002", date: d1, checkIn: "08:00", checkOut: "17:00", status: "Present", hours: 9 },
  { id: "att-1-3", workerId: "WRK003", date: d1, checkIn: "08:40", checkOut: "17:10", status: "Late", hours: 8.5 },
  { id: "att-2-1", workerId: "WRK001", date: d2, checkIn: "08:05", checkOut: "17:00", status: "Present", hours: 8.9 },
  { id: "att-2-2", workerId: "WRK002", date: d2, checkIn: "", checkOut: "", status: "Absent", hours: 0 },
  { id: "att-2-3", workerId: "WRK003", date: d2, checkIn: "07:55", checkOut: "16:50", status: "Present", hours: 8.9 },
  { id: "att-3-1", workerId: "WRK001", date: d3, checkIn: "08:00", checkOut: "17:02", status: "Present", hours: 9 },
  { id: "att-3-2", workerId: "WRK002", date: d3, checkIn: "08:10", checkOut: "17:05", status: "Present", hours: 8.9 },
  { id: "att-3-3", workerId: "WRK003", date: d3, checkIn: "08:00", checkOut: "17:00", status: "Present", hours: 9 },
];

export const initialTasks = [
  {
    id: "task-1",
    title: "First floor lighting circuits",
    description: "Pull and terminate lighting circuits on the first floor east wing.",
    location: "First Floor",
    workType: "Wiring",
    workerIds: ["WRK001"],
    priority: "High",
    materials: ["2.5mm cable", "Junction boxes", "MCB 16A"],
    safetyGear: ["helmet", "vest", "boots", "gloves", "goggles"],
    deadline: today,
    status: "In Progress",
  },
  {
    id: "task-2",
    title: "Basement wet-stack connections",
    description: "Connect wet-stack pipes and pressure-test joints before slab pour.",
    location: "Basement",
    workType: "Plumbing",
    workerIds: ["WRK002"],
    priority: "Medium",
    materials: ["PVC 110mm", "Solvent cement", "Gaskets"],
    safetyGear: ["helmet", "vest", "boots", "gloves", "goggles"],
    deadline: today,
    status: "In Progress",
  },
  {
    id: "task-3",
    title: "Second floor blockwork",
    description: "Raise inner block wall on grid C–D, leave openings as per drawing.",
    location: "Second Floor",
    workType: "Masonry",
    workerIds: ["WRK003"],
    priority: "Medium",
    materials: [],
    safetyGear: ["helmet", "vest", "boots", "gloves"],
    deadline: today,
    status: "Assigned",
  },
  {
    id: "task-4",
    title: "Ground floor panel labelling",
    description: "Label distribution boards and update as-built markups.",
    location: "Ground Floor",
    workType: "Wiring",
    workerIds: ["WRK001"],
    priority: "Low",
    materials: ["Label tape"],
    safetyGear: ["helmet", "vest", "boots"],
    deadline: d1,
    status: "Completed",
  },
];

export const dailyPlan = {
  date: today,
  completed: [
    "Ground floor panel labelling (Ravi)",
    "Material delivery checked at gate",
  ],
  planned: [
    "First floor lighting circuits — east wing",
    "Basement wet-stack connections",
    "Second floor blockwork grid C–D",
  ],
};

export const initialHazards = [
  {
    id: "haz-1",
    workerId: "WRK002",
    type: "Fall hazard",
    severity: "High",
    location: "Basement stair void",
    description: "Unprotected opening at stair void. No guardrail on north side.",
    photoName: "",
    photoData: "",
    status: "Open",
    createdAt: `${today}T07:40:00`,
  },
  {
    id: "haz-2",
    workerId: "WRK001",
    type: "Electrical",
    severity: "Medium",
    location: "First Floor — east wing",
    description: "Temporary board cover missing. Live terminals exposed.",
    photoName: "",
    photoData: "",
    status: "Reviewed",
    createdAt: `${d1}T14:12:00`,
  },
];

export const initialTickets = [
  {
    id: "tkt-1",
    workerId: "WRK003",
    category: "Material shortage",
    message: "Block mortar mix is short for grid C. Need two more bags today.",
    urgent: false,
    status: "Open",
    createdAt: `${today}T08:30:00`,
  },
  {
    id: "tkt-2",
    workerId: "WRK001",
    category: "Equipment problem",
    message: "Cable puller jammed. Need a spare or mechanic.",
    urgent: false,
    status: "Resolved",
    createdAt: `${d1}T11:05:00`,
  },
];

export const initialSubmissions = [
  {
    id: "sub-1",
    workerId: "WRK001",
    date: d1,
    workCompleted: "Finished panel labelling on ground floor.",
    percent: 100,
    issues: "None",
    materialsUsed: "Label tape",
    remarks: "Ready for inspection.",
  },
];
