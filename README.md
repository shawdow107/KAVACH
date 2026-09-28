# KAVACH

Site safety, attendance and task management for supervisors and workers. *Kavach* means shield — the UI is built to feel protective, high-contrast and usable with gloves on a phone.

This is a **frontend-only** React app. Data lives in mock JSON-like modules plus `localStorage`. `src/services/` already exposes async functions so a real API can replace the mocks later.

## Setup

```bash
npm create vite@latest kavach -- --template react
cd kavach
npm install
npm install react-router-dom
npm run dev
```

This repository is already the Vite app. From the project root:

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Dependencies

- `react`, `react-dom`, `vite`, `@vitejs/plugin-react` — Vite React toolchain
- `react-router-dom` — routing and protected role routes

No UI kits, no Tailwind, no chart libraries.

## Demo logins

Password for every account: **`kavach123`**

| Role        | ID     | Name          |
| ----------- | ------ | ------------- |
| Supervisor  | SUP001 | Anita Sharma  |
| Worker      | WRK001 | Ravi Kumar    |
| Worker      | WRK002 | Meena Patel   |
| Worker      | WRK003 | Arjun Singh   |

After login:

- Supervisor → `/supervisor/dashboard`
- Worker → `/worker/home` (PPE confirmation modal first)

Workers cannot open supervisor URLs and vice versa. Logout is in the top bar.

Shared mock state is stored under `localStorage` key `kavach-data-v1`. Auth is `kavach-auth`. Clear those keys to reset the demo.

## Folder structure

```
src/
  assets/
  components/     Button, Card, Modal, Navbar, Sidebar, StatusBadge,
                  ProgressRing, DataTable, FormField, BarChart, Logo, …
  context/        AuthContext, DataContext
  pages/
    Login/
    supervisor/   Dashboard, Attendance, AssignTasks, Reports
    worker/       Home, MyTask, HazardReport, HelpDesk, SubmissionReport, PpeModal
  services/       mock async API wrappers
  data/           mockData.js
  styles/         variables.css, global.css
  routes/         AppRoutes, ProtectedRoute
  App.jsx, main.jsx
```

## How data flows

- Supervisor assigns or edits a task → it appears on that worker’s **My Task**.
- Worker check-in / hazard / help / day report → supervisor **Attendance** and **Reports & hazards**.
- PPE confirmation is remembered per worker for the calendar day.

## Future improvements

- Replace `services/` mocks with a REST or GraphQL backend and JWT.
- Real photo upload to object storage instead of data URLs.
- Push / SMS for emergency help-desk tickets.
- Offline-first worker PWA with sync when the site has signal.
- Role-based admin for multiple sites and shifts.
- Audit log of attendance edits and hazard reviews.
- Automated tests (Vitest + Testing Library) and E2E (Playwright).
