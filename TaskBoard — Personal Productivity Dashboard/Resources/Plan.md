# 📋 TaskBoard — Project Plan

Here's the full plan for your approval before I write a single line of code.

***

## 1. Project Overview

| Item           | Detail                                                  |
| -------------- | ------------------------------------------------------- |
| **Name**       | TaskBoard — Personal Productivity Dashboard             |
| **Stack**      | Vanilla JS, IndexedDB, Tailwind CSS (CDN)               |
| **Deployment** | Single `index.html` file (portable, no server needed)   |
| **Data**       | All local via IndexedDB, import/export via `.json` file |

***

## 2. Information Architecture

### 2.1 IndexedDB Schema

**Database**: `TaskBoardDB` (version 1)

**Object Store: `tasks`** (keyPath: `taskId`)

| Field            | Type    | Indexed    | Notes                                                     |
| ---------------- | ------- | ---------- | --------------------------------------------------------- |
| `taskId`         | string  | ✅ (unique) | Auto-generated: `T-001`, `T-002`...                       |
| `title`          | string  | ❌          | Task description                                          |
| `category`       | string  | ✅          | ServiceNow, Development, Meetings, Admin, Learning, Other |
| `priority`       | string  | ✅          | Critical, High, Medium, Low                               |
| `status`         | string  | ✅          | Completed, In Progress, Pending, On Hold                  |
| `assignedTo`     | string  | ❌          | Default: "Ashish Moghe"                                   |
| `dueDate`        | string  | ✅          | ISO date string                                           |
| `estimatedHours` | number  | ❌          | Planned effort                                            |
| `actualHours`    | number  | ❌          | Real effort                                               |
| `notes`          | string  | ❌          | Context, blockers, dependencies                           |
| `carriedFrom`    | string  | ❌          | Date string of origin day                                 |
| `carryForward`   | boolean | ✅          | Marks items for next-day carry                            |
| `dateAssigned`   | string  | ✅          | The "sheet date" this task belongs to                     |
| `createdAt`      | string  | ❌          | Timestamp                                                 |
| `updatedAt`      | string  | ❌          | Timestamp                                                 |

> **"Sheets" are virtual** — instead of physical sheets, tasks are grouped by `dateAssigned`. This is cleaner and lets IndexedDB indexes do the heavy lifting.

**Object Store: `settings`** (keyPath: `key`)

| Key                    | Value       | Purpose                          |
| ---------------------- | ----------- | -------------------------------- |
| `lastCarryForwardDate` | date string | Prevents duplicate carry-forward |
| `taskCounter`          | number      | Auto-increment for Task IDs      |

***

## 3. UI Layout & Components

### 3.1 Tab Structure

```
┌─────────────────────────────────────────────────┐
│  🎯 TaskBoard              [Import] [Export]    │
│  ─────────────────────────────────────────────  │
│  [ 🚀 Productivity ]  [ 📊 Reports ]           │
├─────────────────────────────────────────────────┤
│                                                 │
│  (Tab content renders here)                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3.2 Tab 1: Productivity (Default)

```
┌─────────────────────────────────────────────────────────┐
│  📅 Date: Sat, 07 Jun 2026        [+ New Task] [⚡ Carry Forward]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ── 🔥 TODAY'S IN-PROGRESS (Large spacious cards) ───  │
│  ┌─────────────────────────────────────────────────┐    │
│  │ T-005 | 🔴 Critical | ServiceNow               │    │
│  │ PagerDuty Integration - Configure webhooks      │    │
│  │ Due: Jun 08 | Est: 4h | Act: 2h                │    │
│  │ Notes: Waiting for API keys from Paul           │    │
│  │ [Status ▼] [Edit] [Carry →]                     │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │ T-008 | 🟡 Medium | Development                 │    │
│  │ ACL fix for RITM form...                        │    │
│  │ ...                                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ── ✅ YESTERDAY'S COMPLETED (Large spacious cards) ── │
│  ┌─────────────────────────────────────────────────┐    │
│  │ T-003 | 🟢 Low | Admin                          │    │
│  │ Updated catalog item descriptions               │    │
│  │ Completed in 1.5h (Est: 2h) ✨                  │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ── ⏸️ PENDING / ON HOLD (Compact cards) ───────────── │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ T-010 | Pending  │  │ T-012 | On Hold  │            │
│  │ Okta SSO debug   │  │ Now Assist review │            │
│  │ Due: Jun 10      │  │ Blocked: Thaddeus │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                         │
│  ── 📋 UPCOMING (Due soon, not started) ────────────── │
│  (Compact list/cards for tasks with future due dates)   │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Tab 2: Reports (Placeholder — expandable later)

| Report Card            | Content                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **📊 Monthly Summary** | Tasks completed, in-progress, pending — bar/donut chart (pure CSS or simple canvas) |
| **📈 Daily Trend**     | Tasks completed per day this month — simple line/bar                                |
| **🏷️ By Category**    | Breakdown of tasks per category — horizontal bars                                   |

> These will be CSS-based charts initially (no external charting lib). Can upgrade later.

***

## 4. Card Design Spec

### Important Cards (Today's In-Progress + Yesterday's Completed)

* **Width**: Full row (1 card per row on desktop)
* **Padding**: `p-5` to `p-6` (spacious)
* **Left border accent**: Color-coded by priority
  * 🔴 Critical → `border-red-500`
  * 🟠 High → `border-orange-500`
  * 🟡 Medium → `border-yellow-500`
  * 🟢 Low → `border-green-500`
* **Info shown**: Task ID, Priority badge, Category badge, Title (bold, larger), Due date, Hours (est vs actual), Notes/Blockers, Action buttons
* **Background**: White with subtle shadow, rounded corners

### Compact Cards (Pending, On Hold, Upcoming)

* **Width**: 2-3 per row (grid)
* **Padding**: `p-3` to `p-4`
* **Info shown**: Task ID, Title (truncated), Status, Due date
* **Click to expand**: Shows full details in a modal

***

## 5. Features Breakdown

### 5.1 Core CRUD

* ➕ **Add Task**: Modal form with all fields, dropdowns for Category/Priority/Status
* ✏️ **Edit Task**: Same modal, pre-filled
* 🗑️ **Delete Task**: Confirm dialog
* 🔄 **Quick Status Change**: Dropdown right on the card

### 5.2 Carry-Forward Automation

* **Trigger**: Manual button `[⚡ Carry Forward]` OR auto on first load of a new day
* **Logic**:
  1. Check `lastCarryForwardDate` in settings
  2. If today > lastCarryForwardDate → find all tasks from yesterday where `status ∈ [In Progress, Pending, On Hold]` AND `carryForward === true`
  3. Clone those tasks with new `dateAssigned = today`, `carriedFrom = yesterday's date`
  4. Update `lastCarryForwardDate`
* **Visual**: Carried-forward tasks show a `🔄 Carried from Jun 05` badge

### 5.3 Import / Export

* **Export**: Dump all IndexedDB data as `.json` file (downloadable)
* **Import**: Upload `.json` → validate schema → merge or replace (user choice)
* Future: Can add CSV/Excel support

### 5.4 Date Navigation

* Date picker to view any day's "sheet"
* Quick nav: `[← Yesterday] [Today] [Tomorrow →]`

***

## 6. Color Palette

| Element        | Color      | Tailwind Class                      |
| -------------- | ---------- | ----------------------------------- |
| Background     | Light gray | `bg-gray-50`                        |
| Card BG        | White      | `bg-white`                          |
| Primary accent | Indigo     | `bg-indigo-600`                     |
| Tab active     | Indigo     | `text-indigo-600 border-indigo-600` |
| Critical       | Red        | `bg-red-100 text-red-700`           |
| High           | Orange     | `bg-orange-100 text-orange-700`     |
| Medium         | Amber      | `bg-amber-100 text-amber-700`       |
| Low            | Green      | `bg-green-100 text-green-700`       |
| Completed      | Emerald    | `bg-emerald-100 text-emerald-700`   |
| In Progress    | Blue       | `bg-blue-100 text-blue-700`         |
| Pending        | Purple     | `bg-purple-100 text-purple-700`     |
| On Hold        | Slate      | `bg-slate-200 text-slate-700`       |

***

## 7. File Structure

Single file: **`index.html`**

```
index.html
├── <head> — Tailwind CDN, meta tags, inline <style>
├── <body>
│   ├── Header (title, import/export buttons)
│   ├── Tab bar
│   ├── Tab content containers
│   ├── Task modal (add/edit)
│   └── Toast notifications
└── <script>
    ├── DB Layer (IndexedDB init, CRUD operations)
    ├── State Manager (current date, filters, tab state)
    ├── UI Renderer (render cards, sections, reports)
    ├── Automation (carry-forward logic)
    ├── Import/Export handlers
    └── Event listeners
```

***

## 8. Implementation Phases

| Phase       | What                                        | Estimate         |
| ----------- | ------------------------------------------- | ---------------- |
| **Phase 1** | IndexedDB setup + CRUD + Task modal         | Core foundation  |
| **Phase 2** | Productivity tab — all 4 card sections      | Main dashboard   |
| **Phase 3** | Carry-forward automation + date navigation  | Smart features   |
| **Phase 4** | Import/Export                               | Data portability |
| **Phase 5** | Reports tab (CSS charts)                    | Analytics        |
| **Phase 6** | Polish — animations, toasts, responsiveness | UX               |

> All phases delivered as a single `index.html` file.

***

## 9. What's NOT in v1 (Future scope)

* Excel/CSV import (v1 = JSON only)
* Multi-user / team view
* Cloud sync
* Advanced charting library
* Dark mode (can add quickly later)
* Mobile-optimized layout (basic responsiveness only in v1)

***

## ✅ Decision Points (Need Your Input)

1. **Carry-forward**: Auto on page load OR manual button only? *(Plan says: auto + manual option)*
2. **Import behavior**: Replace all data OR merge with existing? *(Plan says: user picks)*
3. **Default categories**: `ServiceNow, Development, Meetings, Admin, Learning, Other` — want to add/change any?
4. **Assigned To**: Since this is personal, should I keep this field or skip it? *(Plan keeps it for future team use)*
5. **Single HTML file** — confirmed? Or do you want separate JS/CSS files?

***

Drop your approval (with any tweaks) and I'll start building. 🚀
