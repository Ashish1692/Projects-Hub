(() => {
'use strict';

/* Security architecture: external script, no HTML injection sinks, no persistent plaintext. */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const on = (target, type, handler, options) => target.addEventListener(type, handler, options);
const ITER = 600_000;
const MIN_ITER = 100_000;
const MAX_ITER = 2_000_000;
const FORMAT = 'hig-vault';
const VERSION = 1;
const AUTO_LOCK_MS = 5 * 60 * 1000;
const AUTO_LOCK_GRACE_MS = 60 * 1000;
const CLIP_CLEAR_MS = 30 * 1000;
const MAX_VAULT_BYTES = 50 * 1024 * 1024;
const MAX_IMPORT_BYTES = 10 * 1024 * 1024;
const MAX_ENTRIES = 100_000;
const IN_FRAME = (() => { try { return window.self !== window.top; } catch { return true; } })();
const CAN_PICK = 'showSaveFilePicker' in window && !IN_FRAME;
const enc = new TextEncoder();
const dec = new TextDecoder();
const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

const CATS = Object.freeze([
  { id: 'all', name: 'All Items', icon: 'grid' },
  { id: 'fav', name: 'Favorites', icon: 'star' },
  { id: 'login', name: 'Logins', icon: 'key' },
  { id: 'card', name: 'Cards', icon: 'card' },
  { id: 'note', name: 'Secure Notes', icon: 'note' },
  { id: 'wifi', name: 'Wi‑Fi', icon: 'wifi' },
  { id: 'other', name: 'Other', icon: 'folder' },
]);
const CAT_IDS = CATS.slice(2).map(category => category.id);
const catName = id => (CATS.find(category => category.id === id) || CATS[6]).name;

const state = {
  key: null,
  salt: null,
  iter: ITER,
  entries: [],
  fileHandle: null,
  pendingHandle: null,
  pendingFile: null,
  fileName: 'password-vault.json',
  dirty: false,
  filter: 'all',
  query: '',
  selectedId: null,
  editing: false,
  isNew: false,
  draft: null,
  reveal: false,
  rev: 0,
  autosave: CAN_PICK,
  lastSaved: null,
};

/* ---------- Safe DOM and SVG construction ---------- */
function append(parent, ...children) {
  for (const child of children.flat(Infinity)) {
    if (child === null || child === undefined || child === false) continue;
    parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return parent;
}

function make(tag, options = {}, ...children) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.id) element.id = options.id;
  if (options.text !== undefined) element.textContent = String(options.text);
  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      if (value !== null && value !== undefined && value !== false) element.setAttribute(name, value === true ? '' : String(value));
    }
  }
  if (options.props) Object.assign(element, options.props);
  if (options.dataset) {
    for (const [name, value] of Object.entries(options.dataset)) element.dataset[name] = String(value);
  }
  return append(element, children);
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const STAR_PATH = 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z';
const ICONS = Object.freeze({
  grid: [['rect', { x: 3, y: 3, width: 7, height: 7, rx: 1.5 }], ['rect', { x: 14, y: 3, width: 7, height: 7, rx: 1.5 }], ['rect', { x: 3, y: 14, width: 7, height: 7, rx: 1.5 }], ['rect', { x: 14, y: 14, width: 7, height: 7, rx: 1.5 }]],
  star: [['path', { d: STAR_PATH }]],
  starFill: [['path', { d: STAR_PATH, fill: 'currentColor' }]],
  key: [['circle', { cx: 8, cy: 15, r: 4 }], ['path', { d: 'M10.8 12.2L20 3M16 7l3 3M14 9l2 2' }]],
  card: [['rect', { x: 2.5, y: 5, width: 19, height: 14, rx: 2.5 }], ['path', { d: 'M2.5 10h19M6 15h4' }]],
  note: [['path', { d: 'M6 3h9l4 4v14H6z' }], ['path', { d: 'M15 3v4h4M9 12h6M9 16h6' }]],
  wifi: [['path', { d: 'M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0' }], ['circle', { cx: 12, cy: 19, r: 1, fill: 'currentColor' }]],
  folder: [['path', { d: 'M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z' }]],
  plus: [['path', { d: 'M12 5v14M5 12h14' }]],
  search: [['circle', { cx: 11, cy: 11, r: 7 }], ['path', { d: 'M20 20l-3.5-3.5' }]],
  copy: [['rect', { x: 8, y: 8, width: 12, height: 12, rx: 2 }], ['path', { d: 'M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2' }]],
  eye: [['path', { d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z' }], ['circle', { cx: 12, cy: 12, r: 3 }]],
  eyeOff: [['path', { d: 'M3 3l18 18M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2' }]],
  open: [['path', { d: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5' }]],
  refresh: [['path', { d: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7' }]],
  back: [['path', { d: 'M15 5l-7 7 7 7' }]],
  lock: [['rect', { x: 4.5, y: 10.5, width: 15, height: 10, rx: 2.5 }], ['path', { d: 'M8 10.5V7.5a4 4 0 0 1 8 0v3' }]],
  save: [['path', { d: 'M12 4v11M7 10l5 5 5-5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4' }]],
  upload: [['path', { d: 'M12 15V4M7 9l5-5 5 5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4' }]],
  download: [['path', { d: 'M12 4v11M7 10l5 5 5-5M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4' }]],
  sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' }]],
  moon: [['path', { d: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z' }]],
  close: [['path', { d: 'M6 6l12 12M18 6L6 18' }]],
  chev: [['path', { d: 'M6 9l6 6 6-6' }]],
  sidebar: [['rect', { x: 3, y: 4, width: 18, height: 16, rx: 3 }], ['path', { d: 'M9 4v16' }]],
  sparkle: [['path', { d: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z' }], ['path', { d: 'M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z' }]],
});

function icon(name, size) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size || (name === 'plus' || name === 'close' ? 20 : name === 'back' ? 22 : name === 'search' || name === 'save' ? 16 : 18)));
  svg.setAttribute('height', svg.getAttribute('width'));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  for (const [tag, attrs] of ICONS[name] || []) {
    const child = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) child.setAttribute(key, String(value));
    svg.append(child);
  }
  return svg;
}

function iconButton(name, action, label, extraClass = '') {
  return make('button', {
    className: `icon-btn ${extraClass}`.trim(),
    attrs: { type: 'button', title: label, 'aria-label': label },
    dataset: action ? { action } : undefined,
  }, icon(name));
}

$$('[data-icon]').forEach(element => element.replaceChildren(icon(element.dataset.icon)));
$$('.modk').forEach(element => { element.textContent = IS_MAC ? '⌘S' : 'Ctrl+S'; });

/* ---------- Theme ---------- */
const mq = matchMedia('(prefers-color-scheme: dark)');
let themeOverride = null;
function applyTheme() {
  const theme = themeOverride || (mq.matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  const themeIcon = theme === 'dark' ? 'sun' : 'moon';
  $('#themeIcon').replaceChildren(icon(themeIcon));
  $('#lockTheme').replaceChildren(icon(themeIcon));
}
function toggleTheme() {
  themeOverride = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
}
on(mq, 'change', applyTheme);
on($('#themeBtn'), 'click', toggleTheme);
on($('#lockTheme'), 'click', toggleTheme);
applyTheme();

/* ---------- General utilities ---------- */
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const b64 = buffer => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};
function decodeBase64(value, label, maxBytes) {
  if (typeof value !== 'string' || value.length === 0 || value.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) {
    throw new Error(`The vault file is damaged (invalid ${label}).`);
  }
  const estimated = Math.floor(value.length * 3 / 4);
  if (estimated > maxBytes + 2) throw new Error(`The vault ${label} is too large.`);
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    if (bytes.byteLength > maxBytes) throw new Error('too large');
    return bytes;
  } catch {
    throw new Error(`The vault file is damaged (invalid ${label}).`);
  }
}
const uid = () => crypto.randomUUID ? crypto.randomUUID() : b64(crypto.getRandomValues(new Uint8Array(12)));
const nowISO = () => new Date().toISOString();
const fmt = iso => { try { const date = new Date(iso); return Number.isNaN(date.valueOf()) ? '—' : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); } catch { return '—'; } };
function hueIndex(value) {
  let hash = 0;
  for (const character of String(value || '?')) hash = (hash * 31 + character.codePointAt(0)) >>> 0;
  return hash % 12;
}
function avatar(entry, large = false) {
  const title = String(entry.title || '?').trim();
  return make('div', { className: `avatar${large ? ' lg' : ''} hue-${hueIndex(title)}`, text: (title[0] || '?').toUpperCase() });
}
function safeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  let candidate = value.trim();
  if (!/^[a-z][a-z0-9+.-]*:/i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : '';
  } catch { return ''; }
}
function safeFileName(value, fallback = 'password-vault.json') {
  let name = String(value || fallback).trim().replace(/[\\/:*?"<>|\u0000-\u001F]/g, '').slice(0, 180);
  if (!name) name = fallback;
  if (!/\.json$/i.test(name)) name += '.json';
  return name;
}
function download(text, name) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const link = make('a', { attrs: { href: url, download: safeFileName(name) } });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
let toastTimer;
function toast(message) {
  const element = $('#toast');
  element.textContent = String(message);
  element.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('show'), 2600);
}
function limitString(value, max, label, strict = true) {
  const result = value === null || value === undefined ? '' : String(value);
  if (result.length > max) {
    if (strict) throw new Error(`${label} exceeds the supported length.`);
    return result.slice(0, max);
  }
  return result;
}
function validDate(value, fallback) {
  if (typeof value !== 'string' || value.length > 64 || Number.isNaN(Date.parse(value))) return fallback;
  return value;
}

/* ---------- Crypto and vault validation ---------- */
async function deriveKey(password, salt, iterations) {
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}
async function encryptVault() {
  if (!state.key || !(state.salt instanceof Uint8Array) || state.salt.byteLength !== 16) throw new Error('The vault is not unlocked.');
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const payload = enc.encode(JSON.stringify({ version: VERSION, savedAt: nowISO(), entries: state.entries }));
  if (payload.byteLength > MAX_VAULT_BYTES) throw new Error('The vault is too large to save safely.');
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, state.key, payload);
  return JSON.stringify({
    format: FORMAT,
    version: VERSION,
    kdf: { name: 'PBKDF2', hash: 'SHA-256', iterations: state.iter, salt: b64(state.salt) },
    cipher: { name: 'AES-GCM', iv: b64(iv) },
    data: b64(ciphertext),
  }, null, 2);
}
function validateEnvelope(value) {
  if (!isRecord(value) || value.format !== FORMAT) throw new Error('Not an encrypted Vault file. Create a vault, then use “Import JSON” for plain JSON.');
  if (value.version !== VERSION) throw new Error('Unsupported vault format version.');
  if (!isRecord(value.kdf) || value.kdf.name !== 'PBKDF2' || value.kdf.hash !== 'SHA-256') throw new Error('Unsupported or invalid key-derivation settings.');
  if (!Number.isInteger(value.kdf.iterations) || value.kdf.iterations < MIN_ITER || value.kdf.iterations > MAX_ITER) throw new Error('Invalid PBKDF2 iteration count.');
  if (!isRecord(value.cipher) || value.cipher.name !== 'AES-GCM') throw new Error('Unsupported or invalid cipher settings.');
  const salt = decodeBase64(value.kdf.salt, 'salt', 16);
  const iv = decodeBase64(value.cipher.iv, 'IV', 12);
  const ciphertext = decodeBase64(value.data, 'ciphertext', MAX_VAULT_BYTES + 16);
  if (salt.byteLength !== 16) throw new Error('The vault file has an invalid salt length.');
  if (iv.byteLength !== 12) throw new Error('The vault file has an invalid IV length.');
  if (ciphertext.byteLength < 17) throw new Error('The vault ciphertext is invalid.');
  return { salt, iv, ciphertext, iterations: value.kdf.iterations };
}
function normalizeEntry(raw, seenIds, strict = true) {
  if (!isRecord(raw)) throw new Error('The decrypted vault contains an invalid item.');
  const timestamp = nowISO();
  let id = limitString(raw.id, 200, 'An item ID', strict).trim();
  if (!id || seenIds.has(id)) id = uid();
  seenIds.add(id);
  return {
    id,
    title: limitString(raw.title, 200, 'An item title', strict),
    category: CAT_IDS.includes(raw.category) ? raw.category : 'login',
    username: limitString(raw.username, 500, 'A username', strict),
    password: limitString(raw.password, 4096, 'A password', strict),
    url: limitString(raw.url, 2048, 'A website', strict),
    notes: limitString(raw.notes, 100_000, 'Item notes', strict),
    favorite: raw.favorite === true,
    createdAt: validDate(raw.createdAt, timestamp),
    updatedAt: validDate(raw.updatedAt, timestamp),
  };
}
function validatePayload(value) {
  if (!isRecord(value) || value.version !== VERSION || !Array.isArray(value.entries)) throw new Error('The decrypted vault has an invalid structure.');
  if (value.entries.length > MAX_ENTRIES) throw new Error('The vault contains too many items.');
  const seen = new Set();
  return value.entries.map(entry => normalizeEntry(entry, seen, true));
}

/* ---------- Password strength and generator ---------- */
function strength(password) {
  if (!password) return { score: 0, label: '' };
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/\d/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 33;
  const variety = Math.min(1, new Set(password).size / password.length + 0.35);
  const bits = Math.log2(Math.max(pool, 2)) * password.length * variety;
  if (bits < 40) return { score: 1, label: 'Weak' };
  if (bits < 60) return { score: 2, label: 'Fair' };
  if (bits < 80) return { score: 3, label: 'Good' };
  return { score: 4, label: 'Strong' };
}
function paintMeter(meterElement, password, labelElement) {
  const result = strength(password);
  const bar = meterElement.firstElementChild;
  bar.className = `score-${result.score}`;
  if (labelElement) {
    labelElement.textContent = result.label;
    labelElement.classList.remove('strength-0', 'strength-1', 'strength-2', 'strength-3', 'strength-4');
    labelElement.classList.add(`strength-${result.score}`);
  }
}
function randomIndex(max) {
  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  do crypto.getRandomValues(array); while (array[0] >= limit);
  return array[0] % max;
}
function generate({ length, upper, lower, digits, symbols, ambig }) {
  let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lowercase = 'abcdefghijklmnopqrstuvwxyz';
  let numbers = '0123456789';
  const punctuation = '!@#$%^&*()-_=+[]{};:,.?/~';
  if (ambig) {
    uppercase = uppercase.replace(/[IO]/g, '');
    lowercase = lowercase.replace(/[lo]/g, '');
    numbers = numbers.replace(/[01]/g, '');
  }
  const sets = [upper && uppercase, lower && lowercase, digits && numbers, symbols && punctuation].filter(Boolean);
  if (!sets.length) return '';
  const all = sets.join('');
  const output = sets.map(set => set[randomIndex(set.length)]);
  while (output.length < length) output.push(all[randomIndex(all.length)]);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swapWith = randomIndex(index + 1);
    [output[index], output[swapWith]] = [output[swapWith], output[index]];
  }
  return output.join('');
}

/* ---------- Clipboard ---------- */
let clipboardTimer;
async function copy(text, label) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(String(text));
  } catch {
    const textarea = make('textarea', { className: 'clipboard-fallback', props: { value: String(text), readOnly: true } });
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.value = '';
    textarea.remove();
  }
  toast(`${label} copied — clipboard clearing will be attempted in 30s`);
  clearTimeout(clipboardTimer);
  clipboardTimer = setTimeout(() => { navigator.clipboard?.writeText('').catch(() => {}); }, CLIP_CLEAR_MS);
}

/* ---------- Lock screen and file opening ---------- */
const lockErr = message => { $('#lockError').textContent = message || ''; };
if (!window.crypto?.subtle) {
  lockErr('Web Crypto is unavailable. Open these files in a modern browser using HTTPS or localhost.');
  $$('.lock form button').forEach(button => { button.disabled = true; });
}
if (IN_FRAME) {
  lockErr('For security, the vault cannot unlock inside an embedded preview. Download all three app files and open the HTML directly.');
  $$('.lock form button').forEach(button => { button.disabled = true; });
}
$$('.segmented button').forEach(button => on(button, 'click', () => {
  $$('.segmented button').forEach(candidate => candidate.classList.toggle('active', candidate === button));
  $('#openForm').hidden = button.dataset.mode !== 'open';
  $('#createForm').hidden = button.dataset.mode !== 'create';
  lockErr('');
  (button.dataset.mode === 'open' ? $('#openPw') : $('#newPw')).focus();
}));

const dropZone = $('#dropZone');
const OPEN_TYPES = [{ description: 'Vault file', accept: { 'application/json': ['.json'], 'text/plain': ['.txt'] } }];
function setPending(file, handle = null) {
  if (!(file instanceof File)) return;
  if (file.size > MAX_VAULT_BYTES * 1.4) return lockErr('That file is larger than the supported 50 MB vault limit.');
  state.pendingFile = file;
  state.pendingHandle = handle;
  $('#dropLabel').textContent = file.name;
  dropZone.classList.add('has-file');
  lockErr('');
  $('#openPw').focus();
}
on(dropZone, 'click', () => {
  const input = $('#fileInput');
  if (!CAN_PICK || !window.showOpenFilePicker || window.__vaultUseInput) {
    input.click();
    return;
  }
  window.showOpenFilePicker({ types: OPEN_TYPES, excludeAcceptAllOption: false })
    .then(async ([handle]) => setPending(await handle.getFile(), handle))
    .catch(error => {
      if (error?.name === 'AbortError') return;
      window.__vaultUseInput = true;
      try { input.click(); } catch { lockErr('Using the standard file chooser — click the box again to pick your file.'); }
    });
});
on($('#fileInput'), 'change', event => {
  const file = event.target.files[0];
  if (file) setPending(file);
  event.target.value = '';
});
for (const type of ['dragenter', 'dragover']) on(dropZone, type, event => { event.preventDefault(); dropZone.classList.add('over'); });
for (const type of ['dragleave', 'drop']) on(dropZone, type, event => { event.preventDefault(); dropZone.classList.remove('over'); });
on(dropZone, 'drop', event => {
  const file = event.dataTransfer.files[0];
  const item = event.dataTransfer.items?.[0];
  if (item?.getAsFileSystemHandle && !IN_FRAME) {
    item.getAsFileSystemHandle()
      .then(async handle => handle?.kind === 'file' ? setPending(await handle.getFile(), handle) : setPending(file))
      .catch(() => { if (file) setPending(file); });
  } else if (file) setPending(file);
});
async function readVaultText(file, maxBytes = MAX_VAULT_BYTES * 1.4) {
  if (!file || file.size > maxBytes) throw new Error('The selected file is too large.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  let text;
  if (bytes[0] === 0xFF && bytes[1] === 0xFE) text = new TextDecoder('utf-16le', { fatal: true }).decode(bytes);
  else if (bytes[0] === 0xFE && bytes[1] === 0xFF) text = new TextDecoder('utf-16be', { fatal: true }).decode(bytes);
  else text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  return text.replace(/^\uFEFF/, '').trim();
}
function busy(button, label) {
  if (!button.dataset.label) button.dataset.label = button.textContent;
  button.textContent = label;
  button.disabled = true;
}
function unbusy(button) {
  button.textContent = button.dataset.label || '';
  button.disabled = false;
}

on($('#openForm'), 'submit', async event => {
  event.preventDefault();
  const passwordInput = $('#openPw');
  const password = passwordInput.value;
  if (!state.pendingFile) return lockErr('Choose a vault file first.');
  if (!password) return lockErr('Enter your master password.');
  const button = $('#unlockBtn');
  busy(button, 'Unlocking…');
  lockErr('');
  const pendingHandle = state.pendingHandle;
  if (pendingHandle?.requestPermission) { try { await pendingHandle.requestPermission({ mode: 'readwrite' }); } catch {} }
  try {
    let raw;
    try {
      if (pendingHandle) state.pendingFile = await pendingHandle.getFile();
      raw = await readVaultText(state.pendingFile);
    } catch (error) {
      throw new Error(`Couldn’t read the file (${error?.name || 'error'}). It may have changed on disk or still be syncing — choose it again.`);
    }
    let envelope;
    try { envelope = JSON.parse(raw); } catch { throw new Error(raw ? 'This file is not valid JSON (it may be incomplete or truncated).' : 'This file is empty.'); }
    const validated = validateEnvelope(envelope);
    const key = await deriveKey(password, validated.salt, validated.iterations);
    let plaintext;
    try {
      plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: validated.iv }, key, validated.ciphertext);
    } catch { throw new Error('Incorrect master password or damaged file.'); }
    let payload;
    try { payload = JSON.parse(dec.decode(plaintext)); } catch { throw new Error('The decrypted vault data is invalid.'); }
    const entries = validatePayload(payload);
    Object.assign(state, {
      key,
      salt: validated.salt,
      iter: validated.iterations,
      entries,
      fileHandle: pendingHandle,
      fileName: safeFileName(state.pendingFile.name),
      dirty: false,
      lastSaved: null,
    });
    enterApp();
  } catch (error) {
    lockErr(error.message || 'Could not unlock the vault.');
  } finally {
    passwordInput.value = '';
    unbusy(button);
  }
});

on($('#newPw'), 'input', event => paintMeter($('#newMeter'), event.target.value));
on($('#createForm'), 'submit', async event => {
  event.preventDefault();
  const passwordInput = $('#newPw');
  const confirmInput = $('#newPw2');
  const password = passwordInput.value;
  const confirmation = confirmInput.value;
  const name = safeFileName($('#newName').value, 'password-vault.json');
  if (password.length < 14) return lockErr('Use at least 14 characters for your master password. A unique passphrase is recommended.');
  if (password !== confirmation) return lockErr('Passwords don’t match.');
  const button = $('#createBtn');
  busy(button, 'Creating…');
  lockErr('');
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(password, salt, ITER);
    Object.assign(state, { key, salt, iter: ITER, entries: [], fileHandle: null, fileName: name, dirty: true, lastSaved: null });
    enterApp();
    toast('Vault created — press Save to write it to disk');
  } catch (error) {
    lockErr(error.message || 'Could not create the vault.');
  } finally {
    passwordInput.value = '';
    confirmInput.value = '';
    unbusy(button);
  }
});

function enterApp() {
  $('#lockScreen').hidden = true;
  $('#app').hidden = false;
  for (const selector of ['#openPw', '#newPw', '#newPw2']) $(selector).value = '';
  paintMeter($('#newMeter'), '');
  state.filter = 'all';
  state.query = '';
  $('#search').value = '';
  state.selectedId = null;
  state.editing = false;
  state.draft = null;
  renderAll();
  bump();
}

let idleTimer;
let autosaveTimer;
function clearSecretUI() {
  $('#detail').replaceChildren();
  $('#list').replaceChildren();
  $('#saveText').value = '';
  $('#genOut').textContent = '';
  for (const selector of ['#openPw', '#newPw', '#newPw2']) $(selector).value = '';
}
function lock(force = false) {
  if (!force && state.dirty && !confirm('You have unsaved changes. Lock anyway and discard them?')) return;
  clearTimeout(idleTimer);
  clearTimeout(autosaveTimer);
  navigator.clipboard?.writeText('').catch(() => {});
  Object.assign(state, {
    key: null,
    salt: null,
    entries: [],
    fileHandle: null,
    pendingHandle: null,
    pendingFile: null,
    dirty: false,
    selectedId: null,
    editing: false,
    draft: null,
    reveal: false,
    lastSaved: null,
  });
  if ($('#saveDialog').open) $('#saveDialog').close();
  if ($('#genDialog').open) $('#genDialog').close();
  $('#app').hidden = true;
  $('#app').classList.remove('show-detail');
  $('#lockScreen').hidden = false;
  clearSecretUI();
  $('#fileInput').value = '';
  $('#importInput').value = '';
  $('#dropLabel').textContent = 'Choose or drop a password-vault .json file';
  dropZone.classList.remove('has-file');
  document.title = 'Vault';
  lockErr('');
}
on($('#lockBtn'), 'click', async () => {
  if (state.dirty && state.autosave && state.fileHandle) {
    clearTimeout(autosaveTimer);
    await autoSave();
  }
  lock();
});

/* ---------- Auto-lock ---------- */
let activityEpoch = 0;
async function autoLockNow(expectedEpoch) {
  if (!state.key || expectedEpoch !== activityEpoch) return;
  if (state.dirty && state.autosave && state.fileHandle) await autoSave();
  if (!state.key || expectedEpoch !== activityEpoch) return;
  if (state.dirty) {
    toast('Inactive: save within 60 seconds or unsaved changes will be discarded');
    idleTimer = setTimeout(() => {
      if (!state.key || expectedEpoch !== activityEpoch) return;
      lock(true);
      lockErr('Locked after inactivity; unsaved changes were discarded.');
    }, AUTO_LOCK_GRACE_MS);
    return;
  }
  lock(true);
  lockErr('Locked after 5 minutes of inactivity.');
}
function bump() {
  clearTimeout(idleTimer);
  activityEpoch += 1;
  if (!state.key) return;
  const expectedEpoch = activityEpoch;
  idleTimer = setTimeout(() => autoLockNow(expectedEpoch), AUTO_LOCK_MS);
}
for (const type of ['pointermove', 'keydown', 'pointerdown', 'wheel', 'touchstart']) on(window, type, bump, { passive: true });

/* ---------- Save, import and export ---------- */
function markDirty() {
  state.dirty = true;
  state.rev += 1;
  updateChrome();
  scheduleAutosave();
}
function updateChrome() {
  let suffix = '';
  if (state.dirty) suffix = state.autosave && state.fileHandle ? ' — Saving…' : ' — Edited';
  else if (state.lastSaved) suffix = ` — Saved ${state.lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  $('#fileName').textContent = state.fileName + suffix;
  $('#saveBtn').classList.toggle('pulse', state.dirty);
  document.title = `${state.dirty ? '• ' : ''}Vault`;
}
const SAVE_TYPES = [{ description: 'Vault JSON', accept: { 'application/json': ['.json'] } }];
let saving = false;
async function ensureWritable(handle) {
  if (!handle.queryPermission) return;
  if (await handle.queryPermission({ mode: 'readwrite' }) === 'granted') return;
  if (await handle.requestPermission({ mode: 'readwrite' }) !== 'granted') throw new Error('Write permission was denied.');
}
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const TRANSIENT = ['InvalidStateError', 'NoModificationAllowedError', 'NotReadableError', 'AbortError'];
async function writeOnce(handle, text) {
  const writable = await handle.createWritable({ keepExistingData: false });
  try {
    await writable.truncate(0);
    await writable.write(text);
    await writable.close();
  } catch (error) {
    try { await writable.abort(); } catch {}
    throw error;
  }
}
async function writeVerified(handle, text) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await writeOnce(handle, text);
      for (let check = 0; check < 4; check += 1) {
        let written = '';
        try { written = await (await handle.getFile()).text(); } catch (error) { lastError = error; }
        if (written === text) return;
        await sleep(300 * (check + 1));
      }
      lastError = new Error('Verification failed — file on disk does not match.');
    } catch (error) {
      lastError = error;
      if (!TRANSIENT.includes(error?.name)) throw error;
    }
    await sleep(400 * (attempt + 1));
  }
  throw lastError;
}
function saved(where, revision = state.rev, quiet = false) {
  if (revision === state.rev) state.dirty = false;
  state.lastSaved = new Date();
  autosaveHinted = false;
  updateChrome();
  if (!quiet) toast(`Saved ✓ ${where}`);
  if (state.dirty) scheduleAutosave();
}
let autosaveHinted = false;
function autosaveHint(message) {
  if (!autosaveHinted) {
    autosaveHinted = true;
    toast(message);
  }
}
function scheduleAutosave() {
  clearTimeout(autosaveTimer);
  if (!state.autosave || !state.key || !state.dirty) return;
  autosaveTimer = setTimeout(autoSave, 1500);
}
async function autoSave() {
  if (!state.autosave || !state.key || !state.dirty) return;
  if (saving) return scheduleAutosave();
  const handle = state.fileHandle;
  if (!handle) return autosaveHint('Autosave needs a writable vault file — press Save once');
  saving = true;
  const revision = state.rev;
  try {
    if (handle.queryPermission && await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') return autosaveHint('Autosave paused — press Save once to allow writing');
    const text = await encryptVault();
    await writeVerified(handle, text);
    saved(handle.name, revision, true);
  } catch {
    autosaveHint('Autosave failed — press Save to retry');
  } finally {
    saving = false;
  }
}
async function save(saveAs = false) {
  if (!state.key) return;
  if (state.editing) {
    const form = $('#editForm');
    if (form) form.requestSubmit();
    if (state.editing) return;
  }
  if (saving) {
    setTimeout(() => save(saveAs), 400);
    return;
  }
  clearTimeout(autosaveTimer);
  saving = true;
  const button = $('#saveBtn');
  button.disabled = true;
  try {
    let handle = saveAs ? null : state.fileHandle;
    if (CAN_PICK) {
      try {
        if (!handle) handle = await window.showSaveFilePicker({ suggestedName: state.fileName, types: SAVE_TYPES });
        await ensureWritable(handle);
      } catch (error) {
        if (error?.name === 'AbortError') {
          toast('Save cancelled');
          return;
        }
        handle = null;
      }
    }
    const revision = state.rev;
    const text = await encryptVault();
    if (handle) {
      try {
        await writeVerified(handle, text);
        state.fileHandle = handle;
        state.fileName = safeFileName(handle.name);
        saved(handle.name, revision);
        return;
      } catch {
        state.fileHandle = null;
        toast('Couldn’t write the file directly — using download instead');
      }
    }
    showSaveFallback(text);
  } catch (error) {
    alert(`Save failed: ${error?.message || 'unknown error'}`);
  } finally {
    saving = false;
    button.disabled = false;
  }
}
let fallbackUrl = null;
function showSaveFallback(text) {
  if (fallbackUrl) URL.revokeObjectURL(fallbackUrl);
  fallbackUrl = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const link = $('#saveLink');
  link.href = fallbackUrl;
  link.download = safeFileName(state.fileName);
  $('#saveName').textContent = state.fileName;
  $('#saveReason').textContent = IN_FRAME
    ? 'This page is embedded, which blocks saving. Download all app files and open the HTML directly.'
    : !('showSaveFilePicker' in window)
      ? 'This browser cannot write to files directly, so the vault is saved as a download.'
      : 'Direct write was not possible, so the vault is saved as a download.';
  $('#saveText').value = text;
  try { link.click(); } catch {}
  $('#saveDialog').showModal();
}
on($('#saveDone'), 'click', () => {
  $('#saveDialog').close();
  if (confirm('Did the file download successfully?')) saved(`${state.fileName} (downloaded)`);
  $('#saveText').value = '';
});
on($('#saveCopy'), 'click', () => copy($('#saveText').value, 'Encrypted vault JSON'));
on($('#saveBtn'), 'click', () => save(false));
on($('#saveAsBtn'), 'click', () => save(true));

on($('#importBtn'), 'click', () => $('#importInput').click());
on($('#importInput'), 'change', async event => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  if (file.size > MAX_IMPORT_BYTES) return toast('Import rejected — plain JSON imports are limited to 10 MB');
  try {
    const parsed = JSON.parse(await readVaultText(file, MAX_IMPORT_BYTES));
    if (parsed?.format === FORMAT) return toast('That is an encrypted vault — open it from the lock screen');
    const source = Array.isArray(parsed) ? parsed : (isRecord(parsed) ? parsed.entries || parsed.items || parsed.passwords || [] : []);
    if (!Array.isArray(source) || !source.length) return toast('No items found in that JSON');
    if (source.length + state.entries.length > MAX_ENTRIES) return toast('Import rejected — too many items');
    const seen = new Set(state.entries.map(item => item.id));
    const timestamp = nowISO();
    const items = source.filter(isRecord).map(raw => normalizeEntry({
      id: uid(),
      title: raw.title ?? raw.name ?? raw.site ?? '',
      category: raw.category,
      username: raw.username ?? raw.login ?? raw.email ?? raw.user ?? '',
      password: raw.password ?? raw.pass ?? '',
      url: raw.url ?? raw.website ?? raw.uri ?? '',
      notes: raw.notes ?? raw.note ?? '',
      favorite: raw.favorite === true,
      createdAt: validDate(raw.createdAt, timestamp),
      updatedAt: timestamp,
    }, seen, false));
    if (!items.length) return toast('No valid items found in that JSON');
    state.entries.push(...items);
    markDirty();
    renderAll();
    toast(`Imported ${items.length} item${items.length === 1 ? '' : 's'}`);
  } catch {
    toast('Could not read that file — it may be invalid or exceed supported field lengths');
  }
});
on($('#exportBtn'), 'click', () => {
  if (!confirm('Export an UNENCRYPTED JSON file?\n\nAnyone with this file can read all passwords. Delete it securely when finished.')) return;
  download(JSON.stringify({ exportedAt: nowISO(), entries: state.entries }, null, 2), state.fileName.replace(/\.json$/i, '') + '-plain-export.json');
});

/* ---------- Rendering with safe DOM construction ---------- */
function filtered() {
  let entries = state.entries.filter(entry => state.filter === 'all' || (state.filter === 'fav' ? entry.favorite : entry.category === state.filter));
  const query = state.query.trim().toLowerCase();
  if (query) entries = entries.filter(entry => [entry.title, entry.username, entry.url, entry.notes].some(value => String(value || '').toLowerCase().includes(query)));
  return entries.sort((a, b) => String(a.title || '').localeCompare(String(b.title || ''), undefined, { sensitivity: 'base' }));
}
function renderAll() {
  updateChrome();
  renderNav();
  renderList();
  renderDetail();
}
function renderNav() {
  const count = id => id === 'all' ? state.entries.length : id === 'fav' ? state.entries.filter(entry => entry.favorite).length : state.entries.filter(entry => entry.category === id).length;
  const fragment = document.createDocumentFragment();
  for (const category of CATS) {
    const button = make('button', {
      className: `nav-item${state.filter === category.id ? ' active' : ''}`,
      attrs: { type: 'button', title: category.name },
      dataset: { filter: category.id },
    }, icon(category.icon), make('span', { className: 'lbl', text: category.name }), make('span', { className: 'count', text: count(category.id) }));
    fragment.append(button);
  }
  $('#catNav').replaceChildren(fragment);
}
on($('#catNav'), 'click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  state.filter = button.dataset.filter;
  renderNav();
  renderList();
});
function emptyState(iconName, title, message) {
  return make('div', { className: 'empty' }, icon(iconName, 44), make('h3', { text: title }), make('p', { text: message }));
}
function renderList() {
  const entries = filtered();
  const list = $('#list');
  if (!entries.length) {
    list.replaceChildren(emptyState(state.query ? 'search' : 'key', state.query ? 'No Results' : 'No Items', state.query ? 'Try a different search.' : 'Click + to add your first item.'));
    return;
  }
  const fragment = document.createDocumentFragment();
  for (const entry of entries) {
    let host = '';
    try { host = entry.url ? new URL(safeUrl(entry.url)).hostname : ''; } catch {}
    const copy = make('div', { className: 'row-copy' }, make('div', { className: 'row-title', text: entry.title || 'Untitled' }), make('div', { className: 'row-sub', text: entry.username || host || catName(entry.category) }));
    const row = make('div', {
      className: `row-item${entry.id === state.selectedId ? ' sel' : ''}`,
      attrs: { tabindex: '0', role: 'button' },
      dataset: { id: entry.id },
    }, avatar(entry), copy, entry.favorite ? make('span', { className: 'star' }, icon('starFill')) : null);
    fragment.append(row);
  }
  list.replaceChildren(fragment);
}
function selectItem(id) {
  state.selectedId = id;
  state.editing = false;
  state.draft = null;
  state.reveal = false;
  renderList();
  renderDetail();
  $('#app').classList.add('show-detail');
}
on($('#list'), 'click', event => { const row = event.target.closest('[data-id]'); if (row) selectItem(row.dataset.id); });
on($('#list'), 'keydown', event => {
  const row = event.target.closest('[data-id]');
  if (row && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    selectItem(row.dataset.id);
  }
});
on($('#search'), 'input', event => { state.query = event.target.value; renderList(); });
on($('#addBtn'), 'click', () => startEdit(null));
const current = () => state.entries.find(entry => entry.id === state.selectedId);
function fieldRow(label, valueNode, actionNode) {
  return make('div', { className: 'field-row' }, make('span', { className: 'fl', text: label }), valueNode, make('span', { className: 'fa' }, actionNode));
}
function valueOrDash(value, className = 'fv') {
  return value ? make('span', { className, text: value }) : make('span', { className: 'muted', text: '—' });
}
function copyButton(field, label) {
  const button = iconButton('copy', 'copy', `Copy ${label}`);
  button.dataset.field = field;
  button.dataset.label = label;
  return button;
}
function strengthMeter(result) {
  return make('div', { className: 'meter' }, make('span', { className: `score-${result.score}` }));
}
function renderDetail() {
  const detail = $('#detail');
  if (state.editing) {
    renderEdit();
    return;
  }
  const entry = current();
  if (!entry) {
    detail.replaceChildren(emptyState('lock', 'No Item Selected', 'Select an item, or click + to add one.'));
    return;
  }
  const website = safeUrl(entry.url);
  const result = strength(entry.password);
  const back = iconButton('back', 'back', 'Close item', 'back');
  back.append(make('span', { className: 'ic-x' }, icon('close')));
  back.firstElementChild.classList.add('ic-back');
  const favorite = iconButton(entry.favorite ? 'starFill' : 'star', 'fav', 'Toggle favorite', entry.favorite ? 'on' : '');
  const edit = make('button', { className: 'btn', text: 'Edit', attrs: { type: 'button' }, dataset: { action: 'edit' } });
  const header = make('div', { className: 'detail-head' },
    back,
    avatar(entry, true),
    make('div', { className: 'dh-text' }, make('h2', { text: entry.title || 'Untitled' }), make('p', { text: catName(entry.category) })),
    make('div', { className: 'dh-actions' }, favorite, edit),
  );
  const passwordActions = entry.password ? [iconButton(state.reveal ? 'eyeOff' : 'eye', 'reveal', state.reveal ? 'Hide password' : 'Show password'), copyButton('password', 'Password')] : [];
  const websiteActions = [];
  if (website) websiteActions.push(make('a', { className: 'icon-btn', attrs: { href: website, target: '_blank', rel: 'noopener noreferrer', title: 'Open website', 'aria-label': 'Open website' } }, icon('open')));
  if (entry.url) websiteActions.push(copyButton('url', 'Website'));
  const group = make('div', { className: 'group' },
    fieldRow('Username', valueOrDash(entry.username), entry.username ? copyButton('username', 'Username') : null),
    fieldRow('Password', entry.password ? make('span', { className: 'fv mono', text: state.reveal ? entry.password : '••••••••••••' }) : valueOrDash(''), passwordActions),
    entry.password ? fieldRow('Strength', make('span', { className: 'fv' }, strengthMeter(result)), make('span', { className: `strength-label strength-${result.score}`, text: result.label })) : null,
    fieldRow('Website', valueOrDash(entry.url), websiteActions),
  );
  const children = [header, group];
  if (entry.notes) children.push(make('div', { className: 'group' }, make('div', { className: 'notes-head', text: 'Notes' }), make('div', { className: 'notes', text: entry.notes })));
  children.push(make('p', { className: 'meta', text: `Created ${fmt(entry.createdAt)} · Modified ${fmt(entry.updatedAt)}` }));
  children.push(make('button', { className: 'danger', text: 'Delete Item', attrs: { type: 'button' }, dataset: { action: 'delete' } }));
  detail.replaceChildren(make('div', { className: 'detail-inner' }, children));
}
function labeledInput(label, input) {
  return make('label', { className: 'field-row' }, make('span', { className: 'fl', text: label }), input);
}
function renderEdit() {
  const entry = state.draft;
  const form = make('form', { className: 'detail-inner', id: 'editForm', attrs: { autocomplete: 'off', novalidate: true } });
  const cancel = make('button', { className: 'btn plain', text: 'Cancel', attrs: { type: 'button' }, dataset: { action: 'cancel' } });
  const done = make('button', { className: 'btn primary', text: 'Done', attrs: { type: 'submit' } });
  append(form, make('div', { className: 'detail-head' }, cancel, make('h2', { className: 'edit-title', text: state.isNew ? 'New Item' : 'Edit Item' }), done));
  const titleInput = make('input', { className: 'span', attrs: { name: 'title', placeholder: 'e.g. GitHub', maxlength: '200' }, props: { value: entry.title } });
  const categorySelect = make('select', { className: 'span', attrs: { name: 'category' } });
  for (const category of CATS.slice(2)) categorySelect.append(make('option', { text: category.name, attrs: { value: category.id }, props: { selected: entry.category === category.id } }));
  append(form, make('div', { className: 'group' }, labeledInput('Title', titleInput), labeledInput('Category', categorySelect)));
  const username = make('input', { className: 'span', attrs: { name: 'username', placeholder: 'Email or username', autocapitalize: 'off', spellcheck: 'false' }, props: { value: entry.username } });
  const password = make('input', { className: 'mono', attrs: { name: 'password', type: state.reveal ? 'text' : 'password', placeholder: 'Password', autocomplete: 'new-password', spellcheck: 'false' }, props: { value: entry.password } });
  const passwordRow = make('div', { className: 'field-row' }, make('span', { className: 'fl', text: 'Password' }), password, make('span', { className: 'fa' }, iconButton(state.reveal ? 'eyeOff' : 'eye', 'toggle-pw', 'Show or hide password'), iconButton('sparkle', 'gen', 'Generate password')));
  const meter = make('div', { className: 'meter', id: 'editMeter' }, make('span'));
  const meterLabel = make('span', { className: 'fa strength-label', id: 'editLabel' });
  const url = make('input', { className: 'span', attrs: { name: 'url', placeholder: 'example.com', autocapitalize: 'off', spellcheck: 'false' }, props: { value: entry.url } });
  append(form, make('div', { className: 'group' }, labeledInput('Username', username), passwordRow, fieldRow('Strength', make('span', { className: 'fv' }, meter), meterLabel), labeledInput('Website', url)));
  const notes = make('textarea', { attrs: { name: 'notes', rows: '5', placeholder: 'Add notes' }, props: { value: entry.notes } });
  append(form, make('div', { className: 'group' }, make('label', { className: 'field-col' }, make('span', { className: 'fl', text: 'Notes' }), notes)));
  const favorite = make('input', { className: 'switch', attrs: { type: 'checkbox', name: 'favorite' }, props: { checked: entry.favorite } });
  append(form, make('div', { className: 'group' }, make('label', { className: 'field-row' }, make('span', { className: 'fl', text: 'Favorite' }), make('span'), favorite)));
  $('#detail').replaceChildren(form);
  paintMeter(meter, entry.password, meterLabel);
}
function startEdit(entry) {
  state.isNew = !entry;
  state.draft = entry ? { ...entry } : { title: '', category: CAT_IDS.includes(state.filter) ? state.filter : 'login', username: '', password: '', url: '', notes: '', favorite: state.filter === 'fav' };
  state.editing = true;
  state.reveal = false;
  renderDetail();
  $('#app').classList.add('show-detail');
  $('#editForm [name=title]').focus();
}
function closeItem() {
  state.selectedId = null;
  state.editing = false;
  state.draft = null;
  state.reveal = false;
  $('#app').classList.remove('show-detail');
  renderList();
  renderDetail();
}
function cancelEdit() {
  state.editing = false;
  state.draft = null;
  state.reveal = false;
  if (state.isNew && !state.selectedId) $('#app').classList.remove('show-detail');
  renderDetail();
}
const detail = $('#detail');
on(detail, 'input', event => {
  if (event.target.name === 'password') paintMeter($('#editMeter'), event.target.value, $('#editLabel'));
});
on(detail, 'submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const value = {
    title: String(formData.get('title') || '').trim(),
    category: CAT_IDS.includes(String(formData.get('category'))) ? String(formData.get('category')) : 'login',
    username: String(formData.get('username') || '').trim(),
    password: String(formData.get('password') || ''),
    url: String(formData.get('url') || '').trim(),
    notes: String(formData.get('notes') || ''),
    favorite: formData.get('favorite') === 'on',
  };
  if (!value.title) {
    const title = $('#editForm [name=title]');
    title.focus();
    title.placeholder = 'Title is required';
    return;
  }
  const timestamp = nowISO();
  if (state.isNew) {
    const item = { id: uid(), ...value, createdAt: timestamp, updatedAt: timestamp };
    state.entries.push(item);
    state.selectedId = item.id;
  } else {
    Object.assign(current(), value, { updatedAt: timestamp });
  }
  state.editing = false;
  state.draft = null;
  state.reveal = false;
  markDirty();
  renderAll();
  toast(state.isNew ? 'Item added' : 'Changes saved — remember to Save the vault');
});
on(detail, 'click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const item = current();
  switch (button.dataset.action) {
    case 'edit': startEdit(item); break;
    case 'cancel': cancelEdit(); break;
    case 'back': closeItem(); break;
    case 'fav':
      item.favorite = !item.favorite;
      item.updatedAt = nowISO();
      markDirty();
      renderAll();
      break;
    case 'reveal':
      state.reveal = !state.reveal;
      renderDetail();
      break;
    case 'copy':
      copy(item?.[button.dataset.field], button.dataset.label);
      break;
    case 'toggle-pw': {
      const input = $('#editForm [name=password]');
      state.reveal = input.type === 'password';
      input.type = state.reveal ? 'text' : 'password';
      button.replaceChildren(icon(state.reveal ? 'eyeOff' : 'eye'));
      break;
    }
    case 'gen':
      openGenerator(password => {
        const input = $('#editForm [name=password]');
        if (!input) return;
        input.value = password;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });
      break;
    case 'delete':
      if (confirm(`Delete “${item.title || 'Untitled'}”?`)) {
        state.entries = state.entries.filter(entry => entry.id !== item.id);
        state.selectedId = null;
        $('#app').classList.remove('show-detail');
        markDirty();
        renderAll();
        toast('Item deleted');
      }
      break;
  }
});

/* ---------- Password generator ---------- */
const generator = $('#genDialog');
let generatorCallback = null;
function generatorOptions() {
  return {
    length: Number($('#genLen').value),
    upper: $('#genUpper').checked,
    lower: $('#genLower').checked,
    digits: $('#genDigits').checked,
    symbols: $('#genSymbols').checked,
    ambig: $('#genAmbig').checked,
  };
}
function regenerate() {
  $('#genLenV').textContent = $('#genLen').value;
  const password = generate(generatorOptions());
  $('#genOut').textContent = password || 'Select at least one character set';
  paintMeter($('#genMeter'), password, $('#genLabel'));
}
function openGenerator(callback = null) {
  generatorCallback = callback;
  $('#genUse').hidden = !callback;
  regenerate();
  generator.showModal();
}
for (const selector of ['#genLen', '#genUpper', '#genLower', '#genDigits', '#genSymbols', '#genAmbig']) on($(selector), 'input', regenerate);
on($('#genRefresh'), 'click', regenerate);
on($('#genCopy'), 'click', () => {
  const password = $('#genOut').textContent;
  if (password && !password.startsWith('Select')) copy(password, 'Password');
});
on($('#genUse'), 'click', () => {
  const password = $('#genOut').textContent;
  if (generatorCallback && !password.startsWith('Select')) generatorCallback(password);
  generator.close();
});
on($('#genBtn'), 'click', () => openGenerator(null));

/* ---------- Autosave toggle and sidebar ---------- */
const autosaveSwitch = $('#autoSwitch');
autosaveSwitch.checked = state.autosave;
if (!CAN_PICK) {
  autosaveSwitch.disabled = true;
  $('#autoRow').title = 'Autosave needs Edge/Chrome with direct file access and cannot run in a preview frame';
}
on(autosaveSwitch, 'change', () => {
  state.autosave = autosaveSwitch.checked;
  autosaveHinted = false;
  toast(state.autosave ? 'Autosave on' : 'Autosave off');
  if (state.autosave) scheduleAutosave();
});
on($('#collapseBtn'), 'click', () => {
  const collapsed = $('#app').classList.toggle('side-collapsed');
  $('#collapseBtn').setAttribute('aria-expanded', String(!collapsed));
  $('#collapseBtn').title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
});
$$('.section-label').forEach(button => on(button, 'click', () => {
  const closed = $(`#${button.dataset.sec}`).classList.toggle('sec-closed');
  button.classList.toggle('closed', closed);
  button.setAttribute('aria-expanded', String(!closed));
}));

/* ---------- Keyboard and lifecycle ---------- */
on(document, 'keydown', event => {
  if (!state.key) return;
  const modified = event.metaKey || event.ctrlKey;
  const key = event.key.toLowerCase();
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if (modified && key === 's') {
    event.preventDefault();
    save(event.shiftKey);
  } else if (modified && key === 'f') {
    event.preventDefault();
    $('#search').focus();
  } else if (key === '/' && !typing) {
    event.preventDefault();
    $('#search').focus();
  } else if (key === 'escape' && !generator.open && !$('#saveDialog').open) {
    if (state.editing) cancelEdit();
    else if (state.selectedId) closeItem();
  }
});
on(window, 'beforeunload', event => {
  if (state.dirty) {
    event.preventDefault();
    event.returnValue = '';
  }
});
})();
