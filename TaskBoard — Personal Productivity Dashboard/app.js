/* ============================================================
   TaskBoard — app.js
   Complete application logic + Isolated Reminders Module
   ============================================================ */

// ─── Tailwind 8xl extension ──────────────────────────────────
const _s = document.createElement("style");
_s.textContent = ".max-w-8xl{max-width:88rem}";
document.head.appendChild(_s);

// ─── Constants ───────────────────────────────────────────────
const DB_NAME = "TaskBoardDB",
	DB_VERSION = 1;
const CATEGORIES = [
	"Development",
	"Testing",
	"Stakeholder",
	"Meeting",
	"Blocker",
	"To-do",
];
const PRIORITIES = ["Critical", "High", "Medium", "Low"];
const STATUSES = ["In Progress", "Pending", "On Hold", "Completed"];
const CATEGORY_COLORS = {
	Development: "bg-blue-500",
	Testing: "bg-teal-500",
	Stakeholder: "bg-purple-500",
	Meeting: "bg-indigo-500",
	Blocker: "bg-red-500",
	"To-do": "bg-amber-500",
};

// ─── State ───────────────────────────────────────────────────
let db = null,
	currentDate = todayStr(),
	activeTab = "productivity",
	importedData = null;
let calendarMonth = new Date(),
	selectedCalDay = null;

// ─── Helpers ─────────────────────────────────────────────────
function todayStr() {
	const d = new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDate(s) {
	if (!s) return "—";
	const d = new Date(s + "T00:00:00");
	return d.toLocaleDateString("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}
function formatDateShort(s) {
	if (!s) return "—";
	const d = new Date(s + "T00:00:00");
	return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}
function getPreviousDay(s) {
	const d = new Date(s + "T00:00:00");
	d.setDate(d.getDate() - 1);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function getNextDay(s) {
	const d = new Date(s + "T00:00:00");
	d.setDate(d.getDate() + 1);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function getMonthRange(s) {
	const d = new Date(s + "T00:00:00"),
		y = d.getFullYear(),
		m = d.getMonth();
	const start = `${y}-${String(m + 1).padStart(2, "0")}-01`,
		last = new Date(y, m + 1, 0).getDate(),
		end = `${y}-${String(m + 1).padStart(2, "0")}-${String(last).padStart(2, "0")}`;
	return { start, end };
}
function toDateStr(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function generateTaskId(c) {
	return "T-" + String(c).padStart(3, "0");
}
function nowISO() {
	return new Date().toISOString();
}
function getPriorityBorderClass(p) {
	return (
		{
			Critical: "border-priority-critical",
			High: "border-priority-high",
			Medium: "border-priority-medium",
			Low: "border-priority-low",
		}[p] || ""
	);
}
function getPriorityBadgeClass(p) {
	return (
		{
			Critical: "badge-critical",
			High: "badge-high",
			Medium: "badge-medium",
			Low: "badge-low",
		}[p] || ""
	);
}
function getStatusBadgeClass(s) {
	return (
		{
			Completed: "badge-completed",
			"In Progress": "badge-inprogress",
			Pending: "badge-pending",
			"On Hold": "badge-onhold",
		}[s] || ""
	);
}
function getCategoryBadgeClass(c) {
	return (
		{
			Development: "badge-development",
			Testing: "badge-testing",
			Stakeholder: "badge-stakeholder",
			Meeting: "badge-meeting",
			Blocker: "badge-blocker",
			"To-do": "badge-todo",
		}[c] || ""
	);
}
function getStatusDotClass(s) {
	return (
		{
			Completed: "dot-completed",
			"In Progress": "dot-inprogress",
			Pending: "dot-pending",
			"On Hold": "dot-onhold",
		}[s] || ""
	);
}

// ─── IndexedDB Layer ─────────────────────────────────────────
function initDB() {
	return new Promise((res, rej) => {
		const r = indexedDB.open(DB_NAME, DB_VERSION);
		r.onupgradeneeded = (e) => {
			const d = e.target.result;
			if (!d.objectStoreNames.contains("tasks")) {
				const s = d.createObjectStore("tasks", { keyPath: "taskId" });
				s.createIndex("category", "category", { unique: false });
				s.createIndex("priority", "priority", { unique: false });
				s.createIndex("status", "status", { unique: false });
				s.createIndex("dueDate", "dueDate", { unique: false });
				s.createIndex("carryForward", "carryForward", {
					unique: false,
				});
				s.createIndex("dateAssigned", "dateAssigned", {
					unique: false,
				});
			}
			if (!d.objectStoreNames.contains("settings"))
				d.createObjectStore("settings", { keyPath: "key" });
		};
		r.onsuccess = (e) => {
			db = e.target.result;
			res(db);
		};
		r.onerror = (e) => rej(e.target.error);
	});
}
function dbTx(s, m = "readonly") {
	return db.transaction(s, m).objectStore(s);
}
function addTask(t) {
	return new Promise((r, j) => {
		const q = dbTx("tasks", "readwrite").put(t);
		q.onsuccess = () => r(q.result);
		q.onerror = () => j(q.error);
	});
}
const updateTask = addTask;
function deleteTask(id) {
	return new Promise((r, j) => {
		const q = dbTx("tasks", "readwrite").delete(id);
		q.onsuccess = () => r();
		q.onerror = () => j(q.error);
	});
}
function getTask(id) {
	return new Promise((r, j) => {
		const q = dbTx("tasks").get(id);
		q.onsuccess = () => r(q.result);
		q.onerror = () => j(q.error);
	});
}
function getTasksByDate(d) {
	return new Promise((r, j) => {
		const q = dbTx("tasks").index("dateAssigned").getAll(d);
		q.onsuccess = () => r(q.result || []);
		q.onerror = () => j(q.error);
	});
}
function getAllTasks() {
	return new Promise((r, j) => {
		const q = dbTx("tasks").getAll();
		q.onsuccess = () => r(q.result || []);
		q.onerror = () => j(q.error);
	});
}
function clearAllTasks() {
	return new Promise((r, j) => {
		const q = dbTx("tasks", "readwrite").clear();
		q.onsuccess = () => r();
		q.onerror = () => j(q.error);
	});
}
function getSetting(k) {
	return new Promise((r, j) => {
		const q = dbTx("settings").get(k);
		q.onsuccess = () => r(q.result ? q.result.value : null);
		q.onerror = () => j(q.error);
	});
}
function setSetting(k, v) {
	return new Promise((r, j) => {
		const q = dbTx("settings", "readwrite").put({ key: k, value: v });
		q.onsuccess = () => r();
		q.onerror = () => j(q.error);
	});
}

// ─── Toast ───────────────────────────────────────────────────
function showToast(msg, type = "info") {
	const c = document.getElementById("toast-container"),
		el = document.createElement("div");
	el.className = `toast ${type}`;
	el.textContent = msg;
	c.appendChild(el);
	setTimeout(() => el.remove(), 3000);
}

// ─── Card Rendering ──────────────────────────────────────────
function statusOptions(cur) {
	return STATUSES.map(
		(s) =>
			`<option value="${s}" ${s === cur ? "selected" : ""}>${s}</option>`,
	).join("");
}
function escapeHtml(s) {
	if (!s) return "";
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function renderLargeCard(task) {
	const bc = getPriorityBorderClass(task.priority),
		pb = getPriorityBadgeClass(task.priority),
		cb = getCategoryBadgeClass(task.category);
	const ch = task.carriedFrom
		? `<span class="carry-badge">🔄 Carried from ${formatDateShort(task.carriedFrom)}</span>`
		: "";
	const nh = task.notes
		? `<p class="card-notes text-sm italic mt-2 leading-relaxed">${escapeHtml(task.notes)}</p>`
		: "";
	return `<div class="task-card rounded-xl shadow-sm border ${bc} p-5 sm:p-6"><div class="flex flex-wrap items-center gap-2 mb-2"><span class="card-id text-xs font-bold">${task.taskId}</span><span class="badge ${pb}">${task.priority}</span><span class="badge ${cb}">${task.category}</span>${ch}</div><h3 class="card-title text-lg font-bold mb-2">${escapeHtml(task.title)}</h3><div class="flex flex-wrap items-center gap-4 text-xs card-meta mb-1"><span>📅 Due: <strong>${formatDateShort(task.dueDate)}</strong></span><span>⏱ Est: <strong>${task.estimatedHours ?? 0}h</strong></span><span>⏳ Actual: <strong>${task.actualHours ?? 0}h</strong></span><span>👤 ${escapeHtml(task.assignedTo || "—")}</span></div>${nh}<div class="flex items-center gap-2 mt-4 pt-3 border-t card-divider"><select class="inline-select status-select" data-taskid="${task.taskId}">${statusOptions(task.status)}</select><button class="icon-btn btn-edit" data-taskid="${task.taskId}" title="Edit"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button><button class="icon-btn danger btn-delete" data-taskid="${task.taskId}" title="Delete"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div></div>`;
}

function renderCompactCard(task) {
	const bc = getPriorityBorderClass(task.priority),
		pb = getPriorityBadgeClass(task.priority),
		sb = getStatusBadgeClass(task.status),
		cb = getCategoryBadgeClass(task.category);
	const ch = task.carriedFrom
		? `<span class="carry-badge">🔄 ${formatDateShort(task.carriedFrom)}</span>`
		: "";
	const nh = task.notes
		? `<p class="card-notes text-xs italic mt-2 line-clamp-2">${escapeHtml(task.notes)}</p>`
		: "";
	return `<div class="task-card compact-card rounded-xl shadow-sm border ${bc} p-4 cursor-pointer transition" data-taskid="${task.taskId}"><div class="flex items-center gap-2 mb-2 flex-wrap"><span class="card-id text-xs font-bold">${task.taskId}</span><span class="badge ${pb}">${task.priority}</span><!--<span class="badge ${sb}">${task.status}</span>--><span class="badge ${cb}">${task.category}</span>${ch}</div><h4 class="card-title text-sm font-semibold line-clamp-2 mb-2">${escapeHtml(task.title)}</h4>${nh}<div class="flex flex-wrap items-center gap-2 text-xs mt-2"><span class="card-meta">📅 ${formatDateShort(task.dueDate)}</span><span class="card-meta">⏱ ${task.estimatedHours ?? 0}h</span></div><div class="flex items-center gap-2 mt-3 pt-2 border-t card-divider"><select class="inline-select status-select flex-1" data-taskid="${task.taskId}" onclick="event.stopPropagation()">${statusOptions(task.status)}</select><button class="icon-btn btn-edit" data-taskid="${task.taskId}" title="Edit" onclick="event.stopPropagation()"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button><button class="icon-btn danger btn-delete" data-taskid="${task.taskId}" title="Delete" onclick="event.stopPropagation()"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div></div>`;
}

function emptyState(msg) {
	return `<div class="empty-state">${msg}</div>`;
}

// ─── Render: Productivity (Kanban) ───────────────────────────
async function renderProductivity() {
	const tt = await getTasksByDate(currentDate),
		yd = getPreviousDay(currentDate),
		yt = await getTasksByDate(yd);
	const ip = tt.filter((t) => t.status === "In Progress"),
		co = yt.filter((t) => t.status === "Completed"),
		pe = tt.filter((t) => t.status === "Pending" || t.status === "On Hold"),
		up = tt.filter(
			(t) =>
				(t.status === "Pending" || t.status === "In Progress") &&
				t.dueDate > currentDate,
		);
	document.getElementById("cards-inprogress").innerHTML = ip.length
		? ip.map(renderCompactCard).join("")
		: emptyState("🎯 No tasks in progress");
	document.getElementById("count-inprogress").textContent = ip.length;
	document.getElementById("cards-completed").innerHTML = co.length
		? co.map(renderCompactCard).join("")
		: emptyState("📭 No completed tasks");
	document.getElementById("count-completed").textContent = co.length;
	document.getElementById("cards-pending").innerHTML = pe.length
		? pe.map(renderCompactCard).join("")
		: emptyState("✨ All clear!");
	document.getElementById("count-pending").textContent = pe.length;
	document.getElementById("cards-upcoming").innerHTML = up.length
		? up.map(renderCompactCard).join("")
		: emptyState("📅 No upcoming tasks");
	document.getElementById("count-upcoming").textContent = up.length;
	document.getElementById("current-date-label").textContent =
		formatDate(currentDate);
	document.getElementById("date-picker").value = currentDate;
}

// ─── Render: Reports ─────────────────────────────────────────
async function renderReports() {
	const { start, end } = getMonthRange(currentDate),
		all = await getAllTasks(),
		mt = all.filter(
			(t) => t.dateAssigned >= start && t.dateAssigned <= end,
		);
	const total = mt.length,
		counts = { Completed: 0, "In Progress": 0, Pending: 0, "On Hold": 0 };
	mt.forEach((t) => {
		if (counts[t.status] !== undefined) counts[t.status]++;
	});
	const sc = {
		Completed: "bg-emerald-500",
		"In Progress": "bg-blue-500",
		Pending: "bg-purple-500",
		"On Hold": "bg-slate-400",
	};
	let sh = `<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"><div class="report-stat-card text-center p-4 rounded-xl"><p class="text-3xl font-extrabold">${total}</p><p class="card-meta text-xs font-semibold mt-1">Total</p></div><div class="report-stat-card text-center p-4 rounded-xl"><p class="text-3xl font-extrabold" style="color:#10b981">${counts.Completed}</p><p class="card-meta text-xs font-semibold mt-1">Completed</p></div><div class="report-stat-card text-center p-4 rounded-xl"><p class="text-3xl font-extrabold" style="color:#3b82f6">${counts["In Progress"]}</p><p class="card-meta text-xs font-semibold mt-1">In Progress</p></div><div class="report-stat-card text-center p-4 rounded-xl"><p class="text-3xl font-extrabold" style="color:#8b5cf6">${counts.Pending + counts["On Hold"]}</p><p class="card-meta text-xs font-semibold mt-1">Pending/Hold</p></div></div><div class="space-y-3">`;
	for (const [s, c] of Object.entries(counts)) {
		const p = total ? Math.round((c / total) * 100) : 0;
		sh += `<div class="flex items-center gap-3"><span class="card-meta text-xs font-semibold w-24">${s}</span><div class="flex-1 chart-track rounded-full h-6 overflow-hidden"><div class="chart-bar ${sc[s]} h-full" style="width:${p}%"></div></div><span class="card-meta text-xs font-bold w-12 text-right">${c}(${p}%)</span></div>`;
	}
	sh += "</div>";
	document.getElementById("report-summary").innerHTML = total
		? sh
		: emptyState("📭 No tasks this month");
	const dc = {};
	mt.filter((t) => t.status === "Completed").forEach((t) => {
		dc[t.dateAssigned] = (dc[t.dateAssigned] || 0) + 1;
	});
	const md = Math.max(1, ...Object.values(dc)),
		sd = Object.keys(dc).sort();
	let th = "";
	if (!sd.length) th = emptyState("📭 No completed");
	else
		sd.forEach((d) => {
			const c = dc[d],
				p = Math.round((c / md) * 100);
			th += `<div class="flex items-center gap-3"><span class="card-meta text-xs font-medium w-16">${formatDateShort(d)}</span><div class="flex-1 chart-track rounded-full h-6 overflow-hidden"><div class="chart-bar bg-emerald-500 h-full" style="width:${p}%"></div></div><span class="card-meta text-xs font-bold w-6 text-right">${c}</span></div>`;
		});
	document.getElementById("report-trend").innerHTML = th;
	const cc = {};
	CATEGORIES.forEach((c) => (cc[c] = 0));
	mt.forEach((t) => {
		if (cc[t.category] !== undefined) cc[t.category]++;
	});
	const mc = Math.max(1, ...Object.values(cc));
	let ch = "";
	for (const [cat, cnt] of Object.entries(cc)) {
		if (!cnt) continue;
		const p = Math.round((cnt / mc) * 100),
			cl = CATEGORY_COLORS[cat] || "bg-gray-400";
		ch += `<div class="flex items-center gap-3"><span class="card-meta text-xs font-medium w-24">${cat}</span><div class="flex-1 chart-track rounded-full h-6 overflow-hidden"><div class="chart-bar ${cl} h-full" style="width:${p}%"></div></div><span class="card-meta text-xs font-bold w-6 text-right">${cnt}</span></div>`;
	}
	document.getElementById("report-category").innerHTML =
		ch || emptyState("📭 No category data");
}

// ─── Calendar ────────────────────────────────────────────────
async function renderCalendar() {
	const y = calendarMonth.getFullYear(),
		mo = calendarMonth.getMonth(),
		td = todayStr();
	const mn = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	document.getElementById("cal-month-label").textContent = `${mn[mo]} ${y}`;
	const all = await getAllTasks(),
		tbd = {};
	all.forEach((t) => {
		if (!tbd[t.dateAssigned]) tbd[t.dateAssigned] = [];
		tbd[t.dateAssigned].push(t);
	});
	let h = "";
	["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((d) => {
		h += `<div class="calendar-header-cell">${d}</div>`;
	});
	const fd = new Date(y, mo, 1).getDay(),
		so = fd === 0 ? 6 : fd - 1,
		tds = new Date(y, mo + 1, 0).getDate(),
		tc = Math.ceil((so + tds) / 7) * 7;
	for (let i = 0; i < tc; i++) {
		const dn = i - so + 1;
		let cd,
			om = false;
		if (dn < 1) {
			const d = new Date(y, mo, dn);
			cd = toDateStr(d);
			om = true;
		} else if (dn > tds) {
			const d = new Date(y, mo, dn);
			cd = toDateStr(d);
			om = true;
		} else {
			cd = `${y}-${String(mo + 1).padStart(2, "0")}-${String(dn).padStart(2, "0")}`;
		}
		const it = cd === td,
			is = cd === selectedCalDay,
			dd = new Date(cd + "T00:00:00").getDate();
		let cl = "calendar-cell";
		if (it) cl += " today";
		if (om) cl += " other-month";
		if (is) cl += " selected";
		const dt = tbd[cd] || [];
		let dh = "";
		const mx = 6;
		dt.slice(0, mx).forEach((t) => {
			dh += `<span class="calendar-dot ${getStatusDotClass(t.status)}"></span>`;
		});
		if (dt.length > mx)
			dh += `<span class="card-meta" style="font-size:.6rem;font-weight:700">+${dt.length - mx}</span>`;
		const ch = dt.length
			? `<span class="calendar-task-count">${dt.length} task${dt.length !== 1 ? "s" : ""}</span>`
			: "";
		h += `<div class="${cl}" data-date="${cd}"><span class="calendar-day-number">${dd}</span><div class="calendar-dots">${dh}</div>${ch}</div>`;
	}
	document.getElementById("calendar-grid").innerHTML = h;
	document.querySelectorAll(".calendar-cell").forEach((c) => {
		c.addEventListener("click", () => {
			document
				.querySelectorAll(".calendar-cell.selected")
				.forEach((x) => x.classList.remove("selected"));
			c.classList.add("selected");
			selectedCalDay = c.dataset.date;
			showDayDetail(c.dataset.date);
		});
	});
}
async function showDayDetail(ds) {
	const t = await getTasksByDate(ds),
		p = document.getElementById("day-detail-panel");
	p.style.display = "block";
	document.getElementById("day-detail-title").textContent =
		`${formatDate(ds)} — ${t.length} task${t.length !== 1 ? "s" : ""}`;
	document.getElementById("day-detail-tasks").innerHTML = t.length
		? `<div class="compact-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">${t.map(renderCompactCard).join("")}</div>`
		: emptyState("📭 No tasks on this day");
	p.scrollIntoView({ behavior: "smooth", block: "start" });
}
function closeDayDetail() {
	document.getElementById("day-detail-panel").style.display = "none";
	selectedCalDay = null;
	document
		.querySelectorAll(".calendar-cell.selected")
		.forEach((c) => c.classList.remove("selected"));
}

// ─── Carry Forward ───────────────────────────────────────────
async function carryForward() {
	try {
		const pd = getPreviousDay(currentDate),
			pt = await getTasksByDate(pd),
			tc = pt.filter(
				(t) =>
					["In Progress", "Pending", "On Hold"].includes(t.status) &&
					t.carryForward,
			);
		if (!tc.length) {
			showToast("No tasks to carry forward", "info");
			return;
		}
		const tt = await getTasksByDate(currentDate),
			ac = tt.filter((t) => t.carriedFrom === pd).map((t) => t.title);
		let ctr = (await getSetting("taskCounter")) || 0,
			carried = 0;
		for (const t of tc) {
			if (ac.includes(t.title)) continue;
			ctr++;
			await addTask({
				taskId: generateTaskId(ctr),
				title: t.title,
				category: t.category,
				priority: t.priority,
				status: t.status,
				assignedTo: t.assignedTo,
				dueDate: t.dueDate,
				estimatedHours: t.estimatedHours,
				actualHours: 0,
				notes: t.notes,
				carriedFrom: pd,
				carryForward: true,
				dateAssigned: currentDate,
				createdAt: nowISO(),
				updatedAt: nowISO(),
			});
			carried++;
		}
		await setSetting("taskCounter", ctr);
		await setSetting("lastCarryForwardDate", currentDate);
		if (carried > 0)
			showToast(
				`⚡ Carried forward ${carried} task${carried !== 1 ? "s" : ""}`,
				"success",
			);
		else showToast("Already carried forward", "info");
		await renderProductivity();
	} catch (e) {
		console.error(e);
		showToast("Carry forward failed", "error");
	}
}
async function autoCarryForward() {
	const l = await getSetting("lastCarryForwardDate");
	if (!l || l < todayStr()) await carryForward();
}

// ─── Theme ───────────────────────────────────────────────────
function initTheme() {
	const s = localStorage.getItem("taskboard-theme"),
		b = document.getElementById("btn-theme-toggle");
	if (s === "light") {
		document.body.classList.remove("dark");
		b.textContent = "☀️";
	} else {
		document.body.classList.add("dark");
		b.textContent = "🌙";
	}
}
function toggleTheme() {
	const b = document.getElementById("btn-theme-toggle");
	document.body.classList.toggle("dark");
	const d = document.body.classList.contains("dark");
	b.textContent = d ? "🌙" : "☀️";
	localStorage.setItem("taskboard-theme", d ? "dark" : "light");
}

// ─── Task Modal ──────────────────────────────────────────────
function openTaskModal(id = null) {
	const m = document.getElementById("task-modal"),
		t = document.getElementById("modal-title");
	document.getElementById("task-form").reset();
	document.getElementById("form-taskId").value = "";
	document.getElementById("form-assignedTo").value = "Ashish Moghe";
	document.getElementById("form-dueDate").value = currentDate;
	document.getElementById("form-carryForward").checked = true;
	document.getElementById("form-priority").value = "Medium";
	document.getElementById("form-status").value = "In Progress";
	document.getElementById("form-category").value = "Development";
	if (id) {
		t.textContent = "Edit Task";
		getTask(id).then((task) => {
			if (!task) return;
			document.getElementById("form-taskId").value = task.taskId;
			document.getElementById("form-title").value = task.title;
			document.getElementById("form-category").value = task.category;
			document.getElementById("form-priority").value = task.priority;
			document.getElementById("form-status").value = task.status;
			document.getElementById("form-assignedTo").value =
				task.assignedTo || "Ashish Moghe";
			document.getElementById("form-dueDate").value = task.dueDate || "";
			document.getElementById("form-estimatedHours").value =
				task.estimatedHours || "";
			document.getElementById("form-actualHours").value =
				task.actualHours || "";
			document.getElementById("form-notes").value = task.notes || "";
			document.getElementById("form-carryForward").checked =
				!!task.carryForward;
		});
	} else t.textContent = "Add Task";
	m.classList.add("open");
}
function closeTaskModal() {
	document.getElementById("task-modal").classList.remove("open");
}
async function saveTask() {
	const title = document.getElementById("form-title").value.trim();
	if (!title) {
		showToast("Title required", "error");
		return;
	}
	const eid = document.getElementById("form-taskId").value,
		data = {
			title,
			category: document.getElementById("form-category").value,
			priority: document.getElementById("form-priority").value,
			status: document.getElementById("form-status").value,
			assignedTo:
				document.getElementById("form-assignedTo").value.trim() ||
				"Ashish Moghe",
			dueDate: document.getElementById("form-dueDate").value,
			estimatedHours:
				parseFloat(
					document.getElementById("form-estimatedHours").value,
				) || 0,
			actualHours:
				parseFloat(document.getElementById("form-actualHours").value) ||
				0,
			notes: document.getElementById("form-notes").value.trim(),
			carryForward: document.getElementById("form-carryForward").checked,
			updatedAt: nowISO(),
		};
	try {
		if (eid) {
			const ex = await getTask(eid);
			Object.assign(ex, data);
			await updateTask(ex);
			showToast("✏️ Task updated", "success");
		} else {
			let c = (await getSetting("taskCounter")) || 0;
			c++;
			data.taskId = generateTaskId(c);
			data.dateAssigned = currentDate;
			data.carriedFrom = "";
			data.createdAt = nowISO();
			await addTask(data);
			await setSetting("taskCounter", c);
			showToast("✅ Task created", "success");
		}
		closeTaskModal();
		await refreshActiveView();
	} catch (e) {
		console.error(e);
		showToast("Save failed", "error");
	}
}
function openDeleteModal(id) {
	document.getElementById("delete-taskId").value = id;
	document.getElementById("delete-modal").classList.add("open");
}
function closeDeleteModal() {
	document.getElementById("delete-modal").classList.remove("open");
}
async function confirmDelete() {
	const id = document.getElementById("delete-taskId").value;
	try {
		await deleteTask(id);
		closeDeleteModal();
		showToast("🗑️ Task deleted", "success");
		await refreshActiveView();
	} catch (e) {
		console.error(e);
		showToast("Delete failed", "error");
	}
}
async function refreshActiveView() {
	if (activeTab === "productivity") await renderProductivity();
	else if (activeTab === "reports") await renderReports();
	else if (activeTab === "calendar") {
		await renderCalendar();
		if (selectedCalDay) await showDayDetail(selectedCalDay);
	}
}

// ─── Task Import/Export ──────────────────────────────────────
async function exportData() {
	try {
		const t = await getAllTasks();
		const b = new Blob(
			[
				JSON.stringify(
					{ version: "1.0", exportDate: nowISO(), tasks: t },
					null,
					2,
				),
			],
			{ type: "application/json" },
		);
		const a = document.createElement("a");
		a.href = URL.createObjectURL(b);
		a.download = `taskboard-export-${todayStr()}.json`;
		a.click();
		URL.revokeObjectURL(a.href);
		showToast("📦 Data exported", "success");
	} catch (e) {
		showToast("Export failed", "error");
	}
}
function handleImportFile(e) {
	const f = e.target.files[0];
	if (!f) return;
	const r = new FileReader();
	r.onload = (ev) => {
		try {
			const d = JSON.parse(ev.target.result);
			if (!d.tasks || !Array.isArray(d.tasks)) {
				showToast("Invalid file", "error");
				return;
			}
			importedData = d;
			document.getElementById("import-modal").classList.add("open");
		} catch {
			showToast("Invalid JSON", "error");
		}
	};
	r.readAsText(f);
	e.target.value = "";
}
async function importReplace() {
	if (!importedData) return;
	try {
		await clearAllTasks();
		for (const t of importedData.tasks) await addTask(t);
		const mx = importedData.tasks.reduce((m, t) => {
			const n = parseInt(t.taskId.replace("T-", ""), 10);
			return n > m ? n : m;
		}, 0);
		await setSetting("taskCounter", mx);
		closeImportModal();
		showToast(`🔄 Replaced ${importedData.tasks.length} tasks`, "success");
		importedData = null;
		await refreshActiveView();
	} catch (e) {
		showToast("Import failed", "error");
	}
}
async function importMerge() {
	if (!importedData) return;
	try {
		let a = 0,
			s = 0;
		for (const t of importedData.tasks) {
			if (await getTask(t.taskId)) s++;
			else {
				await addTask(t);
				a++;
			}
		}
		const all = await getAllTasks(),
			mx = all.reduce((m, t) => {
				const n = parseInt(t.taskId.replace("T-", ""), 10);
				return n > m ? n : m;
			}, 0);
		await setSetting("taskCounter", mx);
		closeImportModal();
		showToast(`🔀 ${a} added, ${s} skipped`, "success");
		importedData = null;
		await refreshActiveView();
	} catch (e) {
		showToast("Import failed", "error");
	}
}
function closeImportModal() {
	document.getElementById("import-modal").classList.remove("open");
}
async function quickStatusChange(id, st) {
	try {
		const t = await getTask(id);
		if (!t) return;
		t.status = st;
		t.updatedAt = nowISO();
		await updateTask(t);
		showToast(`Status → ${st}`, "info");
		await refreshActiveView();
	} catch (e) {
		showToast("Status update failed", "error");
	}
}
// ─── Tab Switching ───────────────────────────────────────────
function switchTab(tab) {
	activeTab = tab;
	document
		.querySelectorAll(".tab-btn")
		.forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
	["productivity", "reports", "calendar", "reminders"].forEach((t) => {
		const el = document.getElementById("tab-" + t);
		if (el) el.classList.toggle("hidden", t !== tab);
	});
	if (tab === "reports") renderReports();
	if (tab === "calendar") renderCalendar();
	if (tab === "reminders") Rem.render();
}

// ─── Event Delegation ────────────────────────────────────────
function attachCardEvents(c) {
	c.addEventListener("change", (e) => {
		if (e.target.classList.contains("status-select"))
			quickStatusChange(e.target.dataset.taskid, e.target.value);
	});
	c.addEventListener("click", (e) => {
		const eb = e.target.closest(".btn-edit");
		if (eb) {
			openTaskModal(eb.dataset.taskid);
			return;
		}
		const db = e.target.closest(".btn-delete");
		if (db) {
			openDeleteModal(db.dataset.taskid);
			return;
		}
		const cc = e.target.closest(".compact-card");
		if (cc) openTaskModal(cc.dataset.taskid);
	});
}

// ============================================================
//  REMINDERS MODULE — Fully Isolated
// ============================================================
const Rem = {
	db: null,
	importedData: null,
	engineInterval: null,

	// ─── DB ────────────────────────────────────────────────────
	initDB() {
		return new Promise((res, rej) => {
			const r = indexedDB.open("TaskBoardRemindersDB", 1);
			r.onupgradeneeded = (e) => {
				const d = e.target.result;
				if (!d.objectStoreNames.contains("reminders")) {
					const s = d.createObjectStore("reminders", {
						keyPath: "reminderId",
					});
					s.createIndex("status", "status", { unique: false });
					s.createIndex("reminderTime", "reminderTime", {
						unique: false,
					});
				}
				if (!d.objectStoreNames.contains("settings"))
					d.createObjectStore("settings", { keyPath: "key" });
			};
			r.onsuccess = (e) => {
				Rem.db = e.target.result;
				res(Rem.db);
			};
			r.onerror = (e) => rej(e.target.error);
		});
	},
	_tx(s, m = "readonly") {
		return Rem.db.transaction(s, m).objectStore(s);
	},
	addReminder(r) {
		return new Promise((a, j) => {
			const q = Rem._tx("reminders", "readwrite").put(r);
			q.onsuccess = () => a(q.result);
			q.onerror = () => j(q.error);
		});
	},
	getReminder(id) {
		return new Promise((a, j) => {
			const q = Rem._tx("reminders").get(id);
			q.onsuccess = () => a(q.result);
			q.onerror = () => j(q.error);
		});
	},
	getAllReminders() {
		return new Promise((a, j) => {
			const q = Rem._tx("reminders").getAll();
			q.onsuccess = () => a(q.result || []);
			q.onerror = () => j(q.error);
		});
	},
	deleteRem(id) {
		return new Promise((a, j) => {
			const q = Rem._tx("reminders", "readwrite").delete(id);
			q.onsuccess = () => a();
			q.onerror = () => j(q.error);
		});
	},
	clearAll() {
		return new Promise((a, j) => {
			const q = Rem._tx("reminders", "readwrite").clear();
			q.onsuccess = () => a();
			q.onerror = () => j(q.error);
		});
	},
	getSetting(k) {
		return new Promise((a, j) => {
			const q = Rem._tx("settings").get(k);
			q.onsuccess = () => a(q.result ? q.result.value : null);
			q.onerror = () => j(q.error);
		});
	},
	setSetting(k, v) {
		return new Promise((a, j) => {
			const q = Rem._tx("settings", "readwrite").put({
				key: k,
				value: v,
			});
			q.onsuccess = () => a();
			q.onerror = () => j(q.error);
		});
	},

	// ─── Helpers ───────────────────────────────────────────────
	genId(n) {
		return "R-" + String(n).padStart(3, "0");
	},
	fmtTime(iso) {
		if (!iso) return "—";
		const d = new Date(iso);
		return (
			d.toLocaleDateString("en-US", { month: "short", day: "2-digit" }) +
			", " +
			d.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})
		);
	},
	escHtml(s) {
		if (!s) return "";
		return s
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;");
	},
	nowISO() {
		return new Date().toISOString();
	},

	// ─── Rendering ─────────────────────────────────────────────
	async render() {
		const all = await this.getAllReminders(),
			now = new Date();
		const active = all.filter(
			(r) => r.status === "active" || r.status === "snoozed",
		);
		const overdue = all.filter((r) => r.status === "overdue");
		const completed = all.filter((r) => r.status === "completed");
		document.getElementById("rem-stats").innerHTML =
			`<div class="rem-stat-pill">🔔 Active: ${active.length}</div><div class="rem-stat-pill">⚠️ Overdue: ${overdue.length}</div><div class="rem-stat-pill">✅ Done: ${completed.length}</div><div class="rem-stat-pill">📊 Total: ${all.length}</div>`;
		const g = document.getElementById("rem-active-grid");
		g.innerHTML = active.length
			? active.map((r) => this.renderCard(r, now)).join("")
			: '<div class="empty-state">🔔 No active reminders. Create one!</div>';
		document.getElementById("rem-overdue-tbody").innerHTML = overdue.length
			? overdue.map((r) => this.renderOverdueRow(r)).join("")
			: '<tr><td colspan="4" style="text-align:center;padding:1.5rem;color:#64748b">No overdue reminders</td></tr>';
		document.getElementById("rem-overdue-count").textContent =
			overdue.length;
		document.getElementById("rem-completed-tbody").innerHTML =
			completed.length
				? completed.map((r) => this.renderCompletedRow(r)).join("")
				: '<tr><td colspan="4" style="text-align:center;padding:1.5rem;color:#64748b">No completed reminders</td></tr>';
		document.getElementById("rem-completed-count").textContent =
			completed.length;
	},

	renderCard(r, now) {
		const rt = new Date(r.reminderTime),
			lead = (r.fireCount || 1) * (r.fireInterval || 30) * 1000,
			startAt = new Date(rt.getTime() - lead),
			diffStart = startAt - now;
		let urg = "rc-scheduled";
		if (r.status === "snoozed") urg = "rc-snoozed";
		else if (now >= startAt && (r.firedCount || 0) > 0) urg = "rc-firing";
		else if (diffStart <= 30 * 60 * 1000 && diffStart > 0) urg = "rc-soon";
		else if (now >= startAt) urg = "rc-firing";

		const desc = r.description
			? `<p class="rc-desc line-clamp-2">${this.escHtml(r.description)}</p>`
			: "";
		const rud = r.remindUntilDone
			? '<span class="rud-badge">🔁 Until Done</span>'
			: "";
		const fb = `<span class="fire-badge">🔔 ${r.firedCount || 0}/${r.remindUntilDone ? "∞" : r.fireCount}</span>`;
		const sb = r.soundName
			? `<span class="sound-badge">🔊 ${this.escHtml(r.soundName)}</span>`
			: "";
		const si =
			r.status === "snoozed" && r.snoozedUntil
				? `<span>💤 Until ${this.fmtTime(r.snoozedUntil)}</span>`
				: "";
		return `<div class="reminder-card ${urg}" data-remid="${r.reminderId}"><div class="rc-title">${this.escHtml(r.title)}</div>${desc}<div class="rc-meta"><span>⏰ ${this.fmtTime(r.reminderTime)}</span>${si}</div><div class="rc-meta">${fb} ${rud} ${sb}</div><div class="rc-actions"><button class="rem-action-btn" onclick="Rem.completeReminder('${r.reminderId}')" title="Complete">✅</button><select class="snooze-select" onchange="Rem.snoozeReminder('${r.reminderId}',this.value);this.selectedIndex=0"><option value="">💤 Snooze</option><option value="5">5 min</option><option value="10">10 min</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">1 hour</option></select><button class="rem-action-btn" onclick="Rem.openModal('${r.reminderId}')" title="Edit">✏️</button><button class="rem-action-btn danger" onclick="Rem.openDeleteModal('${r.reminderId}')" title="Delete">🗑️</button></div></div>`;
	},

	renderOverdueRow(r) {
		return `<tr><td class="td-title">${this.escHtml(r.title)}</td><td class="td-time">${this.fmtTime(r.reminderTime)}</td><td><span class="fire-badge">🔔 ${r.firedCount || 0}/${r.fireCount}</span></td><td><button class="rem-action-btn" onclick="Rem.completeReminder('${r.reminderId}')" title="Complete">✅</button><select class="snooze-select" onchange="Rem.snoozeReminder('${r.reminderId}',this.value);this.selectedIndex=0"><option value="">💤</option><option value="5">5m</option><option value="10">10m</option><option value="30">30m</option><option value="60">1h</option></select><button class="rem-action-btn danger" onclick="Rem.openDeleteModal('${r.reminderId}')" title="Delete">🗑️</button></td></tr>`;
	},
	renderCompletedRow(r) {
		return `<tr><td class="td-title">${this.escHtml(r.title)}</td><td class="td-time">${this.fmtTime(r.reminderTime)}</td><td class="td-time">${r.completedAt ? this.fmtTime(r.completedAt) : "—"}</td><td><button class="rem-action-btn danger" onclick="Rem.openDeleteModal('${r.reminderId}')" title="Delete">🗑️</button></td></tr>`;
	},

	// ─── Notification Engine ───────────────────────────────────
	startEngine() {
		this.engineInterval = setInterval(() => this.tick(), 1000);
		this.tick();
	},
	async tick() {
		const all = await this.getAllReminders(),
			now = new Date();
		let changed = false;
		for (const r of all) {
			if (
				r.status === "snoozed" &&
				r.snoozedUntil &&
				new Date(r.snoozedUntil) <= now
			) {
				r.status = "active";
				r.snoozedUntil = null;
				r.updatedAt = this.nowISO();
				await this.addReminder(r);
				changed = true;
				continue;
			}
			if (r.status === "active") {
				const rt = new Date(r.reminderTime);
				const lead = (r.fireCount || 1) * (r.fireInterval || 30) * 1000;
				const startAt = new Date(rt.getTime() - lead);
				if (now >= startAt) {
					const shouldFire =
						r.remindUntilDone || (r.firedCount || 0) < r.fireCount;
					if (shouldFire) {
						const lf = r.lastFiredAt
							? new Date(r.lastFiredAt)
							: new Date(0);
						const el = (now - lf) / 1000;
						if (el >= (r.fireInterval || 30)) {
							this.fireNotification(r);
							this.playSound(
								"/Resources/reminder.mp3" ||
									r.soundUrl,
							);
							r.firedCount = (r.firedCount || 0) + 1;
							r.lastFiredAt = this.nowISO();
							r.updatedAt = this.nowISO();
							await this.addReminder(r);
							changed = true;
						}
					} else if (
						!r.remindUntilDone &&
						(r.firedCount || 0) >= r.fireCount &&
						now >= rt
					) {
						r.status = "overdue";
						r.updatedAt = this.nowISO();
						await this.addReminder(r);
						changed = true;
					}
				}
			}
		}
		if (changed && activeTab === "reminders") this.render();
	},

	fireNotification(r) {
		if (
			typeof Notification !== "undefined" &&
			Notification.permission === "granted"
		) {
			const rt = new Date(r.reminderTime),
				diff = Math.round((rt - new Date()) / 60000);
			const timeInfo = diff <= 0 ? "⏰ Now!" : "⏰ In " + diff + " min";
			const body = (r.description ? r.description + "\n" : "") + timeInfo;
			new Notification("🔔 " + r.title, {
				body,
				tag: r.reminderId + "-" + (r.firedCount || 0),
				requireInteraction: true,
			});
		}
	},

	// ─── Sound ─────────────────────────────────────────────────
	playSound(url) {
		try {
			if (url) {
				const a = new Audio(url);
				a.volume = 0.7;
				a.play().catch(() => {});
			} else this.playDefaultBeep();
		} catch (e) {
			console.warn("Sound error:", e);
		}
	},
	playDefaultBeep() {
		try {
			const c = new (window.AudioContext || window.webkitAudioContext)(),
				o = c.createOscillator(),
				g = c.createGain();
			o.connect(g);
			g.connect(c.destination);
			o.frequency.value = 440;
			o.type = "sine";
			g.gain.value = 0.3;
			o.start();
			o.stop(c.currentTime + 0.2);
			setTimeout(() => {
				try {
					const o2 = c.createOscillator(),
						g2 = c.createGain();
					o2.connect(g2);
					g2.connect(c.destination);
					o2.frequency.value = 880;
					o2.type = "sine";
					g2.gain.value = 0.3;
					o2.start();
					o2.stop(c.currentTime + 0.15);
				} catch (e) {}
			}, 250);
		} catch (e) {}
	},

	// ─── Permission ────────────────────────────────────────────
	checkNotifPerm() {
		const b = document.getElementById("notif-banner");
		if (
			!("Notification" in window) ||
			Notification.permission === "granted"
		)
			b.style.display = "none";
		else b.style.display = "flex";
	},
	async requestNotifPerm() {
		if ("Notification" in window) {
			const p = await Notification.requestPermission();
			this.checkNotifPerm();
			if (p === "granted")
				showToast("🔔 Notifications enabled!", "success");
		}
	},

	// ─── Actions ───────────────────────────────────────────────
	async completeReminder(id) {
		const r = await this.getReminder(id);
		if (!r) return;
		r.status = "completed";
		r.completedAt = this.nowISO();
		r.updatedAt = this.nowISO();
		await this.addReminder(r);
		showToast("✅ Reminder completed", "success");
		this.render();
	},
	async snoozeReminder(id, min) {
		if (!min) return;
		const r = await this.getReminder(id);
		if (!r) return;
		r.status = "snoozed";
		r.snoozedUntil = new Date(
			Date.now() + parseInt(min) * 60000,
		).toISOString();
		r.updatedAt = this.nowISO();
		await this.addReminder(r);
		showToast(`💤 Snoozed for ${min} min`, "info");
		this.render();
	},

	// ─── Modal ─────────────────────────────────────────────────
	async openModal(id = null) {
		const m = document.getElementById("rem-modal"),
			t = document.getElementById("rem-modal-title");
		document.getElementById("rem-form").reset();
		document.getElementById("rem-form-id").value = "";
		document.getElementById("rem-form-sound-url").value = "";
		document.getElementById("rem-form-sound-name-val").value = "";
		document.getElementById("rem-sound-name").textContent = "";
		document.getElementById("rem-sound-label").textContent =
			"Click to upload audio";
		document.getElementById("rem-form-fires").value = 1;
		document.getElementById("rem-form-interval").value = 30;
		if (id) {
			t.textContent = "Edit Reminder";
			const r = await this.getReminder(id);
			if (r) {
				document.getElementById("rem-form-id").value = r.reminderId;
				document.getElementById("rem-form-title").value = r.title;
				document.getElementById("rem-form-desc").value =
					r.description || "";
				document.getElementById("rem-form-time").value = r.reminderTime
					? r.reminderTime.slice(0, 16)
					: "";
				document.getElementById("rem-form-fires").value =
					r.fireCount || 1;
				document.getElementById("rem-form-interval").value =
					r.fireInterval || 30;
				document.getElementById("rem-form-rud").checked =
					!!r.remindUntilDone;
				if (r.soundUrl) {
					document.getElementById("rem-form-sound-url").value =
						r.soundUrl;
					document.getElementById("rem-form-sound-name-val").value =
						r.soundName || "";
					document.getElementById("rem-sound-name").textContent =
						r.soundName || "Custom sound";
					document.getElementById("rem-sound-label").textContent =
						"Sound loaded:";
				}
			}
		} else {
			t.textContent = "Add Reminder";
			const d = new Date(Date.now() + 3600000),
				iso =
					d.getFullYear() +
					"-" +
					String(d.getMonth() + 1).padStart(2, "0") +
					"-" +
					String(d.getDate()).padStart(2, "0") +
					"T" +
					String(d.getHours()).padStart(2, "0") +
					":" +
					String(d.getMinutes()).padStart(2, "0");
			document.getElementById("rem-form-time").value = iso;
		}
		m.classList.add("open");
	},
	closeModal() {
		document.getElementById("rem-modal").classList.remove("open");
	},
	async saveReminder() {
		const title = document.getElementById("rem-form-title").value.trim(),
			time = document.getElementById("rem-form-time").value;
		if (!title) {
			showToast("Title required", "error");
			return;
		}
		if (!time) {
			showToast("Time required", "error");
			return;
		}
		const eid = document.getElementById("rem-form-id").value,
			data = {
				title,
				description: document
					.getElementById("rem-form-desc")
					.value.trim(),
				reminderTime: new Date(time).toISOString(),
				fireCount: Math.min(
					20,
					Math.max(
						1,
						parseInt(
							document.getElementById("rem-form-fires").value,
						) || 1,
					),
				),
				fireInterval: Math.min(
					300,
					Math.max(
						10,
						parseInt(
							document.getElementById("rem-form-interval").value,
						) || 30,
					),
				),
				remindUntilDone:
					document.getElementById("rem-form-rud").checked,
				soundUrl: document.getElementById("rem-form-sound-url").value,
				soundName: document.getElementById("rem-form-sound-name-val")
					.value,
				updatedAt: this.nowISO(),
			};
		try {
			if (eid) {
				const ex = await this.getReminder(eid);
				Object.assign(ex, data);
				await this.addReminder(ex);
				showToast("✏️ Reminder updated", "success");
			} else {
				let c = (await this.getSetting("remCounter")) || 0;
				c++;
				data.reminderId = this.genId(c);
				data.firedCount = 0;
				data.lastFiredAt = null;
				data.status = "active";
				data.snoozedUntil = null;
				data.completedAt = null;
				data.createdAt = this.nowISO();
				await this.addReminder(data);
				await this.setSetting("remCounter", c);
				showToast("✅ Reminder created", "success");
			}
			this.closeModal();
			this.render();
		} catch (e) {
			console.error(e);
			showToast("Save failed", "error");
		}
	},

	// ─── Delete ────────────────────────────────────────────────
	openDeleteModal(id) {
		document.getElementById("rem-delete-id").value = id;
		document.getElementById("rem-delete-modal").classList.add("open");
	},
	closeDeleteModal() {
		document.getElementById("rem-delete-modal").classList.remove("open");
	},
	async confirmDelete() {
		const id = document.getElementById("rem-delete-id").value;
		try {
			await this.deleteRem(id);
			this.closeDeleteModal();
			showToast("🗑️ Reminder deleted", "success");
			this.render();
		} catch (e) {
			console.error(e);
			showToast("Delete failed", "error");
		}
	},

	// ─── Import/Export ─────────────────────────────────────────
	async exportData() {
		try {
			const a = await this.getAllReminders();
			const b = new Blob(
				[
					JSON.stringify(
						{
							version: "1.0",
							type: "reminders",
							exportDate: this.nowISO(),
							reminders: a,
						},
						null,
						2,
					),
				],
				{ type: "application/json" },
			);
			const l = document.createElement("a");
			l.href = URL.createObjectURL(b);
			l.download = `reminders-export-${todayStr()}.json`;
			l.click();
			URL.revokeObjectURL(l.href);
			showToast("📦 Reminders exported", "success");
		} catch (e) {
			showToast("Export failed", "error");
		}
	},
	handleImport(e) {
		const f = e.target.files[0];
		if (!f) return;
		const r = new FileReader();
		r.onload = (ev) => {
			try {
				const d = JSON.parse(ev.target.result);
				if (!d.reminders || !Array.isArray(d.reminders)) {
					showToast("Invalid file", "error");
					return;
				}
				Rem.importedData = d;
				document
					.getElementById("rem-import-modal")
					.classList.add("open");
			} catch {
				showToast("Invalid JSON", "error");
			}
		};
		r.readAsText(f);
		e.target.value = "";
	},
	async importReplace() {
		if (!this.importedData) return;
		try {
			await this.clearAll();
			for (const r of this.importedData.reminders)
				await this.addReminder(r);
			const mx = this.importedData.reminders.reduce((m, r) => {
				const n = parseInt(r.reminderId.replace("R-", ""), 10);
				return n > m ? n : m;
			}, 0);
			await this.setSetting("remCounter", mx);
			this.closeImportModal();
			showToast(
				`🔄 Replaced ${this.importedData.reminders.length} reminders`,
				"success",
			);
			this.importedData = null;
			this.render();
		} catch (e) {
			showToast("Import failed", "error");
		}
	},
	async importMerge() {
		if (!this.importedData) return;
		try {
			let a = 0,
				s = 0;
			for (const r of this.importedData.reminders) {
				if (await this.getReminder(r.reminderId)) s++;
				else {
					await this.addReminder(r);
					a++;
				}
			}
			const all = await this.getAllReminders(),
				mx = all.reduce((m, r) => {
					const n = parseInt(r.reminderId.replace("R-", ""), 10);
					return n > m ? n : m;
				}, 0);
			await this.setSetting("remCounter", mx);
			this.closeImportModal();
			showToast(`🔀 ${a} added, ${s} skipped`, "success");
			this.importedData = null;
			this.render();
		} catch (e) {
			showToast("Import failed", "error");
		}
	},
	closeImportModal() {
		document.getElementById("rem-import-modal").classList.remove("open");
	},

	// ─── Accordion ─────────────────────────────────────────────
	toggleAccordion(id) {
		document.getElementById(id).classList.toggle("open");
	},
};

// ─── Init ────────────────────────────────────────────────────
async function init() {
	try {
		initTheme();
		await initDB();
		await Rem.initDB();
		await autoCarryForward();
		document.getElementById("date-picker").value = currentDate;
		await renderProductivity();
		Rem.checkNotifPerm();
		Rem.startEngine();

		// Theme
		document
			.getElementById("btn-theme-toggle")
			.addEventListener("click", toggleTheme);
		// Tabs
		document
			.querySelectorAll(".tab-btn")
			.forEach((b) =>
				b.addEventListener("click", () => switchTab(b.dataset.tab)),
			);
		// Date nav
		document
			.getElementById("btn-prev-day")
			.addEventListener("click", async () => {
				currentDate = getPreviousDay(currentDate);
				await renderProductivity();
			});
		document
			.getElementById("btn-next-day")
			.addEventListener("click", async () => {
				currentDate = getNextDay(currentDate);
				await renderProductivity();
			});
		document
			.getElementById("btn-today")
			.addEventListener("click", async () => {
				currentDate = todayStr();
				await renderProductivity();
			});
		document
			.getElementById("date-picker")
			.addEventListener("change", async (e) => {
				if (e.target.value) {
					currentDate = e.target.value;
					await renderProductivity();
				}
			});
		// Task modal
		document
			.getElementById("btn-new-task")
			.addEventListener("click", () => openTaskModal());
		document
			.getElementById("btn-save-task")
			.addEventListener("click", (e) => {
				e.preventDefault();
				saveTask();
			});
		document
			.getElementById("btn-cancel-task")
			.addEventListener("click", closeTaskModal);
		document
			.getElementById("modal-close")
			.addEventListener("click", closeTaskModal);
		// Delete modal
		document
			.getElementById("btn-confirm-delete")
			.addEventListener("click", confirmDelete);
		document
			.getElementById("btn-cancel-delete")
			.addEventListener("click", closeDeleteModal);
		// Carry forward
		document
			.getElementById("btn-carry-forward")
			.addEventListener("click", carryForward);
		// Task import/export
		document
			.getElementById("btn-export")
			.addEventListener("click", exportData);
		document
			.getElementById("btn-import")
			.addEventListener("click", () =>
				document.getElementById("import-file-input").click(),
			);
		document
			.getElementById("import-file-input")
			.addEventListener("change", handleImportFile);
		document
			.getElementById("btn-import-replace")
			.addEventListener("click", importReplace);
		document
			.getElementById("btn-import-merge")
			.addEventListener("click", importMerge);
		document
			.getElementById("btn-cancel-import")
			.addEventListener("click", closeImportModal);
		// Card delegation
		[
			"cards-inprogress",
			"cards-completed",
			"cards-pending",
			"cards-upcoming",
		].forEach((id) => attachCardEvents(document.getElementById(id)));
		attachCardEvents(document.getElementById("day-detail-tasks"));
		// Calendar
		document
			.getElementById("btn-cal-prev")
			.addEventListener("click", () => {
				calendarMonth.setMonth(calendarMonth.getMonth() - 1);
				closeDayDetail();
				renderCalendar();
			});
		document
			.getElementById("btn-cal-next")
			.addEventListener("click", () => {
				calendarMonth.setMonth(calendarMonth.getMonth() + 1);
				closeDayDetail();
				renderCalendar();
			});
		document
			.getElementById("day-detail-close")
			.addEventListener("click", closeDayDetail);

		// ─── Reminder Event Listeners ────────────────────────────
		document
			.getElementById("btn-new-reminder")
			.addEventListener("click", () => Rem.openModal());
		document
			.getElementById("rem-btn-save")
			.addEventListener("click", (e) => {
				e.preventDefault();
				Rem.saveReminder();
			});
		document
			.getElementById("rem-btn-cancel")
			.addEventListener("click", () => Rem.closeModal());
		document
			.getElementById("rem-modal-close")
			.addEventListener("click", () => Rem.closeModal());
		document
			.getElementById("rem-btn-confirm-del")
			.addEventListener("click", () => Rem.confirmDelete());
		document
			.getElementById("rem-btn-cancel-del")
			.addEventListener("click", () => Rem.closeDeleteModal());
		document
			.getElementById("btn-rem-export")
			.addEventListener("click", () => Rem.exportData());
		document
			.getElementById("btn-rem-import")
			.addEventListener("click", () =>
				document.getElementById("rem-import-file").click(),
			);
		document
			.getElementById("rem-import-file")
			.addEventListener("change", (e) => Rem.handleImport(e));
		document
			.getElementById("rem-btn-import-replace")
			.addEventListener("click", () => Rem.importReplace());
		document
			.getElementById("rem-btn-import-merge")
			.addEventListener("click", () => Rem.importMerge());
		document
			.getElementById("rem-btn-cancel-import")
			.addEventListener("click", () => Rem.closeImportModal());
		// Sound file upload
		document
			.getElementById("rem-form-sound-file")
			.addEventListener("change", (e) => {
				const f = e.target.files[0];
				if (!f) return;
				const r = new FileReader();
				r.onload = (ev) => {
					document.getElementById("rem-form-sound-url").value =
						ev.target.result;
					document.getElementById("rem-form-sound-name-val").value =
						f.name;
					document.getElementById("rem-sound-name").textContent =
						f.name;
					document.getElementById("rem-sound-label").textContent =
						"Sound loaded:";
				};
				r.readAsDataURL(f);
				e.target.value = "";
			});

		// Keyboard
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				closeTaskModal();
				closeDeleteModal();
				closeImportModal();
				Rem.closeModal();
				Rem.closeDeleteModal();
				Rem.closeImportModal();
			}
		});
		// Backdrop clicks
		[
			"task-modal",
			"delete-modal",
			"import-modal",
			"rem-modal",
			"rem-delete-modal",
			"rem-import-modal",
		].forEach((id) => {
			document.getElementById(id).addEventListener("click", (e) => {
				if (e.target === e.currentTarget)
					e.currentTarget.classList.remove("open");
			});
		});
	} catch (e) {
		console.error("Init error:", e);
		showToast("Init failed", "error");
	}
}
init();