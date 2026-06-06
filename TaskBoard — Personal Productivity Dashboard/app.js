/* ============================================================
   TaskBoard — app.js
   Complete application logic: IndexedDB, rendering, automation
   Dark mode default · Compact grid · Calendar view
   ============================================================ */

// ─── Constants ───────────────────────────────────────────────
const DB_NAME    = "TaskBoardDB";
const DB_VERSION = 1;
const CATEGORIES = ["Development","Testing","Stakeholder","Meeting","Blocker","To-do"];
const PRIORITIES = ["Critical","High","Medium","Low"];
const STATUSES   = ["In Progress","Pending","On Hold","Completed"];

const CATEGORY_COLORS = {
  Development: "bg-blue-500",
  Testing:     "bg-teal-500",
  Stakeholder: "bg-purple-500",
  Meeting:     "bg-indigo-500",
  Blocker:     "bg-red-500",
  "To-do":     "bg-amber-500"
};

// ─── State ───────────────────────────────────────────────────
let db             = null;
let currentDate    = todayStr();
let activeTab      = "productivity";
let importedData   = null;       // temp holder for import flow
let calendarMonth  = new Date(); // tracks which month is displayed
let selectedCalDay = null;       // tracks selected day in calendar

// ─── Helpers — Dates ─────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday:"long", day:"2-digit", month:"short", year:"numeric" });
}

function formatDateShort(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month:"short", day:"2-digit" });
}

function getPreviousDay(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function getNextDay(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function getMonthRange(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const y = d.getFullYear(), m = d.getMonth();
  const start = `${y}-${String(m+1).padStart(2,"0")}-01`;
  const last  = new Date(y, m+1, 0).getDate();
  const end   = `${y}-${String(m+1).padStart(2,"0")}-${String(last).padStart(2,"0")}`;
  return { start, end };
}

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function generateTaskId(counter) {
  return "T-" + String(counter).padStart(3, "0");
}

function nowISO() { return new Date().toISOString(); }

// ─── Helpers — Badge classes ─────────────────────────────────
function getPriorityBorderClass(p) {
  return { Critical:"border-priority-critical", High:"border-priority-high",
           Medium:"border-priority-medium", Low:"border-priority-low" }[p] || "";
}
function getPriorityBadgeClass(p) {
  return { Critical:"badge-critical", High:"badge-high",
           Medium:"badge-medium", Low:"badge-low" }[p] || "";
}
function getStatusBadgeClass(s) {
  return { "Completed":"badge-completed", "In Progress":"badge-inprogress",
           "Pending":"badge-pending", "On Hold":"badge-onhold" }[s] || "";
}
function getCategoryBadgeClass(c) {
  return { Development:"badge-development", Testing:"badge-testing",
           Stakeholder:"badge-stakeholder", Meeting:"badge-meeting",
           Blocker:"badge-blocker", "To-do":"badge-todo" }[c] || "";
}
function getStatusDotClass(s) {
  return { "Completed":"dot-completed", "In Progress":"dot-inprogress",
           "Pending":"dot-pending", "On Hold":"dot-onhold" }[s] || "";
}

// ─── IndexedDB Layer ─────────────────────────────────────────
function initDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains("tasks")) {
        const store = database.createObjectStore("tasks", { keyPath: "taskId" });
        store.createIndex("category",     "category",     { unique: false });
        store.createIndex("priority",     "priority",     { unique: false });
        store.createIndex("status",       "status",       { unique: false });
        store.createIndex("dueDate",      "dueDate",      { unique: false });
        store.createIndex("carryForward", "carryForward",  { unique: false });
        store.createIndex("dateAssigned", "dateAssigned",  { unique: false });
      }
      if (!database.objectStoreNames.contains("settings")) {
        database.createObjectStore("settings", { keyPath: "key" });
      }
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror   = (e) => reject(e.target.error);
  });
}

function dbTx(storeName, mode = "readonly") {
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

function addTask(task) {
  return new Promise((res, rej) => {
    const r = dbTx("tasks","readwrite").put(task);
    r.onsuccess = () => res(r.result);
    r.onerror   = () => rej(r.error);
  });
}
const updateTask = addTask;

function deleteTask(taskId) {
  return new Promise((res, rej) => {
    const r = dbTx("tasks","readwrite").delete(taskId);
    r.onsuccess = () => res();
    r.onerror   = () => rej(r.error);
  });
}

function getTask(taskId) {
  return new Promise((res, rej) => {
    const r = dbTx("tasks").get(taskId);
    r.onsuccess = () => res(r.result);
    r.onerror   = () => rej(r.error);
  });
}

function getTasksByDate(dateStr) {
  return new Promise((res, rej) => {
    const idx = dbTx("tasks").index("dateAssigned");
    const r = idx.getAll(dateStr);
    r.onsuccess = () => res(r.result || []);
    r.onerror   = () => rej(r.error);
  });
}

function getAllTasks() {
  return new Promise((res, rej) => {
    const r = dbTx("tasks").getAll();
    r.onsuccess = () => res(r.result || []);
    r.onerror   = () => rej(r.error);
  });
}

function clearAllTasks() {
  return new Promise((res, rej) => {
    const r = dbTx("tasks","readwrite").clear();
    r.onsuccess = () => res();
    r.onerror   = () => rej(r.error);
  });
}

function getSetting(key) {
  return new Promise((res, rej) => {
    const r = dbTx("settings").get(key);
    r.onsuccess = () => res(r.result ? r.result.value : null);
    r.onerror   = () => rej(r.error);
  });
}

function setSetting(key, value) {
  return new Promise((res, rej) => {
    const r = dbTx("settings","readwrite").put({ key, value });
    r.onsuccess = () => res();
    r.onerror   = () => rej(r.error);
  });
}

// ─── Toast System ────────────────────────────────────────────
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => { el.remove(); }, 3000);
}

// ─── Card Rendering ──────────────────────────────────────────

function statusOptions(current) {
  return STATUSES.map(s =>
    `<option value="${s}" ${s===current?"selected":""}>${s}</option>`
  ).join("");
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

/**
 * Large card — kept for future use (detail views, etc.)
 */
function renderLargeCard(task) {
  const borderClass = getPriorityBorderClass(task.priority);
  const priBadge    = getPriorityBadgeClass(task.priority);
  const catBadge    = getCategoryBadgeClass(task.category);
  const carriedHtml = task.carriedFrom
    ? `<span class="carry-badge">🔄 Carried from ${formatDateShort(task.carriedFrom)}</span>` : "";

  const notesHtml = task.notes
    ? `<p class="card-notes text-sm italic mt-2 leading-relaxed">${escapeHtml(task.notes)}</p>` : "";

  return `
  <div class="task-card rounded-xl shadow-sm border ${borderClass} p-5 sm:p-6">
    <div class="flex flex-wrap items-center gap-2 mb-2">
      <span class="card-id text-xs font-bold">${task.taskId}</span>
      <span class="badge ${priBadge}">${task.priority}</span>
      <span class="badge ${catBadge}">${task.category}</span>
      ${carriedHtml}
    </div>
    <h3 class="card-title text-lg font-bold mb-2">${escapeHtml(task.title)}</h3>
    <div class="flex flex-wrap items-center gap-4 text-xs card-meta mb-1">
      <span>📅 Due: <strong>${formatDateShort(task.dueDate)}</strong></span>
      <span>⏱ Est: <strong>${task.estimatedHours ?? 0}h</strong></span>
      <span>⏳ Actual: <strong>${task.actualHours ?? 0}h</strong></span>
      <span>👤 ${escapeHtml(task.assignedTo || "—")}</span>
    </div>
    ${notesHtml}
    <div class="flex items-center gap-2 mt-4 pt-3 border-t card-divider">
      <select class="inline-select status-select" data-taskid="${task.taskId}">
        ${statusOptions(task.status)}
      </select>
      <button class="icon-btn btn-edit" data-taskid="${task.taskId}" title="Edit">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      <button class="icon-btn danger btn-delete" data-taskid="${task.taskId}" title="Delete">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </div>`;
}

/**
 * Compact card — used for ALL sections
 */
function renderCompactCard(task) {
  const borderClass = getPriorityBorderClass(task.priority);
  const priBadge = getPriorityBadgeClass(task.priority);
  const catBadge = getCategoryBadgeClass(task.category);
  const stBadge  = getStatusBadgeClass(task.status);
  const carriedHtml = task.carriedFrom
    ? `<span class="carry-badge">🔄 ${formatDateShort(task.carriedFrom)}</span>` : "";

  const notesHtml = task.notes
    ? `<p class="card-notes text-xs italic mt-2 line-clamp-2">${escapeHtml(task.notes)}</p>` : "";

  return `
  <div class="task-card compact-card rounded-xl shadow-sm border ${borderClass} p-4 cursor-pointer transition"
       data-taskid="${task.taskId}">
    <div class="flex items-center gap-2 mb-2 flex-wrap">
      <span class="card-id text-xs font-bold">${task.taskId}</span>
      <span class="badge ${priBadge}">${task.priority}</span>
      <span class="badge ${stBadge}">${task.status}</span>
      ${carriedHtml}
    </div>
    <h4 class="card-title text-sm font-semibold line-clamp-2 mb-2">${escapeHtml(task.title)}</h4>
    ${notesHtml}
    <div class="flex flex-wrap items-center gap-2 text-xs mt-2">
      <span class="badge ${catBadge}">${task.category}</span>
      <span class="card-meta">📅 ${formatDateShort(task.dueDate)}</span>
      <span class="card-meta">⏱ ${task.estimatedHours ?? 0}h</span>
    </div>
    <!-- Quick actions row -->
    <div class="flex items-center gap-2 mt-3 pt-2 border-t card-divider">
      <select class="inline-select status-select flex-1" data-taskid="${task.taskId}"
              onclick="event.stopPropagation()">
        ${statusOptions(task.status)}
      </select>
      <button class="icon-btn btn-edit" data-taskid="${task.taskId}" title="Edit"
              onclick="event.stopPropagation()">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      <button class="icon-btn danger btn-delete" data-taskid="${task.taskId}" title="Delete"
              onclick="event.stopPropagation()">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </div>`;
}

function emptyState(msg) {
  return `<div class="empty-state">${msg}</div>`;
}

// ─── Render: Productivity Tab ────────────────────────────────
async function renderProductivity() {
  const todayTasks     = await getTasksByDate(currentDate);
  const yesterdayDate  = getPreviousDay(currentDate);
  const yesterdayTasks = await getTasksByDate(yesterdayDate);

  // Filter
  const inProgress = todayTasks.filter(t => t.status === "In Progress");
  const completed  = yesterdayTasks.filter(t => t.status === "Completed");
  const pending    = todayTasks.filter(t => t.status === "Pending" || t.status === "On Hold");
  const upcoming   = todayTasks.filter(t =>
    (t.status === "Pending" || t.status === "In Progress") && t.dueDate > currentDate
  );

  // Render In-Progress (compact cards)
  const ipContainer = document.getElementById("cards-inprogress");
  ipContainer.innerHTML = inProgress.length
    ? inProgress.map(renderCompactCard).join("")
    : emptyState("🎯 No tasks in progress. Start something!");
  document.getElementById("count-inprogress").textContent = `(${inProgress.length} task${inProgress.length!==1?"s":""})`;

  // Render Yesterday's Completed (compact cards)
  const cContainer = document.getElementById("cards-completed");
  cContainer.innerHTML = completed.length
    ? completed.map(renderCompactCard).join("")
    : emptyState("📭 No completed tasks from yesterday");
  document.getElementById("count-completed").textContent = `(${completed.length} task${completed.length!==1?"s":""})`;

  // Render Pending / On Hold (compact cards)
  const pContainer = document.getElementById("cards-pending");
  pContainer.innerHTML = pending.length
    ? pending.map(renderCompactCard).join("")
    : emptyState("✨ All clear! No pending or blocked tasks");
  document.getElementById("count-pending").textContent = `(${pending.length} task${pending.length!==1?"s":""})`;

  // Render Upcoming (compact cards)
  const uContainer = document.getElementById("cards-upcoming");
  uContainer.innerHTML = upcoming.length
    ? upcoming.map(renderCompactCard).join("")
    : emptyState("📅 No upcoming tasks scheduled");
  document.getElementById("count-upcoming").textContent = `(${upcoming.length} task${upcoming.length!==1?"s":""})`;

  // Date label
  document.getElementById("current-date-label").textContent = formatDate(currentDate);
  document.getElementById("date-picker").value = currentDate;
}

// ─── Render: Reports Tab ─────────────────────────────────────
async function renderReports() {
  const { start, end } = getMonthRange(currentDate);
  const allTasks = await getAllTasks();
  const monthTasks = allTasks.filter(t => t.dateAssigned >= start && t.dateAssigned <= end);

  // --- Monthly Summary ---
  const total = monthTasks.length;
  const counts = { Completed:0, "In Progress":0, Pending:0, "On Hold":0 };
  monthTasks.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++; });

  const summaryColors = {
    Completed:   "bg-emerald-500",
    "In Progress":"bg-blue-500",
    Pending:     "bg-purple-500",
    "On Hold":   "bg-slate-400"
  };

  let summaryHtml = `<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
    <div class="report-stat-card text-center p-4 rounded-xl">
      <p class="text-3xl font-extrabold">${total}</p>
      <p class="card-meta text-xs font-semibold mt-1">Total Tasks</p>
    </div>
    <div class="report-stat-card text-center p-4 rounded-xl">
      <p class="text-3xl font-extrabold" style="color:#10b981">${counts.Completed}</p>
      <p class="card-meta text-xs font-semibold mt-1">Completed</p>
    </div>
    <div class="report-stat-card text-center p-4 rounded-xl">
      <p class="text-3xl font-extrabold" style="color:#3b82f6">${counts["In Progress"]}</p>
      <p class="card-meta text-xs font-semibold mt-1">In Progress</p>
    </div>
    <div class="report-stat-card text-center p-4 rounded-xl">
      <p class="text-3xl font-extrabold" style="color:#8b5cf6">${counts.Pending + counts["On Hold"]}</p>
      <p class="card-meta text-xs font-semibold mt-1">Pending / On Hold</p>
    </div>
  </div>`;

  summaryHtml += `<div class="space-y-3">`;
  for (const [status, count] of Object.entries(counts)) {
    const pct = total ? Math.round((count / total) * 100) : 0;
    summaryHtml += `
    <div class="flex items-center gap-3">
      <span class="card-meta text-xs font-semibold w-24">${status}</span>
      <div class="flex-1 chart-track rounded-full h-6 overflow-hidden">
        <div class="chart-bar ${summaryColors[status]} h-full" style="width:${pct}%"></div>
      </div>
      <span class="card-meta text-xs font-bold w-12 text-right">${count} (${pct}%)</span>
    </div>`;
  }
  summaryHtml += `</div>`;
  document.getElementById("report-summary").innerHTML = total
    ? summaryHtml
    : emptyState("📭 No tasks this month yet");

  // --- Daily Trend ---
  const dailyCompleted = {};
  monthTasks.filter(t => t.status === "Completed").forEach(t => {
    dailyCompleted[t.dateAssigned] = (dailyCompleted[t.dateAssigned] || 0) + 1;
  });
  const maxDaily = Math.max(1, ...Object.values(dailyCompleted));
  const sortedDays = Object.keys(dailyCompleted).sort();

  let trendHtml = "";
  if (sortedDays.length === 0) {
    trendHtml = emptyState("📭 No completed tasks this month");
  } else {
    sortedDays.forEach(day => {
      const c = dailyCompleted[day];
      const pct = Math.round((c / maxDaily) * 100);
      trendHtml += `
      <div class="flex items-center gap-3">
        <span class="card-meta text-xs font-medium w-16">${formatDateShort(day)}</span>
        <div class="flex-1 chart-track rounded-full h-6 overflow-hidden">
          <div class="chart-bar bg-emerald-500 h-full" style="width:${pct}%"></div>
        </div>
        <span class="card-meta text-xs font-bold w-6 text-right">${c}</span>
      </div>`;
    });
  }
  document.getElementById("report-trend").innerHTML = trendHtml;

  // --- By Category ---
  const catCounts = {};
  CATEGORIES.forEach(c => catCounts[c] = 0);
  monthTasks.forEach(t => { if (catCounts[t.category] !== undefined) catCounts[t.category]++; });
  const maxCat = Math.max(1, ...Object.values(catCounts));

  let catHtml = "";
  for (const [cat, count] of Object.entries(catCounts)) {
    if (count === 0) continue;
    const pct = Math.round((count / maxCat) * 100);
    const color = CATEGORY_COLORS[cat] || "bg-gray-400";
    catHtml += `
    <div class="flex items-center gap-3">
      <span class="card-meta text-xs font-medium w-24">${cat}</span>
      <div class="flex-1 chart-track rounded-full h-6 overflow-hidden">
        <div class="chart-bar ${color} h-full" style="width:${pct}%"></div>
      </div>
      <span class="card-meta text-xs font-bold w-6 text-right">${count}</span>
    </div>`;
  }
  document.getElementById("report-category").innerHTML = catHtml || emptyState("📭 No category data yet");
}

// ─── Render: Calendar Tab ────────────────────────────────────

async function renderCalendar() {
  const year  = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth(); // 0-based
  const today = todayStr();

  // Update month label
  const monthNames = ["January","February","March","April","May","June",
                      "July","August","September","October","November","December"];
  document.getElementById("cal-month-label").textContent = `${monthNames[month]} ${year}`;

  // Fetch all tasks and group by dateAssigned
  const allTasks = await getAllTasks();
  const tasksByDate = {};
  allTasks.forEach(t => {
    if (!tasksByDate[t.dateAssigned]) tasksByDate[t.dateAssigned] = [];
    tasksByDate[t.dateAssigned].push(t);
  });

  // Build calendar grid
  let html = "";

  // Header row: Mon Tue Wed Thu Fri Sat Sun
  const dayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  dayLabels.forEach(d => {
    html += `<div class="calendar-header-cell">${d}</div>`;
  });

  // First day of month (0=Sun, 1=Mon … 6=Sat)
  const firstDay = new Date(year, month, 1).getDay();
  // Convert to Monday-start: Mon=0, Tue=1 … Sun=6
  const startOffset = (firstDay === 0) ? 6 : firstDay - 1;

  // Total days in month
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Total cells needed (fill complete weeks)
  const totalCells = Math.ceil((startOffset + totalDays) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    let cellDate, isOtherMonth = false;

    if (dayNum < 1) {
      // Previous month
      const d = new Date(year, month, dayNum);
      cellDate = toDateStr(d);
      isOtherMonth = true;
    } else if (dayNum > totalDays) {
      // Next month
      const d = new Date(year, month, dayNum);
      cellDate = toDateStr(d);
      isOtherMonth = true;
    } else {
      cellDate = `${year}-${String(month+1).padStart(2,"0")}-${String(dayNum).padStart(2,"0")}`;
    }

    const isToday    = cellDate === today;
    const isSelected = cellDate === selectedCalDay;
    const displayDay = new Date(cellDate + "T00:00:00").getDate();

    let classes = "calendar-cell";
    if (isToday)      classes += " today";
    if (isOtherMonth) classes += " other-month";
    if (isSelected)   classes += " selected";

    // Task dots for this date
    const dayTasks = tasksByDate[cellDate] || [];
    let dotsHtml = "";
    const MAX_DOTS = 6;
    const dotsToShow = dayTasks.slice(0, MAX_DOTS);
    dotsToShow.forEach(t => {
      dotsHtml += `<span class="calendar-dot ${getStatusDotClass(t.status)}"></span>`;
    });
    if (dayTasks.length > MAX_DOTS) {
      dotsHtml += `<span class="card-meta" style="font-size:.6rem;font-weight:700;">+${dayTasks.length - MAX_DOTS}</span>`;
    }

    // Mobile count fallback
    const countHtml = dayTasks.length > 0
      ? `<span class="calendar-task-count">${dayTasks.length} task${dayTasks.length!==1?"s":""}</span>`
      : "";

    html += `
    <div class="${classes}" data-date="${cellDate}">
      <span class="calendar-day-number">${displayDay}</span>
      <div class="calendar-dots">${dotsHtml}</div>
      ${countHtml}
    </div>`;
  }

  document.getElementById("calendar-grid").innerHTML = html;

  // Attach click handlers to cells
  document.querySelectorAll(".calendar-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      const dateStr = cell.dataset.date;
      // Update selected state
      document.querySelectorAll(".calendar-cell.selected").forEach(c => c.classList.remove("selected"));
      cell.classList.add("selected");
      selectedCalDay = dateStr;
      showDayDetail(dateStr);
    });
  });
}

async function showDayDetail(dateStr) {
  const tasks = await getTasksByDate(dateStr);
  const panel = document.getElementById("day-detail-panel");
  const titleEl = document.getElementById("day-detail-title");
  const tasksEl = document.getElementById("day-detail-tasks");

  // Show panel
  panel.style.display = "block";

  // Title
  titleEl.textContent = `${formatDate(dateStr)} — ${tasks.length} task${tasks.length!==1?"s":""}`;

  // Render task cards
  if (tasks.length > 0) {
    tasksEl.innerHTML = `<div class="compact-grid" style="display:grid; grid-template-columns: repeat(3,1fr); gap:1rem;">
      ${tasks.map(renderCompactCard).join("")}
    </div>`;
  } else {
    tasksEl.innerHTML = emptyState("📭 No tasks on this day");
  }

  // Scroll into view
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeDayDetail() {
  document.getElementById("day-detail-panel").style.display = "none";
  selectedCalDay = null;
  document.querySelectorAll(".calendar-cell.selected").forEach(c => c.classList.remove("selected"));
}

// ─── Carry-Forward ───────────────────────────────────────────
async function carryForward() {
  try {
    const prevDay   = getPreviousDay(currentDate);
    const prevTasks = await getTasksByDate(prevDay);
    const toCopy    = prevTasks.filter(t =>
      ["In Progress","Pending","On Hold"].includes(t.status) && t.carryForward
    );

    if (toCopy.length === 0) {
      showToast("No tasks to carry forward", "info");
      return;
    }

    // Check if already carried today (avoid duplicates)
    const todayTasks = await getTasksByDate(currentDate);
    const alreadyCarried = todayTasks.filter(t => t.carriedFrom === prevDay).map(t => t.title);

    let counter = (await getSetting("taskCounter")) || 0;
    let carried = 0;

    for (const t of toCopy) {
      if (alreadyCarried.includes(t.title)) continue; // skip duplicates
      counter++;
      const newTask = {
        taskId:         generateTaskId(counter),
        title:          t.title,
        category:       t.category,
        priority:       t.priority,
        status:         t.status,
        assignedTo:     t.assignedTo,
        dueDate:        t.dueDate,
        estimatedHours: t.estimatedHours,
        actualHours:    0,
        notes:          t.notes,
        carriedFrom:    prevDay,
        carryForward:   true,
        dateAssigned:   currentDate,
        createdAt:      nowISO(),
        updatedAt:      nowISO()
      };
      await addTask(newTask);
      carried++;
    }

    await setSetting("taskCounter", counter);
    await setSetting("lastCarryForwardDate", currentDate);

    if (carried > 0) {
      showToast(`⚡ Carried forward ${carried} task${carried!==1?"s":""}`, "success");
    } else {
      showToast("Tasks already carried forward today", "info");
    }
    await renderProductivity();
  } catch (err) {
    console.error(err);
    showToast("Carry forward failed", "error");
  }
}

async function autoCarryForward() {
  const last = await getSetting("lastCarryForwardDate");
  if (!last || last < todayStr()) {
    await carryForward();
  }
}

// ─── Theme Toggle ────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("taskboard-theme");
  const btn   = document.getElementById("btn-theme-toggle");
  if (saved === "light") {
    document.body.classList.remove("dark");
    btn.textContent = "☀️";
  } else {
    document.body.classList.add("dark");
    btn.textContent = "🌙";
  }
}

function toggleTheme() {
  const btn = document.getElementById("btn-theme-toggle");
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  btn.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("taskboard-theme", isDark ? "dark" : "light");
}

// ─── Modal Management ────────────────────────────────────────
function openTaskModal(taskId = null) {
  const modal     = document.getElementById("task-modal");
  const titleEl   = document.getElementById("modal-title");
  const form      = document.getElementById("task-form");

  form.reset();
  document.getElementById("form-taskId").value = "";
  document.getElementById("form-assignedTo").value = "Ashish Moghe";
  document.getElementById("form-dueDate").value = currentDate;
  document.getElementById("form-carryForward").checked = true;
  document.getElementById("form-priority").value = "Medium";
  document.getElementById("form-status").value = "In Progress";
  document.getElementById("form-category").value = "Development";

  if (taskId) {
    titleEl.textContent = "Edit Task";
    getTask(taskId).then(task => {
      if (!task) return;
      document.getElementById("form-taskId").value          = task.taskId;
      document.getElementById("form-title").value           = task.title;
      document.getElementById("form-category").value        = task.category;
      document.getElementById("form-priority").value        = task.priority;
      document.getElementById("form-status").value          = task.status;
      document.getElementById("form-assignedTo").value      = task.assignedTo || "Ashish Moghe";
      document.getElementById("form-dueDate").value         = task.dueDate || "";
      document.getElementById("form-estimatedHours").value  = task.estimatedHours || "";
      document.getElementById("form-actualHours").value     = task.actualHours || "";
      document.getElementById("form-notes").value           = task.notes || "";
      document.getElementById("form-carryForward").checked  = !!task.carryForward;
    });
  } else {
    titleEl.textContent = "Add Task";
  }

  modal.classList.add("open");
}

function closeTaskModal() {
  document.getElementById("task-modal").classList.remove("open");
}

async function saveTask() {
  const title = document.getElementById("form-title").value.trim();
  if (!title) { showToast("Task title is required", "error"); return; }

  const existingId = document.getElementById("form-taskId").value;

  const taskData = {
    title,
    category:       document.getElementById("form-category").value,
    priority:       document.getElementById("form-priority").value,
    status:         document.getElementById("form-status").value,
    assignedTo:     document.getElementById("form-assignedTo").value.trim() || "Ashish Moghe",
    dueDate:        document.getElementById("form-dueDate").value,
    estimatedHours: parseFloat(document.getElementById("form-estimatedHours").value) || 0,
    actualHours:    parseFloat(document.getElementById("form-actualHours").value) || 0,
    notes:          document.getElementById("form-notes").value.trim(),
    carryForward:   document.getElementById("form-carryForward").checked,
    updatedAt:      nowISO()
  };

  try {
    if (existingId) {
      // Edit
      const existing = await getTask(existingId);
      Object.assign(existing, taskData);
      await updateTask(existing);
      showToast("✏️ Task updated", "success");
    } else {
      // New
      let counter = (await getSetting("taskCounter")) || 0;
      counter++;
      taskData.taskId       = generateTaskId(counter);
      taskData.dateAssigned  = currentDate;
      taskData.carriedFrom   = "";
      taskData.createdAt     = nowISO();
      await addTask(taskData);
      await setSetting("taskCounter", counter);
      showToast("✅ Task created", "success");
    }
    closeTaskModal();
    await refreshActiveView();
  } catch (err) {
    console.error(err);
    showToast("Failed to save task", "error");
  }
}

// ─── Delete Flow ─────────────────────────────────────────────
function openDeleteModal(taskId) {
  document.getElementById("delete-taskId").value = taskId;
  document.getElementById("delete-modal").classList.add("open");
}
function closeDeleteModal() {
  document.getElementById("delete-modal").classList.remove("open");
}
async function confirmDelete() {
  const taskId = document.getElementById("delete-taskId").value;
  try {
    await deleteTask(taskId);
    closeDeleteModal();
    showToast("🗑️ Task deleted", "success");
    await refreshActiveView();
  } catch (err) {
    console.error(err);
    showToast("Failed to delete task", "error");
  }
}

// ─── Refresh Active View (helper) ────────────────────────────
async function refreshActiveView() {
  if (activeTab === "productivity") {
    await renderProductivity();
  } else if (activeTab === "reports") {
    await renderReports();
  } else if (activeTab === "calendar") {
    await renderCalendar();
    if (selectedCalDay) await showDayDetail(selectedCalDay);
  }
}

// ─── Import / Export ─────────────────────────────────────────
async function exportData() {
  try {
    const tasks = await getAllTasks();
    const payload = {
      version:    "1.0",
      exportDate: nowISO(),
      tasks
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `taskboard-export-${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("📦 Data exported", "success");
  } catch (err) {
    console.error(err);
    showToast("Export failed", "error");
  }
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!data.tasks || !Array.isArray(data.tasks)) {
        showToast("Invalid file: missing tasks array", "error");
        return;
      }
      importedData = data;
      document.getElementById("import-modal").classList.add("open");
    } catch {
      showToast("Invalid JSON file", "error");
    }
  };
  reader.readAsText(file);
  e.target.value = ""; // reset so same file can be re-imported
}

async function importReplace() {
  if (!importedData) return;
  try {
    await clearAllTasks();
    for (const t of importedData.tasks) await addTask(t);
    // update counter
    const maxId = importedData.tasks.reduce((m, t) => {
      const n = parseInt(t.taskId.replace("T-",""), 10);
      return n > m ? n : m;
    }, 0);
    await setSetting("taskCounter", maxId);
    closeImportModal();
    showToast(`🔄 Replaced with ${importedData.tasks.length} tasks`, "success");
    importedData = null;
    await refreshActiveView();
  } catch (err) {
    console.error(err);
    showToast("Import failed", "error");
  }
}

async function importMerge() {
  if (!importedData) return;
  try {
    let added = 0, skipped = 0;
    for (const t of importedData.tasks) {
      const exists = await getTask(t.taskId);
      if (exists) { skipped++; } else { await addTask(t); added++; }
    }
    // update counter
    const allTasks = await getAllTasks();
    const maxId = allTasks.reduce((m, t) => {
      const n = parseInt(t.taskId.replace("T-",""), 10);
      return n > m ? n : m;
    }, 0);
    await setSetting("taskCounter", maxId);
    closeImportModal();
    showToast(`🔀 Merged: ${added} added, ${skipped} skipped`, "success");
    importedData = null;
    await refreshActiveView();
  } catch (err) {
    console.error(err);
    showToast("Import failed", "error");
  }
}

function closeImportModal() {
  document.getElementById("import-modal").classList.remove("open");
}

// ─── Quick Status Change ─────────────────────────────────────
async function quickStatusChange(taskId, newStatus) {
  try {
    const task = await getTask(taskId);
    if (!task) return;
    task.status    = newStatus;
    task.updatedAt = nowISO();
    await updateTask(task);
    showToast(`Status → ${newStatus}`, "info");
    await refreshActiveView();
  } catch (err) {
    console.error(err);
    showToast("Status update failed", "error");
  }
}

// ─── Sample Data ─────────────────────────────────────────────
async function generateSampleData() {
  const allTasks = await getAllTasks();
  if (allTasks.length > 0) return; // already have data

  const today     = todayStr();
  const yesterday = getPreviousDay(today);
  const tomorrow  = getNextDay(today);

  const samples = [
    {
      taskId:"T-001", title:"PagerDuty Integration - Configure webhooks",
      category:"Development", priority:"High", status:"In Progress",
      assignedTo:"Ashish Moghe", dueDate:today, estimatedHours:4, actualHours:2,
      notes:"Waiting for API keys from Paul", carriedFrom:"", carryForward:true,
      dateAssigned:today, createdAt:nowISO(), updatedAt:nowISO()
    },
    {
      taskId:"T-002", title:"ACL fix for RITM form visibility",
      category:"Development", priority:"Critical", status:"In Progress",
      assignedTo:"Ashish Moghe", dueDate:today, estimatedHours:3, actualHours:1,
      notes:"Security review pending", carriedFrom:"", carryForward:true,
      dateAssigned:today, createdAt:nowISO(), updatedAt:nowISO()
    },
    {
      taskId:"T-003", title:"Weekly standup with Thaddeus",
      category:"Meeting", priority:"Medium", status:"Completed",
      assignedTo:"Ashish Moghe", dueDate:yesterday, estimatedHours:1, actualHours:0.5,
      notes:"", carriedFrom:"", carryForward:false,
      dateAssigned:yesterday, createdAt:nowISO(), updatedAt:nowISO()
    },
    {
      taskId:"T-004", title:"Test Okta SSO flow on staging",
      category:"Testing", priority:"High", status:"Completed",
      assignedTo:"Ashish Moghe", dueDate:yesterday, estimatedHours:2, actualHours:2.5,
      notes:"Found edge case with MFA", carriedFrom:"", carryForward:false,
      dateAssigned:yesterday, createdAt:nowISO(), updatedAt:nowISO()
    },
    {
      taskId:"T-005", title:"Review catalog item requirements",
      category:"Stakeholder", priority:"Medium", status:"Pending",
      assignedTo:"Ashish Moghe", dueDate:tomorrow, estimatedHours:2, actualHours:0,
      notes:"", carriedFrom:"", carryForward:true,
      dateAssigned:today, createdAt:nowISO(), updatedAt:nowISO()
    },
    {
      taskId:"T-006", title:"Now Assist incident follow-up",
      category:"Blocker", priority:"High", status:"On Hold",
      assignedTo:"Ashish Moghe", dueDate:today, estimatedHours:1, actualHours:0,
      notes:"Blocked: Waiting on Thaddeus response", carriedFrom:"", carryForward:true,
      dateAssigned:today, createdAt:nowISO(), updatedAt:nowISO()
    }
  ];

  for (const s of samples) await addTask(s);
  await setSetting("taskCounter", 6);
}

// ─── Tab Switching ───────────────────────────────────────────
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  document.getElementById("tab-productivity").classList.toggle("hidden", tab !== "productivity");
  document.getElementById("tab-reports").classList.toggle("hidden", tab !== "reports");
  document.getElementById("tab-calendar").classList.toggle("hidden", tab !== "calendar");

  if (tab === "reports")  renderReports();
  if (tab === "calendar") renderCalendar();
}

// ─── Event Delegation ────────────────────────────────────────
function attachCardEvents(container) {
  container.addEventListener("change", (e) => {
    if (e.target.classList.contains("status-select")) {
      quickStatusChange(e.target.dataset.taskid, e.target.value);
    }
  });
  container.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".btn-edit");
    if (editBtn) { openTaskModal(editBtn.dataset.taskid); return; }

    const delBtn = e.target.closest(".btn-delete");
    if (delBtn) { openDeleteModal(delBtn.dataset.taskid); return; }

    const compactCard = e.target.closest(".compact-card");
    if (compactCard) { openTaskModal(compactCard.dataset.taskid); }
  });
}

// ─── Init ────────────────────────────────────────────────────
async function init() {
  try {
    // Theme first (before any rendering to avoid flash)
    initTheme();

    await initDB();
    await generateSampleData();
    await autoCarryForward();

    // Set date picker
    document.getElementById("date-picker").value = currentDate;

    // Render
    await renderProductivity();

    // Theme toggle
    document.getElementById("btn-theme-toggle").addEventListener("click", toggleTheme);

    // Tab buttons
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // Date navigation
    document.getElementById("btn-prev-day").addEventListener("click", async () => {
      currentDate = getPreviousDay(currentDate);
      await renderProductivity();
    });
    document.getElementById("btn-next-day").addEventListener("click", async () => {
      currentDate = getNextDay(currentDate);
      await renderProductivity();
    });
    document.getElementById("btn-today").addEventListener("click", async () => {
      currentDate = todayStr();
      await renderProductivity();
    });
    document.getElementById("date-picker").addEventListener("change", async (e) => {
      if (e.target.value) { currentDate = e.target.value; await renderProductivity(); }
    });

    // Task modal
    document.getElementById("btn-new-task").addEventListener("click", () => openTaskModal());
    document.getElementById("btn-save-task").addEventListener("click", (e) => { e.preventDefault(); saveTask(); });
    document.getElementById("btn-cancel-task").addEventListener("click", closeTaskModal);
    document.getElementById("modal-close").addEventListener("click", closeTaskModal);

    // Delete modal
    document.getElementById("btn-confirm-delete").addEventListener("click", confirmDelete);
    document.getElementById("btn-cancel-delete").addEventListener("click", closeDeleteModal);

    // Carry forward
    document.getElementById("btn-carry-forward").addEventListener("click", carryForward);

    // Import / Export
    document.getElementById("btn-export").addEventListener("click", exportData);
    document.getElementById("btn-import").addEventListener("click", () => {
      document.getElementById("import-file-input").click();
    });
    document.getElementById("import-file-input").addEventListener("change", handleImportFile);
    document.getElementById("btn-import-replace").addEventListener("click", importReplace);
    document.getElementById("btn-import-merge").addEventListener("click", importMerge);
    document.getElementById("btn-cancel-import").addEventListener("click", closeImportModal);

    // Card event delegation — Productivity sections
    ["cards-inprogress","cards-completed","cards-pending","cards-upcoming"].forEach(id => {
      attachCardEvents(document.getElementById(id));
    });

    // Card event delegation — Calendar day detail panel
    attachCardEvents(document.getElementById("day-detail-tasks"));

    // Calendar navigation
    document.getElementById("btn-cal-prev").addEventListener("click", () => {
      calendarMonth.setMonth(calendarMonth.getMonth() - 1);
      closeDayDetail();
      renderCalendar();
    });
    document.getElementById("btn-cal-next").addEventListener("click", () => {
      calendarMonth.setMonth(calendarMonth.getMonth() + 1);
      closeDayDetail();
      renderCalendar();
    });
    document.getElementById("day-detail-close").addEventListener("click", closeDayDetail);

    // Keyboard: Escape closes modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeTaskModal();
        closeDeleteModal();
        closeImportModal();
      }
    });

    // Click on backdrop closes modals
    ["task-modal","delete-modal","import-modal"].forEach(id => {
      document.getElementById(id).addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.classList.remove("open");
        }
      });
    });

  } catch (err) {
    console.error("Init error:", err);
    showToast("Failed to initialize app", "error");
  }
}

// Launch
init();
