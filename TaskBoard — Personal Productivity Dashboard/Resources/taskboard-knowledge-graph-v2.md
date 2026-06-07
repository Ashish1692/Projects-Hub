# 🎯 TaskBoard — Knowledge Graph (Updated)
> Last updated: June 2026 | Covers: Kanban layout, Calendar view, Reminders module, Pre-fire engine

---

## 1. 📦 Project Overview

| Key | Value |
|-----|-------|
| **Name** | TaskBoard |
| **Stack** | Vanilla JS · IndexedDB (×2) · Tailwind CDN · Google Fonts (Inter) |
| **Container** | `max-w-8xl` (88 rem / 1408 px) |
| **Files** | `index.html` (~24 KB) · `styles.css` (~27 KB) · `app.js` (~50 KB) |
| **Tabs** | 🚀 Productivity · 📊 Reports · 📅 Calendar · 🔔 Reminders |
| **Modals** | Task (add/edit) · Task Delete · Task Import · Reminder (add/edit) · Reminder Delete · Reminder Import |
| **Theme** | Dark mode default, toggle to light, persisted in localStorage |

---

## 2. 🗂️ File Dependency Map

```
┌──────────────┐       ┌─────────────┐       ┌───────────┐
│  index.html  │──────▶│  styles.css  │       │  app.js   │
│  (structure) │       │  (all styles)│       │  (logic)  │
└──────┬───────┘       └─────────────┘       └─────┬─────┘
       │                                           │
       │  loads via <script defer>                  │
       └───────────────────────────────────────────▶│
                                                    │
                 ┌──────────────────────────────────┤
                 ▼                                  ▼
       ┌─────────────────┐              ┌─────────────────────┐
       │  Tailwind CDN   │              │   Browser APIs       │
       │  Google Fonts   │              │  ├─ IndexedDB (×2)   │
       └─────────────────┘              │  ├─ localStorage     │
                                        │  ├─ Notification API │
                                        │  ├─ Web Audio API    │
                                        │  └─ DOM API          │
                                        └─────────────────────┘
```

---

## 3. 🗄️ Data Layer

### Database 1: `TaskBoardDB` v1 (Tasks)

| Store | keyPath | Indexes |
|-------|---------|---------|
| **tasks** | `taskId` | category, priority, status, dueDate, carryForward, dateAssigned |
| **settings** | `key` | — |

**Settings keys:** `lastCarryForwardDate`, `taskCounter`

**CRUD Functions:**
`initDB` · `addTask` / `updateTask` · `deleteTask` · `getTask` · `getTasksByDate` · `getAllTasks` · `clearAllTasks` · `getSetting` · `setSetting`

### Database 2: `TaskBoardRemindersDB` v1 (Reminders — Isolated)

| Store | keyPath | Indexes |
|-------|---------|---------|
| **reminders** | `reminderId` | status, reminderTime |
| **settings** | `key` | — |

**Settings keys:** `remCounter`

**CRUD Functions (Rem namespace):**
`Rem.initDB` · `Rem.addReminder` · `Rem.getReminder` · `Rem.getAllReminders` · `Rem.deleteRem` · `Rem.clearAll` · `Rem.getSetting` · `Rem.setSetting`

---

## 4. 🧩 State Management

### Global (Tasks)
| Variable | Type | Default | Purpose |
|----------|------|---------|---------|
| `db` | IDBDatabase | null | Tasks DB reference |
| `currentDate` | string | today | YYYY-MM-DD for active view |
| `activeTab` | string | "productivity" | Current tab (productivity/reports/calendar/reminders) |
| `importedData` | object | null | Temp buffer for task import flow |
| `calendarMonth` | Date | new Date() | Month displayed in calendar |
| `selectedCalDay` | string | null | Selected day in calendar |

### Rem Module (Reminders — Isolated)
| Variable | Type | Default | Purpose |
|----------|------|---------|---------|
| `Rem.db` | IDBDatabase | null | Reminders DB reference |
| `Rem.importedData` | object | null | Temp buffer for reminder import flow |
| `Rem.engineInterval` | number | null | setInterval ID for notification engine |

---

## 5. 📋 Constants

```
CATEGORIES  = [Development, Testing, Stakeholder, Meeting, Blocker, To-do]
PRIORITIES  = [Critical, High, Medium, Low]
STATUSES    = [In Progress, Pending, On Hold, Completed]
CATEGORY_COLORS = { Development→bg-blue-500, Testing→bg-teal-500, ... }
```

---

## 6. 🔧 Helper Functions

### Task Helpers
| Function | Returns | Purpose |
|----------|---------|---------|
| `todayStr()` | "YYYY-MM-DD" | Today's date string |
| `formatDate(s)` | "Monday, 06 Jun 2026" | Full formatted date |
| `formatDateShort(s)` | "Jun 06" | Short date |
| `getPreviousDay(s)` | "YYYY-MM-DD" | Previous day |
| `getNextDay(s)` | "YYYY-MM-DD" | Next day |
| `getMonthRange(s)` | {start, end} | First/last day of month |
| `toDateStr(d)` | "YYYY-MM-DD" | Date to string |
| `generateTaskId(n)` | "T-001" | Task ID from counter |
| `nowISO()` | ISO string | Current timestamp |
| `escapeHtml(s)` | string | XSS prevention |

### Badge Helpers
`getPriorityBorderClass` · `getPriorityBadgeClass` · `getStatusBadgeClass` · `getCategoryBadgeClass` · `getStatusDotClass`

### Rem Helpers
| Function | Purpose |
|----------|---------|
| `Rem.genId(n)` | "R-001" format |
| `Rem.fmtTime(iso)` | "Jun 06, 2:30 PM" format |
| `Rem.escHtml(s)` | XSS prevention |
| `Rem.nowISO()` | Current timestamp |

---

## 7. 🖥️ UI Components

```
┌─ Header (app-header, sticky top, max-w-8xl)
│  ├─ Brand (🎯 TaskBoard)
│  ├─ Theme Toggle (#btn-theme-toggle) 🌙/☀️
│  └─ Import/Export buttons (Tasks)
│
├─ Tab Bar (app-nav, 4 tabs)
│  ├─ 🚀 Productivity
│  ├─ 📊 Reports
│  ├─ 📅 Calendar
│  └─ 🔔 Reminders
│
├─ Tab 1: Productivity (#tab-productivity)
│  ├─ Date Nav: #btn-prev-day, #date-picker, #btn-today, #btn-next-day
│  ├─ Actions: #btn-new-task, #btn-carry-forward
│  ├─ Date Label: #current-date-label
│  └─ Kanban Board (.kanban-board)
│     ├─ Column: 🔥 In Progress (#cards-inprogress)
│     ├─ Column: ✅ Yesterday (#cards-completed)
│     ├─ Column: ⏸️ Pending/Hold (#cards-pending)
│     └─ Column: 📋 Upcoming (#cards-upcoming)
│
├─ Tab 2: Reports (#tab-reports)
│  ├─ #report-summary (monthly stats + status bars)
│  ├─ #report-trend (daily completed chart)
│  └─ #report-category (category distribution chart)
│
├─ Tab 3: Calendar (#tab-calendar)
│  ├─ Nav: #btn-cal-prev, #cal-month-label, #btn-cal-next
│  ├─ Legend: status dot colors
│  ├─ Grid: #calendar-grid (7-col, Monday start)
│  └─ Detail: #day-detail-panel → #day-detail-tasks
│
├─ Tab 4: Reminders (#tab-reminders)
│  ├─ #notif-banner (notification permission prompt)
│  ├─ Controls: #btn-new-reminder, Import/Export
│  ├─ Stats: #rem-stats (stat pills)
│  ├─ Active Grid: #rem-active-grid (auto-fill grid cards)
│  ├─ Overdue Accordion: #rem-overdue-accordion → rem-table
│  └─ Completed Accordion: #rem-completed-accordion → rem-table
│
├─ Modals (Tasks)
│  ├─ #task-modal (add/edit form)
│  ├─ #delete-modal (confirmation)
│  └─ #import-modal (replace/merge)
│
├─ Modals (Reminders)
│  ├─ #rem-modal (add/edit form with sound upload)
│  ├─ #rem-delete-modal (confirmation)
│  └─ #rem-import-modal (replace/merge)
│
└─ #toast-container (notifications)
```

---

## 8. 🎨 Rendering Pipeline

### Productivity Tab (Kanban)
```
renderProductivity()
  → getTasksByDate(today) + getTasksByDate(yesterday)
  → filter: inProgress, completed, pending/onHold, upcoming
  → renderCompactCard() into 4 kanban-column-body containers
  → update column counts
```

### Reports Tab
```
renderReports()
  → getAllTasks() → filter by month
  → CSS bar charts for summary, trend, category
```

### Calendar Tab
```
renderCalendar()
  → getAllTasks() → group by dateAssigned into Map
  → build 7-col grid (Mon start) with status dots
  → attach click → showDayDetail(dateStr)

showDayDetail(dateStr)
  → getTasksByDate() → renderCompactCard() in 3-col grid
  → scroll into view
```

### Reminders Tab
```
Rem.render()
  → Rem.getAllReminders()
  → separate: active/snoozed, overdue, completed
  → Active → Rem.renderCard() in auto-fill grid with urgency classes
  → Overdue → Rem.renderOverdueRow() in accordion table
  → Completed → Rem.renderCompletedRow() in accordion table
  → update stat pills & accordion counts
```

---

## 9. 🃏 Card Types

### Task Compact Card (`renderCompactCard`)
Used everywhere (all 4 Kanban columns, calendar day detail).
Shows: priority border, badges (ID, priority, status, carried), title, notes (truncated), category+date+hours, action row (status select, edit, delete).

### Task Large Card (`renderLargeCard`)
Preserved for future use. Full-width, spacious layout, same data.

### Reminder Card (`Rem.renderCard`)
Grid card with top-stripe urgency:
- `rc-firing` (red pulse) — actively in fire window with fires sent
- `rc-soon` (amber) — fire window starts within 30 min
- `rc-scheduled` (indigo) — future, not yet in window
- `rc-snoozed` (gray) — snoozed until X time

Shows: title, description, time, badges (fire count, remind-until-done, custom sound), actions (complete, snooze dropdown, edit, delete).

---

## 10. 🔔 Notification Engine (Pre-Fire)

### Timing Model
```
                    leadTime
     ◀━━━━━━━━━━━━━━━━━━━━━━━━━▶
     │                            │
   startAt                   reminderTime
 (first fire)              (deadline / overdue)

 leadTime = fireCount × fireInterval × 1000 ms
 startAt  = reminderTime − leadTime
```

### Example
```
Remind At = 3:00 PM, Fire Count = 3, Interval = 60s

  leadTime = 3 × 60 × 1000 = 180,000 ms (3 min)
  startAt  = 2:57 PM

  2:57 PM ──── 🔔 Fire 1  "⏰ In 3 min"
  2:58 PM ──── 🔔 Fire 2  "⏰ In 2 min"
  2:59 PM ──── 🔔 Fire 3  "⏰ In 1 min"
  3:00 PM ──── ⚠️ Marked overdue (if not completed)
```

### Engine Loop (`Rem.tick()` — every 10 seconds)
```
for each reminder:
  1. UNSNOOZE: if snoozed && snoozedUntil <= now → status = active
  2. PRE-FIRE CHECK: if active:
     a. Calculate startAt = reminderTime - leadTime
     b. If now >= startAt:
        - If shouldFire (firedCount < fireCount OR remindUntilDone):
          * Check interval since lastFiredAt
          * If elapsed >= fireInterval → FIRE notification + sound
          * Increment firedCount, set lastFiredAt
        - Else if all fires done && now >= reminderTime → overdue
  3. Re-render if anything changed
```

### Sound System
| Source | Method | Details |
|--------|--------|---------|
| Custom | `Rem.playSound(dataURL)` | Audio(dataURL), volume 0.7 |
| Default | `Rem.playDefaultBeep()` | Web Audio API: 440Hz sine 200ms + 880Hz sine 150ms |

### Snooze
Options: 5 min, 10 min, 15 min, 30 min, 1 hour.
Sets `status = "snoozed"`, `snoozedUntil = now + minutes`.
Engine auto-unsnoozes when `snoozedUntil <= now`.

### Remind Until Done
When enabled: `remindUntilDone = true`.
Fires indefinitely at every `fireInterval` once `startAt` is reached.
Never auto-transitions to overdue. Only manual ✅ Complete stops it.

---

## 11. ⚡ Carry Forward (Tasks)

```
Trigger: auto on page load (autoCarryForward) + manual ⚡ button
Flow:
  getPreviousDay(currentDate)
  → getTasksByDate(prevDay)
  → filter: status ∈ [In Progress, Pending, On Hold] AND carryForward=true
  → clone: new taskId, dateAssigned=today, carriedFrom=prevDay, actualHours=0
  → skip duplicates by title
  → update taskCounter + lastCarryForwardDate
Idempotent: checks lastCarryForwardDate and alreadyCarried titles
```

---

## 12. 🌙 Theme System

```
Default: dark (body.dark class)
Persistence: localStorage key "taskboard-theme" → "dark" | "light"
Toggle: #btn-theme-toggle → body.dark toggle → emoji update → save
CSS: dual selectors body:not(.dark) / body.dark for every themed element
```

---

## 13. 💾 Import / Export

### Tasks (Global)
| Action | Flow |
|--------|------|
| **Export** | `getAllTasks()` → JSON `{version, exportDate, tasks}` → download `.json` |
| **Import** | File → parse → import-modal → Replace (`clearAllTasks` + insert) or Merge (skip by taskId) → recalc taskCounter |

### Reminders (Isolated — Rem namespace)
| Action | Flow |
|--------|------|
| **Export** | `Rem.getAllReminders()` → JSON `{version, type:"reminders", exportDate, reminders}` → download `.json` |
| **Import** | File → parse → rem-import-modal → Replace (`Rem.clearAll` + insert) or Merge (skip by reminderId) → recalc remCounter |

---

## 14. 🔀 Event Flow

### init() Sequence
```
initTheme()
→ initDB()                     ← TaskBoardDB
→ Rem.initDB()                 ← TaskBoardRemindersDB
→ generateSampleData()
→ autoCarryForward()
→ renderProductivity()
→ Rem.checkNotifPerm()
→ Rem.startEngine()            ← starts 10s interval
→ attach ALL event listeners:
   ├─ Theme toggle
   ├─ Tab buttons
   ├─ Date nav (prev/next/today/picker)
   ├─ Task modal (new/save/cancel/close)
   ├─ Delete modal
   ├─ Carry forward button
   ├─ Task import/export
   ├─ Card event delegation (×5 containers)
   ├─ Calendar nav + close
   ├─ Reminder modal (new/save/cancel/close)
   ├─ Reminder delete modal
   ├─ Reminder import/export
   ├─ Sound file upload handler
   ├─ Keyboard (Escape closes all modals)
   └─ Backdrop clicks (closes any modal)
```

### Key Interaction Flows

| User Action | → Handler | → DB Op | → UI Update |
|-------------|-----------|---------|-------------|
| Add Task | `saveTask()` | `addTask()` | `refreshActiveView()` |
| Edit Task | `openTaskModal(id)` → `saveTask()` | `updateTask()` | `refreshActiveView()` |
| Delete Task | `openDeleteModal(id)` → `confirmDelete()` | `deleteTask()` | `refreshActiveView()` |
| Quick Status | `.status-select` change | `updateTask()` | `refreshActiveView()` |
| Carry Forward | `carryForward()` | clone `addTask()` ×N | `renderProductivity()` |
| Switch Tab | `switchTab(tab)` | — | render active tab |
| Create Reminder | `Rem.openModal()` → `Rem.saveReminder()` | `Rem.addReminder()` | `Rem.render()` |
| Complete Reminder | `Rem.completeReminder(id)` | `Rem.addReminder()` | `Rem.render()` |
| Snooze Reminder | `Rem.snoozeReminder(id, min)` | `Rem.addReminder()` | `Rem.render()` |
| Delete Reminder | `Rem.openDeleteModal()` → `Rem.confirmDelete()` | `Rem.deleteRem()` | `Rem.render()` |
| Pre-Fire Tick | `Rem.tick()` (auto 10s) | `Rem.addReminder()` | `Rem.render()` + Notification + Sound |

---

## 15. 🎨 CSS Architecture

### Style Categories
| Category | Selectors |
|----------|-----------|
| Base/Reset | `*`, `body`, scrollbar, `:focus-visible` |
| Header/Nav | `.app-header`, `.app-nav`, `.theme-toggle` |
| Tabs | `.tab-btn`, `.tab-btn::after`, `.tab-btn.active` |
| Task Cards | `.task-card`, `.compact-card`, `.border-priority-*` |
| Kanban | `.kanban-board`, `.kanban-column`, `.kanban-column-header/body/title/count` |
| Calendar | `.calendar-grid/cell/dots/dot/nav/legend`, `.day-detail-*` |
| Reminders | `.reminder-card`, `.rc-*`, `.rud-badge`, `.fire-badge`, `.sound-badge`, `.snooze-select` |
| Accordions | `.accordion`, `.accordion-header/body/title/arrow` |
| Reminder Table | `.rem-table`, `.td-title`, `.td-time`, `.rem-action-btn` |
| Modals | `.modal-backdrop`, `.modal-content`, `.modal-divider` |
| Badges | `.badge-critical/high/medium/low`, `.badge-completed/inprogress/pending/onhold`, `.badge-{category}` |
| Charts | `.chart-bar`, `.chart-track` |
| Toasts | `#toast-container`, `.toast.success/.error/.info` |
| Forms | dark mode inputs, `.inline-select`, `.sound-upload-area` |
| Buttons | `.btn-carry`, `.icon-btn`, `.icon-btn.danger`, `.btn-cancel`, `.nav-btn`, `.nav-btn-today` |
| Helpers | `.line-clamp-2`, `.empty-state`, `.carry-badge` |
| Animations | `@keyframes slideIn` (toasts), `@keyframes firePulse` (reminder cards) |
| Stats | `.rem-stats`, `.rem-stat-pill` |
| Responsive | `@media (max-width: 768px)` compact-grid→1col, calendar→compact, reminder-grid→1col |
| | `@media (max-width: 1024px)` kanban→column |
| Print | `@media print` hide .no-print, clean cards |

### Theme Pattern
Every themed element uses dual selectors:
```css
body:not(.dark) .element { /* light */ }
body.dark .element       { /* dark */ }
```

### Color Palette
| Token | Light | Dark |
|-------|-------|------|
| Body bg | #f8fafc | #0f172a |
| Card bg | #fff | #1e293b |
| Border | #e5e7eb | #334155 |
| Text primary | #1e293b | #f1f5f9 |
| Text secondary | #64748b | #94a3b8 |
| Accent | #6366f1 | #818cf8 |

---

## 16. 📝 Task Schema

| Field | Type | Index | Description | Example |
|-------|------|-------|-------------|---------|
| `taskId` | string | PK | Auto "T-001" | "T-001" |
| `title` | string | — | Task title | "Configure PagerDuty" |
| `category` | string | ✅ | One of CATEGORIES | "Development" |
| `priority` | string | ✅ | Critical/High/Medium/Low | "High" |
| `status` | string | ✅ | In Progress/Pending/On Hold/Completed | "In Progress" |
| `assignedTo` | string | — | Person name | "Ashish Moghe" |
| `dueDate` | string | ✅ | "YYYY-MM-DD" | "2026-06-06" |
| `estimatedHours` | number | — | Estimate | 4 |
| `actualHours` | number | — | Actual time spent | 2 |
| `notes` | string | — | Free text | "Waiting for API keys" |
| `carriedFrom` | string | — | Date carried from | "2026-06-05" |
| `carryForward` | boolean | ✅ | Auto-carry flag | true |
| `dateAssigned` | string | ✅ | Work date | "2026-06-06" |
| `createdAt` | string | — | ISO timestamp | "2026-06-06T10:30:00Z" |
| `updatedAt` | string | — | ISO timestamp | "2026-06-06T11:15:00Z" |

---

## 17. 🔔 Reminder Schema

| Field | Type | Index | Description | Example |
|-------|------|-------|-------------|---------|
| `reminderId` | string | PK | Auto "R-001" | "R-001" |
| `title` | string | — | Reminder title | "Call client" |
| `description` | string | — | Details | "Discuss scope changes" |
| `reminderTime` | string | ✅ | ISO datetime (deadline) | "2026-06-06T15:00:00Z" |
| `fireCount` | number | — | Times to fire (1-20) | 3 |
| `fireInterval` | number | — | Seconds between fires (10-300) | 60 |
| `firedCount` | number | — | Fires already sent | 2 |
| `lastFiredAt` | string | — | ISO of last fire | "2026-06-06T14:58:00Z" |
| `remindUntilDone` | boolean | — | Keep firing forever | false |
| `soundUrl` | string | — | Custom audio data URL | "data:audio/mp3;base64,..." |
| `soundName` | string | — | File name display | "alarm.mp3" |
| `status` | string | ✅ | active/completed/overdue/snoozed | "active" |
| `snoozedUntil` | string | — | ISO datetime | "2026-06-06T15:10:00Z" |
| `completedAt` | string | — | ISO datetime | null |
| `createdAt` | string | — | ISO timestamp | "2026-06-06T10:00:00Z" |
| `updatedAt` | string | — | ISO timestamp | "2026-06-06T14:58:00Z" |

---

## 18. 🌳 Function Call Graph

```
init()
├─ initTheme()
├─ initDB()                          ← TaskBoardDB
├─ Rem.initDB()                      ← TaskBoardRemindersDB
├─ generateSampleData()
│  └─ getAllTasks() → addTask() ×6 → setSetting()
├─ autoCarryForward()
│  └─ getSetting() → carryForward()
│     └─ getPreviousDay() → getTasksByDate() ×2
│        → generateTaskId() → addTask() ×N
│        → setSetting() ×2 → renderProductivity()
├─ renderProductivity()
│  └─ getTasksByDate() ×2 → renderCompactCard() ×N → emptyState()
├─ Rem.checkNotifPerm()
├─ Rem.startEngine()
│  └─ setInterval(Rem.tick, 10000)
│     └─ Rem.tick()
│        └─ Rem.getAllReminders()
│           → Rem.addReminder() (unsnooze/fire/overdue)
│           → Rem.fireNotification() → Notification API
│           → Rem.playSound() / Rem.playDefaultBeep() → Web Audio API
│           → Rem.render() (if changed)
└─ attach listeners → event handlers:
   ├─ switchTab()
   │  ├─ "productivity" → renderProductivity()
   │  ├─ "reports" → renderReports()
   │  │  └─ getAllTasks() → filter → CSS bar charts
   │  ├─ "calendar" → renderCalendar()
   │  │  └─ getAllTasks() → group → grid → showDayDetail()
   │  └─ "reminders" → Rem.render()
   │     └─ Rem.getAllReminders() → renderCard() / renderOverdueRow() / renderCompletedRow()
   ├─ saveTask() → getTask() → addTask()/updateTask() → refreshActiveView()
   ├─ confirmDelete() → deleteTask() → refreshActiveView()
   ├─ quickStatusChange() → getTask() → updateTask() → refreshActiveView()
   ├─ exportData() → getAllTasks() → JSON download
   ├─ importReplace/Merge() → clearAllTasks() → addTask() ×N → refreshActiveView()
   ├─ Rem.saveReminder() → Rem.getReminder() → Rem.addReminder() → Rem.render()
   ├─ Rem.completeReminder() → Rem.getReminder() → Rem.addReminder() → Rem.render()
   ├─ Rem.snoozeReminder() → Rem.getReminder() → Rem.addReminder() → Rem.render()
   ├─ Rem.confirmDelete() → Rem.deleteRem() → Rem.render()
   ├─ Rem.exportData() → Rem.getAllReminders() → JSON download
   └─ Rem.importReplace/Merge() → Rem.clearAll() → Rem.addReminder() ×N → Rem.render()
```

---

## 19. 🏛️ Architecture Isolation

```
┌─────────────────────────────────────────────────────────────────┐
│                        app.js                                    │
│                                                                  │
│  ┌──────────────────────────┐   ┌──────────────────────────┐   │
│  │   TASK MODULE (Global)    │   │   REMINDER MODULE (Rem)   │   │
│  │                           │   │                           │   │
│  │  DB: TaskBoardDB          │   │  DB: TaskBoardRemindersDB │   │
│  │  CRUD: addTask, getTask.. │   │  CRUD: addReminder, ...   │   │
│  │  UI: Kanban, Calendar,    │   │  UI: Grid cards, Accordion│   │
│  │      Reports, Modals      │   │      Tables, Modals       │   │
│  │  Logic: CarryForward,     │   │  Logic: PreFire engine,   │   │
│  │    Import/Export           │   │    Sound, Snooze,         │   │
│  │                           │   │    Import/Export           │   │
│  └──────────────────────────┘   └──────────────────────────┘   │
│                                                                  │
│  SHARED: showToast(), todayStr(), switchTab(), init()            │
│  SHARED: Theme system, Escape/backdrop modal handling            │
└─────────────────────────────────────────────────────────────────┘
```

---

*Generated from TaskBoard codebase • June 2026*
