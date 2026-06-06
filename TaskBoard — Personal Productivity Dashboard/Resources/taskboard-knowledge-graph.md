# 🎯 TaskBoard — Knowledge Graph

> Complete architectural map of the TaskBoard codebase.
> Generated: June 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Dependency Map](#2-file-dependency-map)
3. [Data Layer (IndexedDB)](#3-data-layer-indexeddb)
4. [State Management](#4-state-management)
5. [Constants](#5-constants)
6. [Helper Functions](#6-helper-functions)
7. [UI Components](#7-ui-components-indexhtml)
8. [Rendering Pipeline](#8-rendering-pipeline)
9. [Card Types](#9-card-types)
10. [Automation: Carry Forward](#10-automation-carry-forward)
11. [Theme System](#11-theme-system)
12. [Import / Export](#12-import--export)
13. [Event Flow](#13-event-flow)
14. [CSS Architecture](#14-css-architecture-stylescss)
15. [Task Data Schema](#15-task-data-schema)
16. [Function Call Graph](#16-function-call-graph)

---

## 1. Project Overview

| Key | Detail |
|---|---|
| **Name** | TaskBoard — Personal Productivity Dashboard |
| **Stack** | Vanilla JS · IndexedDB · Tailwind CSS (CDN) |
| **Files** | `index.html` · `styles.css` · `app.js` |
| **Theme** | Dark mode (default), light mode toggle |
| **Data** | 100% local — IndexedDB + localStorage |
| **Portability** | Import/Export as `.json` |

---

## 2. File Dependency Map

```
┌─────────────────────────────────────────────────────────────┐
│                       index.html                            │
│                                                             │
│  ┌─────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ Tailwind CDN │    │ Google Fonts │    │  styles.css   │  │
│  │   (remote)   │    │   (Inter)    │    │  (local CSS)  │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬────────┘  │
│         │                   │                   │           │
│         └───────────────────┼───────────────────┘           │
│                             │                               │
│                    ┌────────▼────────┐                      │
│                    │     app.js      │                      │
│                    │   (defer load)  │                      │
│                    └────────┬────────┘                      │
│                             │                               │
│              ┌──────────────┼──────────────┐                │
│              │              │              │                │
│        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼──────┐         │
│        │ IndexedDB  │ │localStorage│ │  DOM API   │         │
│        │ (Browser)  │ │ (Browser) │ │ (Browser)  │         │
│        └───────────┘ └───────────┘ └────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

| File | Size | Role |
|---|---|---|
| `index.html` | ~18 KB | Structure — header, tabs, sections, modals, toast container |
| `styles.css` | ~20 KB | Theming — dual dark/light styles, animations, calendar, responsive |
| `app.js` | ~43 KB | Logic — IndexedDB CRUD, rendering, automation, events |

---

## 3. Data Layer (IndexedDB)

### Database: `TaskBoardDB` (version 1)

#### Object Store: `tasks`

| Field | Type | Indexed | Description |
|---|---|---|---|
| `taskId` | string | ✅ keyPath | Unique ID: `T-001`, `T-002`… |
| `title` | string | ❌ | Task description |
| `category` | string | ✅ | Development, Testing, Stakeholder, Meeting, Blocker, To-do |
| `priority` | string | ✅ | Critical, High, Medium, Low |
| `status` | string | ✅ | Completed, In Progress, Pending, On Hold |
| `assignedTo` | string | ❌ | Default: "Ashish Moghe" |
| `dueDate` | string | ✅ | ISO date (YYYY-MM-DD) |
| `estimatedHours` | number | ❌ | Planned effort |
| `actualHours` | number | ❌ | Real effort |
| `notes` | string | ❌ | Context, blockers, dependencies |
| `carriedFrom` | string | ❌ | Origin date if carried forward |
| `carryForward` | boolean | ✅ | Marks for next-day carry |
| `dateAssigned` | string | ✅ | The "sheet date" (virtual sheet) |
| `createdAt` | string | ❌ | ISO timestamp |
| `updatedAt` | string | ❌ | ISO timestamp |

#### Object Store: `settings`

| Key | Value Type | Purpose |
|---|---|---|
| `lastCarryForwardDate` | string | Prevents duplicate carry-forward |
| `taskCounter` | number | Auto-increment for Task IDs |

### CRUD Functions

| Function | Store | Mode | Returns |
|---|---|---|---|
| `initDB()` | — | — | `Promise<IDBDatabase>` |
| `addTask(task)` | tasks | readwrite | `Promise<string>` |
| `updateTask(task)` | tasks | readwrite | `Promise<string>` (alias of addTask) |
| `deleteTask(taskId)` | tasks | readwrite | `Promise<void>` |
| `getTask(taskId)` | tasks | readonly | `Promise<object>` |
| `getTasksByDate(dateStr)` | tasks | readonly | `Promise<array>` (via dateAssigned index) |
| `getAllTasks()` | tasks | readonly | `Promise<array>` |
| `clearAllTasks()` | tasks | readwrite | `Promise<void>` |
| `getSetting(key)` | settings | readonly | `Promise<any>` |
| `setSetting(key, value)` | settings | readwrite | `Promise<void>` |

---

## 4. State Management

| Variable | Type | Default | Purpose |
|---|---|---|---|
| `db` | IDBDatabase \| null | `null` | Active database connection |
| `currentDate` | string | `todayStr()` | Currently viewed date (Productivity tab) |
| `activeTab` | string | `"productivity"` | Which tab is displayed |
| `importedData` | object \| null | `null` | Temporarily holds parsed import data |
| `calendarMonth` | Date | `new Date()` | Which month the calendar displays |
| `selectedCalDay` | string \| null | `null` | Currently selected calendar day |

---

## 5. Constants

```javascript
DB_NAME    = "TaskBoardDB"
DB_VERSION = 1

CATEGORIES = ["Development", "Testing", "Stakeholder", "Meeting", "Blocker", "To-do"]
PRIORITIES = ["Critical", "High", "Medium", "Low"]
STATUSES   = ["In Progress", "Pending", "On Hold", "Completed"]

CATEGORY_COLORS = {
  Development: "bg-blue-500",
  Testing:     "bg-teal-500",
  Stakeholder: "bg-purple-500",
  Meeting:     "bg-indigo-500",
  Blocker:     "bg-red-500",
  "To-do":     "bg-amber-500"
}
```

---

## 6. Helper Functions

### Date Helpers

| Function | Input | Output | Example |
|---|---|---|---|
| `todayStr()` | — | `"YYYY-MM-DD"` | `"2026-06-06"` |
| `formatDate(dateStr)` | `"2026-06-06"` | `"Saturday, 06 Jun 2026"` | Long display format |
| `formatDateShort(dateStr)` | `"2026-06-06"` | `"Jun 06"` | Compact display |
| `getPreviousDay(dateStr)` | `"2026-06-06"` | `"2026-06-05"` | Previous calendar day |
| `getNextDay(dateStr)` | `"2026-06-06"` | `"2026-06-07"` | Next calendar day |
| `getMonthRange(dateStr)` | `"2026-06-06"` | `{start, end}` | First and last of month |
| `toDateStr(d)` | `Date` object | `"YYYY-MM-DD"` | Date → string |
| `nowISO()` | — | ISO string | Current timestamp |
| `generateTaskId(n)` | `6` | `"T-006"` | Zero-padded ID |

### Badge Class Helpers

| Function | Input | Output |
|---|---|---|
| `getPriorityBorderClass(p)` | `"Critical"` | `"border-priority-critical"` |
| `getPriorityBadgeClass(p)` | `"High"` | `"badge-high"` |
| `getStatusBadgeClass(s)` | `"In Progress"` | `"badge-inprogress"` |
| `getCategoryBadgeClass(c)` | `"Development"` | `"badge-development"` |
| `getStatusDotClass(s)` | `"Completed"` | `"dot-completed"` |

### Utility

| Function | Purpose |
|---|---|
| `escapeHtml(str)` | Sanitizes HTML characters |
| `statusOptions(current)` | Generates `<option>` tags for status dropdown |
| `emptyState(msg)` | Returns empty-state placeholder HTML |
| `dbTx(storeName, mode)` | Creates IndexedDB transaction + returns object store |

---

## 7. UI Components (index.html)

### Component Tree

```
body.dark
├── #toast-container                    (fixed top-right)
├── header.app-header                   (sticky)
│   ├── Brand: "🎯 TaskBoard"
│   ├── #btn-theme-toggle               (🌙/☀️)
│   ├── #btn-import + #import-file-input (hidden)
│   └── #btn-export
├── nav.app-nav                         (tab bar)
│   ├── .tab-btn[data-tab="productivity"]  🚀 Productivity
│   ├── .tab-btn[data-tab="reports"]       📊 Reports
│   └── .tab-btn[data-tab="calendar"]      📅 Calendar
├── main
│   ├── #tab-productivity
│   │   ├── Date Nav: #btn-prev-day, #date-picker, #btn-today, #btn-next-day
│   │   ├── Actions: #btn-new-task, #btn-carry-forward
│   │   ├── #current-date-label
│   │   ├── #section-inprogress → #cards-inprogress    (compact-grid)
│   │   ├── #section-completed  → #cards-completed     (compact-grid)
│   │   ├── #section-pending    → #cards-pending        (compact-grid)
│   │   └── #section-upcoming   → #cards-upcoming       (compact-grid)
│   ├── #tab-reports (hidden)
│   │   ├── #report-summary     (monthly stats + bars)
│   │   ├── #report-trend       (daily completed bars)
│   │   └── #report-category    (category bars)
│   └── #tab-calendar (hidden)
│       ├── Calendar Nav: #btn-cal-prev, #cal-month-label, #btn-cal-next
│       ├── Legend (dot colors)
│       ├── #calendar-grid      (7-col CSS grid)
│       └── #day-detail-panel
│           ├── #day-detail-title
│           ├── #day-detail-close
│           └── #day-detail-tasks
├── #task-modal                         (modal-backdrop)
│   └── .modal-content
│       ├── Header: #modal-title, #modal-close
│       ├── #task-form
│       │   ├── #form-taskId (hidden)
│       │   ├── #form-title
│       │   ├── #form-category, #form-priority
│       │   ├── #form-status, #form-assignedTo
│       │   ├── #form-dueDate, #form-estimatedHours, #form-actualHours
│       │   ├── #form-notes
│       │   └── #form-carryForward (toggle)
│       └── Footer: #btn-cancel-task, #btn-save-task
├── #delete-modal
│   └── #delete-taskId, #btn-cancel-delete, #btn-confirm-delete
└── #import-modal
    └── #btn-import-replace, #btn-import-merge, #btn-cancel-import
```

---

## 8. Rendering Pipeline

### Productivity Tab

```
renderProductivity()
│
├── getTasksByDate(currentDate) ──────────▶ todayTasks
├── getTasksByDate(previousDay) ──────────▶ yesterdayTasks
│
├── Filter: todayTasks.status === "In Progress"    → inProgress
├── Filter: yesterdayTasks.status === "Completed"   → completed
├── Filter: todayTasks.status ∈ {Pending, On Hold} → pending
├── Filter: todayTasks + dueDate > today            → upcoming
│
├── inProgress.map(renderCompactCard)  → #cards-inprogress
├── completed.map(renderCompactCard)   → #cards-completed
├── pending.map(renderCompactCard)     → #cards-pending
├── upcoming.map(renderCompactCard)    → #cards-upcoming
│
└── Update: #current-date-label, #date-picker, count spans
```

### Reports Tab

```
renderReports()
│
├── getAllTasks() → filter by current month
│
├── Monthly Summary → count by status → CSS percentage bars
├── Daily Trend → group completed by dateAssigned → horizontal bars
└── By Category → count by category → colored horizontal bars
```

### Calendar Tab

```
renderCalendar()
│
├── getAllTasks() → group by dateAssigned into Map
│
├── Build 7-column grid:
│   ├── Header: Mon Tue Wed Thu Fri Sat Sun
│   └── Cells: prev-month padding + current month + next-month padding
│       ├── .calendar-day-number (today = indigo circle)
│       ├── .calendar-dots (status-colored, max 6)
│       └── .calendar-task-count (mobile fallback)
│
├── Attach click handlers → showDayDetail(dateStr)
│
showDayDetail(dateStr)
├── getTasksByDate(dateStr)
├── Render compact cards in 3-col grid
├── Display #day-detail-panel
└── Scroll into view
```

---

## 9. Card Types

### Compact Card (`renderCompactCard`)
*Used for all sections*

```
┌─────────────────────────────────────┐
│ T-001  [HIGH]  [IN PROGRESS]       │  ← ID + badges
│ 🔄 Jun 05                           │  ← carried badge (if any)
│                                     │
│ PagerDuty Integration - Configure   │  ← title (line-clamp-2)
│ webhooks                            │
│                                     │
│ Waiting for API keys from Paul      │  ← notes (italic, line-clamp-2)
│                                     │
│ [Development]  📅 Jun 06  ⏱ 4h     │  ← category + meta
│─────────────────────────────────────│
│ [Status ▼]         [✏️] [🗑️]       │  ← action row
└─────────────────────────────────────┘
  ▲ left border colored by priority
```

### Large Card (`renderLargeCard`)
*Preserved for future use*

Same data but full-width, more padding (p-5/p-6), larger title (text-lg), non-truncated notes.

---

## 10. Automation: Carry Forward

```
┌──────────────┐
│  Page Load   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐     ┌──────────────────┐
│ autoCarryForward()   │────▶│  getSetting       │
│                      │     │  (lastCarryDate)  │
└──────┬───────────────┘     └─────────┬────────┘
       │                               │
       ▼                               ▼
  lastDate < today?  ───── No ──▶  Skip (already done)
       │
      Yes
       │
       ▼
┌──────────────────────┐
│   carryForward()     │
│                      │
│  1. getTasksByDate   │
│     (previousDay)    │
│                      │
│  2. Filter:          │
│     status ∈ {IP,    │
│     Pending, OnHold} │
│     AND carryForward │
│     = true           │
│                      │
│  3. Check duplicates │
│     by title         │
│                      │
│  4. Clone tasks:     │
│     new taskId       │
│     dateAssigned=    │
│     today            │
│     carriedFrom=     │
│     prevDay          │
│     actualHours=0    │
│                      │
│  5. Update settings  │
│     (counter + date) │
│                      │
│  6. Show toast       │
│  7. Re-render        │
└──────────────────────┘
```

Also triggered manually via `#btn-carry-forward`.

---

## 11. Theme System

```
┌─────────────────┐
│   initTheme()   │ ← called first in init()
└────────┬────────┘
         │
         ▼
  localStorage["taskboard-theme"]
         │
    ┌────┴────┐
    │         │
 "light"    null/"dark"
    │         │
    ▼         ▼
 Remove    Keep body.dark
 body.dark   btn = 🌙
 btn = ☀️

Toggle: #btn-theme-toggle click
  → body.classList.toggle("dark")
  → update emoji
  → save to localStorage
```

### CSS Strategy

All themed styles use dual selectors:
```css
body:not(.dark) .element { /* light */ }
body.dark .element       { /* dark  */ }
```

---

## 12. Import / Export

### Export Flow
```
btn-export click
  → getAllTasks()
  → Build JSON: { version: "1.0", exportDate, tasks }
  → Blob → createObjectURL → <a> click → download
  → File: taskboard-export-YYYY-MM-DD.json
```

### Import Flow
```
btn-import click
  → trigger #import-file-input click
  → FileReader.readAsText
  → JSON.parse → validate tasks array
  → Store in importedData
  → Show #import-modal

  ┌────────────────┐    ┌────────────────┐
  │ Replace All    │    │    Merge       │
  │                │    │                │
  │ clearAllTasks()│    │ For each task: │
  │ + insert all   │    │  exists? skip  │
  │                │    │  new? add      │
  └───────┬────────┘    └───────┬────────┘
          │                     │
          └──────────┬──────────┘
                     │
              Recalculate taskCounter
              Close modal → refreshActiveView
              Show toast
```

---

## 13. Event Flow

### Initialization Sequence

```
init()
  ├── initTheme()               ← prevent FOUC
  ├── initDB()                  ← open/create IndexedDB
  ├── generateSampleData()      ← 6 tasks on first run
  ├── autoCarryForward()        ← carry incomplete tasks
  ├── renderProductivity()      ← initial render
  └── Attach Event Listeners:
      ├── Theme toggle
      ├── Tab buttons (×3)
      ├── Date nav (prev/next/today/picker)
      ├── New task + carry forward buttons
      ├── Modal buttons (save/cancel/close)
      ├── Delete modal buttons
      ├── Import/export buttons
      ├── Card event delegation (×5 containers)
      ├── Calendar nav (prev/next/close-detail)
      ├── Keyboard (Escape)
      └── Backdrop clicks (×3 modals)
```

### User Action Flows

| Action | Event Chain |
|---|---|
| **Add Task** | btn-new-task → openTaskModal() → fill form → btn-save-task → saveTask() → addTask(DB) → refreshActiveView() → toast |
| **Edit Task** | card click / btn-edit → openTaskModal(id) → populate → saveTask() → updateTask(DB) → refreshActiveView() → toast |
| **Delete Task** | btn-delete → openDeleteModal(id) → btn-confirm-delete → confirmDelete() → deleteTask(DB) → refreshActiveView() → toast |
| **Status Change** | .status-select change → quickStatusChange(id, status) → updateTask(DB) → refreshActiveView() → toast |
| **Tab Switch** | .tab-btn click → switchTab(name) → show/hide divs → render tab content |
| **Carry Forward** | btn-carry-forward / auto → carryForward() → clone tasks → refreshActiveView() → toast |
| **Calendar Click** | .calendar-cell click → selectedCalDay → showDayDetail() → render cards |
| **Export** | btn-export → exportData() → download JSON |
| **Import** | btn-import → file select → parse → import modal → replace/merge → refreshActiveView() |
| **Theme** | btn-theme-toggle → toggleTheme() → body.dark toggle → localStorage save |

### Event Delegation Pattern

```javascript
attachCardEvents(container)
  ├── "change" event:
  │   └── .status-select → quickStatusChange(taskid, value)
  └── "click" event:
      ├── .btn-edit      → openTaskModal(taskid)
      ├── .btn-delete    → openDeleteModal(taskid)
      └── .compact-card  → openTaskModal(taskid)
```

Applied to 5 containers:
`cards-inprogress`, `cards-completed`, `cards-pending`, `cards-upcoming`, `day-detail-tasks`

---

## 14. CSS Architecture (styles.css)

### Style Categories

| Category | Selectors | Purpose |
|---|---|---|
| Base | `*`, `body` | Reset, font, transitions |
| Scrollbar | `::-webkit-scrollbar-*` | Thin rounded scrollbar |
| Focus | `:focus-visible` | Indigo ring |
| Header/Nav | `.app-header`, `.app-nav` | Sticky header, tab bar |
| Tabs | `.tab-btn`, `.tab-btn.active` | Underline animation |
| Cards | `.task-card` | Hover lift + shadow |
| Priority | `.border-priority-*` | 4px left accent |
| Modals | `.modal-backdrop`, `.modal-content` | Blur, scale animation |
| Toast | `.toast`, `@keyframes slideIn` | Slide from right |
| Charts | `.chart-bar`, `.chart-track` | Animated width bars |
| Badges | `.badge-*` | Pill-shaped labels |
| Selects | `.inline-select` | Custom dropdown arrow |
| Forms | `input`, `select`, `textarea` | Dark mode overrides |
| Buttons | `.btn-carry`, `.icon-btn`, `.btn-cancel` | Action buttons |
| Theme | `.theme-toggle` | Round toggle button |
| Calendar | `.calendar-*` | Grid, cells, dots, legend, detail |
| Responsive | `@media (max-width: 768px)` | Single column, hide dots |
| Print | `@media print` | Hide UI, clean cards |

### Color Palette

| Element | Light | Dark |
|---|---|---|
| Background | `#f8fafc` | `#0f172a` |
| Card | `#fff` | `#1e293b` |
| Border | `#f3f4f6` | `#334155` |
| Text Primary | `#1e293b` | `#f1f5f9` |
| Text Secondary | `#64748b` | `#94a3b8` |
| Accent | `#4f46e5` | `#818cf8` |
| Critical | `#ef4444` | `#ef4444` |
| High | `#f97316` | `#f97316` |
| Medium | `#f59e0b` | `#f59e0b` |
| Low | `#22c55e` | `#22c55e` |

---

## 15. Task Data Schema

```
Task Object
├── taskId:         "T-001"              (auto-generated, keyPath)
├── title:          "Configure webhooks" (required)
├── category:       "Development"        (dropdown: 6 options)
├── priority:       "High"               (dropdown: 4 options)
├── status:         "In Progress"        (dropdown: 4 options)
├── assignedTo:     "Ashish Moghe"       (text, default set)
├── dueDate:        "2026-06-06"         (ISO date)
├── estimatedHours: 4                    (number, step 0.5)
├── actualHours:    2                    (number, step 0.5)
├── notes:          "Waiting for keys"   (free text)
├── carriedFrom:    "2026-06-05"         (auto-filled on carry)
├── carryForward:   true                 (boolean toggle)
├── dateAssigned:   "2026-06-06"         (virtual "sheet")
├── createdAt:      "2026-06-06T10:..."  (ISO timestamp)
└── updatedAt:      "2026-06-06T12:..."  (ISO timestamp)
```

---

## 16. Function Call Graph

```
init()
├── initTheme()
├── initDB()
│   └── indexedDB.open() → onupgradeneeded (create stores)
├── generateSampleData()
│   ├── getAllTasks()
│   ├── addTask() ×6
│   └── setSetting("taskCounter", 6)
├── autoCarryForward()
│   ├── getSetting("lastCarryForwardDate")
│   └── carryForward()
│       ├── getPreviousDay()
│       ├── getTasksByDate(prevDay)
│       ├── getTasksByDate(today)  ← duplicate check
│       ├── getSetting("taskCounter")
│       ├── generateTaskId()
│       ├── addTask() ×N
│       ├── setSetting("taskCounter")
│       ├── setSetting("lastCarryForwardDate")
│       ├── showToast()
│       └── renderProductivity()
├── renderProductivity()
│   ├── getTasksByDate(currentDate)
│   ├── getTasksByDate(previousDay)
│   ├── renderCompactCard() ×N
│   └── emptyState()
└── attachCardEvents() ×5
    └── quickStatusChange()
        ├── getTask()
        ├── updateTask()
        ├── showToast()
        └── refreshActiveView()
            ├── renderProductivity()
            ├── renderReports()
            │   ├── getAllTasks()
            │   └── getMonthRange()
            └── renderCalendar()
                ├── getAllTasks()
                ├── getStatusDotClass() ×N
                └── showDayDetail()
                    ├── getTasksByDate()
                    └── renderCompactCard() ×N

saveTask()
├── getTask() (if editing)
├── addTask() / updateTask()
├── getSetting() + setSetting() (if new)
├── closeTaskModal()
├── refreshActiveView()
└── showToast()

confirmDelete()
├── deleteTask()
├── closeDeleteModal()
├── refreshActiveView()
└── showToast()

exportData()
├── getAllTasks()
├── Blob → download
└── showToast()

importReplace() / importMerge()
├── clearAllTasks() / getTask() ×N
├── addTask() ×N
├── setSetting("taskCounter")
├── closeImportModal()
├── refreshActiveView()
└── showToast()
```

---

*End of Knowledge Graph*
