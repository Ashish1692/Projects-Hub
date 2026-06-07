# TaskBoard — Prompt Tracker

> Chronological log of all ideas, feature requests, design decisions, and changes made during the TaskBoard project.
> Started: June 2026

---

## Prompt #1 — Initial Concept & Vision
**Type:** 💡 Idea / 🏗️ Architecture
**Status:** ✅ Implemented

### Concept
- Personal productivity dashboard to visualize work
- See upcoming tasks, yesterday's completed work, today's in-progress, pending/on-hold items
- Data rendered as an HTML dashboard

### Design Direction
- Modern, cool, simple, very interactive
- Bright (but not too bright) colors with good readability
- Card layout — important cards should be spacious and easy to read
- Secondary cards can remain compact

### Components
- Main cards: today's in-progress tasks, yesterday's completed
- Cards should show enough info to understand what a task is about
- Two tabs initially: Productivity (default) and Reports (placeholder for future)

### Stack
- Vanilla JS
- IndexedDB for local storage
- Tailwind CSS or Bootstrap

### Features
- Import/Export data capability
- Automation: carry-forward incomplete tasks to the next day
- Data structure modeled after a spreadsheet:
  - One sheet per weekday (virtual, grouped by `dateAssigned`)
  - Summary sheet for monthly overview
  - Automation guide for carry-forward rules
- Task fields: Task ID, Title, Category, Priority, Status, Assigned To, Due Date, Estimated Hours, Actual Hours, Notes/Blockers, Carried From, Carry Forward

### Process
- Plan → Approval → Implement → Test → Deploy

---

## Prompt #2 — Plan Approval + Changes
**Type:** ✅ Approval / 🔄 Change Request
**Status:** ✅ Implemented

### Accepted (As Planned)
1. **Carry-forward**: Auto on page load + manual button option
2. **Import behavior**: User picks Replace All or Merge
4. **Assigned To field**: Keep it for future team use

### Changes Requested
3. **Categories** — changed from original list to:
   - Development, Testing, Stakeholder, Meeting, Blocker, To-do
5. **File structure** — separate `index.html`, `app.js`, `styles.css` (not single file)

---

## Prompt #3 — Dark Mode + Layout Change
**Type:** 🎨 Design / 🔄 Update
**Status:** ✅ Implemented

### New Feature
- **Dark mode as default** — with toggle to switch to light mode
- Persist theme preference in localStorage

### Layout Update
- Change Today's In-Progress and Yesterday's Completed sections from large full-width cards to **compact grid** (same layout as Pending section)
- All 4 sections now use identical compact-grid (3-column) layout

---

## Prompt #4 — Calendar View
**Type:** 🆕 Feature Request
**Status:** ✅ Implemented

### Requirements
- **Calendar view** as a new tab (after Reports)
- Monthly grid showing tasks grouped by states (color-coded dots)
- **Click any day** → list all tasks for that day
- Tasks in the day-detail view should be **editable** (edit, status change, delete)

---

## Prompt #5 — Knowledge Graph
**Type:** 📄 Documentation
**Status:** ✅ Implemented (v1), 🔄 Updated in Prompt #9

### Requirements
- Create a **knowledge graph** of the entire codebase
- Two formats:
  - **Markdown** (.md) — full text reference
  - **Interactive HTML** (.html) — visual explorer with clickable nodes, expandable trees, scroll spy

---

## Prompt #6 — Kanban Layout + Wider Container
**Type:** 🔄 Layout Update
**Status:** ✅ Implemented

### Layout Change
- Productivity tab: switch from **horizontal stacked sections** to **vertical Kanban columns**
- 4 side-by-side columns: In Progress, Yesterday, Pending/Hold, Upcoming
- Each column has sticky header, individual scroll, count badge

### Width Change
- Expand max-width from `7xl` to **`8xl`** (88rem / 1408px) for all content (header, nav, main)

---

## Prompt #7 — Reminders Tab (Major Feature)
**Type:** 🆕 Feature Request
**Status:** ✅ Implemented

### Core Requirement
- Fully functional **Reminders tab** (4th tab, after Calendar)
- **Completely isolated** from task features (separate DB, separate import/export)

### Features
- ✅ Create, complete, snooze, delete reminders
- 🗄️ Separate IndexedDB object store (`TaskBoardRemindersDB`)
- 🔔 Multi-fire notifications (1–20 fires per reminder)
- 🔁 "Remind Until Done" mode — fires indefinitely until completed
- 🔊 Custom sound upload for reminders (with default beep fallback)
- 💾 Import/Export backup as JSON (independent from task export)
- 🌙 Dark mode — must follow the project's theme system

### UI Spec
- **Active reminders**: Grid cards (auto-fill responsive grid)
- **Completed reminders**: Accordion (collapsed by default) with **table layout**
- **Overdue reminders**: Accordion (collapsed by default) with **table layout**

---

## Prompt #8 — Pre-Fire Logic Fix
**Type:** 🐛 Fix / 🔄 Behavior Change
**Status:** ✅ Logic defined, ⏳ Manual patch needed in app.js

### Issue
- Reminders were firing **after** the reminder time (too late)

### Requested Behavior
- Reminders should fire **before** the remind-at time, counting down to it
- Last fire should land at or just before the scheduled time
- Example: 3 fires × 60s interval → starts firing 3 minutes before the time
- Notification body should show countdown: "⏰ In 3 min", "⏰ In 2 min", "⏰ Now!"

### Changes Needed (3 edits in app.js)
1. `tick()` — calculate `leadTime` and `startAt`, fire when `now >= startAt`
2. `renderCard()` — urgency classes based on pre-fire window, not just reminderTime
3. `fireNotification()` — include countdown in notification body

---

## Prompt #9 — Knowledge Graph Update (v2)
**Type:** 📄 Documentation Update
**Status:** ✅ Markdown updated, ⏳ HTML pending

### Requirements
- Update both knowledge graph files with **all changes** since v1:
  - Kanban layout (Prompt #6)
  - max-w-8xl container (Prompt #6)
  - Reminders module with isolated Rem namespace (Prompt #7)
  - Pre-fire notification engine logic (Prompt #8)
  - 2 databases, 4 tabs, 6 modals
  - Notification engine, sound system, accordion UI
  - Isolation architecture diagram

---

## Prompt #10 — Prompt Tracker Document
**Type:** 📄 Documentation
**Status:** ✅ This file

### Requirements
- Separate file containing the **gist of all prompts**
- Serves as a tracker for core ideas, requested features, and general inquiries
- Organized chronologically

---

## Summary — Feature Inventory

### ✅ Implemented
| # | Feature | Prompt |
|---|---------|--------|
| 1 | Task CRUD (add, edit, delete, quick status change) | #1 |
| 2 | IndexedDB storage (TaskBoardDB) | #1 |
| 3 | Carry-forward automation (auto + manual) | #1, #2 |
| 4 | Import/Export tasks as JSON (Replace/Merge) | #1, #2 |
| 5 | Categories: Development, Testing, Stakeholder, Meeting, Blocker, To-do | #2 |
| 6 | Separate files: index.html, styles.css, app.js | #2 |
| 7 | Dark mode (default) with toggle | #3 |
| 8 | Compact grid for all task sections | #3 |
| 9 | Calendar view with day detail + editing | #4 |
| 10 | Knowledge graph (Markdown + HTML) | #5, #9 |
| 11 | Kanban board layout (4 vertical columns) | #6 |
| 12 | Max-width 8xl (1408px) | #6 |
| 13 | Reminders tab (isolated, separate DB) | #7 |
| 14 | Multi-fire notifications (1–20x) | #7 |
| 15 | Remind Until Done mode | #7 |
| 16 | Custom sound upload for reminders | #7 |
| 17 | Reminder import/export (separate JSON) | #7 |
| 18 | Accordion UI for completed/overdue reminders | #7 |
| 19 | Snooze system (5m/10m/15m/30m/1h) | #7 |
| 20 | Notification permission handling + banner | #7 |
| 21 | Sample data on first load (6 demo tasks) | #1 |
| 22 | Toast notification system | #1 |
| 23 | Date navigation (prev/next/today/picker) | #1 |
| 24 | Reports tab (monthly summary, daily trend, category breakdown) | #1 |
| 25 | Pre-fire notification logic (fires before reminder time) | #8 |

### ⏳ Pending / Manual
| # | Item | Prompt | Notes |
|---|------|--------|-------|
| 1 | Pre-fire logic patch in app.js | #8 | 3 targeted string replacements defined, needs manual apply |
| 2 | Interactive HTML knowledge graph v2 | #9 | Markdown done, HTML needs regeneration |

### 🔮 Future Scope (Mentioned but not yet requested)
- Excel/CSV import (v1 = JSON only)
- Multi-user / team view
- Cloud sync
- Advanced charting library (currently CSS-based)
- Dark mode refinements
- Mobile-optimized layout (basic responsiveness only in v1)

---

## Non-TaskBoard Requests (Same Session)

| # | Request | Type | Notes |
|---|---------|------|-------|
| 1 | QR code for copilot.microsoft.com | 🛠️ Utility | Generated QR code image |
| 2 | Tax calculation (80K salary, BC Canada) | ❓ Inquiry | Calculated using 2023 BC tax brackets |
| 3 | Word count of research_summary.txt | 🛠️ Utility | Result: 46 words |

---

*Last updated: June 2026*