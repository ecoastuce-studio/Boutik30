(() => {
"use strict";
const $ = (s, scope=document) => scope.querySelector(s);
const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const STUDIO_KEY = "sr_studio_v1";
const CACHE_KEY = "sr_market_lab_cache_v1";
const QUERY_KEY = "sr_market_lab_query_v1";
const DAYS = 180;
const TTL = 30 * 60 * 1000;

const section = document.createElement("section");
section.id = "sr-market-lab";
section.className = "wrap section";
section.innerHTML =
'<style>' +
'#sr-market-lab{scroll-margin-top:24px}#sr-market-lab .ml-shell{background:linear-gradient(145deg,#0d1b2c,#091625);border:1px solid #29445e;border-radius:22px;padding:clamp(16px,3vw,28px);box-shadow:0 18px 55px #0002}' +
'#sr-market-lab .ml-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap}#sr-market-lab .ml-eyebrow{font-size:11px;letter-spacing:1.5px;font-weight:850;color:#7cf0bd;text-transform:uppercase}#sr-market-lab h2{font-size:clamp(26px,4vw,36px);letter-spacing:-1px;margin:6px 0}#sr-market-lab h3{font-size:16px;margin:7px 0}#sr-market-lab .ml-muted{color:#9eb0c5;font-size:13px}' +
'#sr-market-lab .ml-panel{background:#ffffff06;border:1px solid #29445e;border-radius:16px;padding:17px;margin:14px 0}#sr-market-lab .ml-form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}#sr-market-lab label{display:block;font-size:13px;font-weight:750;margin-bottom:6px}#sr-market-lab input{width:100%;box-sizing:border-box;background:#081522;border:1px solid #29445e;border-radius:11px;padding:12px;color:#edf5ff;font:inherit}#sr-market-lab input:focus{outline:2px solid #7cf0bd;outline-offset:1px}' +
'#sr-market-lab button{font:inherit;cursor:pointer;border:1px solid #31516a;border-radius:11px;padding:11px 14px;background:#ffffff08;color:#edf5ff;font-weight:750;font-size:13px}#sr-market-lab button.primary{background:#7cf0bd;color:#062019;border-color:#7cf0bd}#sr-market-lab button:disabled{opacity:.5;cursor:wait}#sr-market-lab .ml-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}#sr-market-lab .ml-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}' +
'#sr-market-lab .ml-source{background:linear-gradient(145deg,#102238,#0b1929);border:1px solid #29445e;border-radius:15px;padding:15px;min-width:0}#sr-market-lab .ml-source h3{display:flex;justify-content:space-between;align-items:center;gap:8px}#sr-market-lab .ml-count{font-size:11px;color:#7cf0bd;border:1px solid #31516a;border-radius:30px;padding:4px 8px;white-space:nowrap}#sr-market-lab .ml-result{border-top:1px solid #ffffff12;padding:10px 0}#sr-market-lab .ml-result a{color:#a8d0ff;text-decoration:none;font-size:13px;font-weight:750}#sr-market-lab .ml-result a:hover{text-decoration:underline}#sr-market-lab .ml-meta{font-size:11px;color:#9eb0c5;margin-top:4px}#sr-market-lab .ml-empty{color:#9eb0c5;font-size:12px;padding:10px 0}' +
'#sr-market-lab .ml-warning{border:1px solid #80652d;background:#d8a83b12;color:#ead7a7;border-radius:12px;padding:12px;font-size:12px;margin-top:14px}#sr-market-lab .ml-status{font-size:12px;color:#b7cadb;margin-top:10px;min-height:18px}#sr-market-lab .ml-links{display:flex;gap:9px;flex-wrap:wrap;font-size:12px;margin-top:10px}#sr-market-lab .ml-links a{color:#a8d0ff}#sr-market-lab .ml-badge{font-size:10px;color:#b6c8d9;border:1px solid #31516a;border-radius:20px;padding:6px 9px}#sr-market-lab .ml-foot{font-size:11px;color:#9eb0c5;margin-top:8px}' +
'@media(max-width:850px){#sr-market-lab .ml-grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){#sr-market-lab .ml-grid{grid-template-columns:1fr}#sr-market-lab .ml-form{grid-template-columns:1fr}#sr-market-lab .ml-shell{padding:15px}}' +
'</style>' +
'<div class="ml-shell">' +
'<div class="ml-head"><div><div class="ml-eyebrow">SaaS Radar · Market Intelligence</div><h2>Le laboratoire de signaux du marché</h2><p class="ml-muted">Explore les discussions, les dépôts de code et les problèmes signalés publiquement. Chaque résultat renvoie à sa source.</p></div><span class="ml-badge">Sources publiques · Sans clé API</span></div>' +
'<div class="ml-panel"><div class="ml-form"><div><label for="ml-query">Quel problème ou secteur veux-tu explorer ?</label><input id="ml-query" maxlength="140" placeholder="Ex. : planning de révisions, gestion des associations..."></div><button class="primary" id="ml-search" type="button">Analyser les signaux ↗</button></div>' +
'<div class="ml-actions"><button id="ml-use-project" type="button">Utiliser mon projet actif</button><a id="ml-trends-link" href="https://trends.google.com/trends/" target="_blank" rel="noopener noreferrer" class="ml-badge" style="text-decoration:none;padding:10px 12px">Explorer Google Trends ↗</a><button id="ml-copy" type="button">Copier le bilan</button><button id="ml-export" type="button">Exporter le bilan .txt</button></div><div id="ml-status" class="ml-status" aria-live="polite">Saisis un thème ou charge ton projet, puis lance une recherche.</div><div class="ml-foot" id="ml-updated">Période de recherche : 180 derniers jours lorsque les sources le permettent.</div></div>' +
'<div class="ml-grid"><div class="ml-source"><h3>Discussions Hacker News <span class="ml-count" id="ml-hn-count">0 résultat</span></h3><div id="ml-hn"><p class="ml-empty">Aucune recherche effectuée.</p></div><div class="ml-foot">Discussions publiques, pas des ventes.</div></div>' +
'<div class="ml-source"><h3>Projets GitHub <span class="ml-count" id="ml-repo-count">0 résultat</span></h3><div id="ml-repos"><p class="ml-empty">Aucune recherche effectuée.</p></div><div class="ml-foot">Dépôts publics, étoiles et dates fournies par GitHub.</div></div>' +
'<div class="ml-source"><h3>Problèmes GitHub <span class="ml-count" id="ml-issue-count">0 résultat</span></h3><div id="ml-issues"><p class="ml-empty">Aucune recherche effectuée.</p></div><div class="ml-foot">Issues publiques, qui ne représentent pas tous les utilisateurs.</div></div></div>' +
'<div class="ml-warning"><b>Interprétation :</b> ces données sont des indices exploratoires, pas une étude de marché certifiée. Les discussions, étoiles GitHub et tickets techniques ne prouvent ni la taille du marché, ni l’intention de payer, ni la rentabilité. Vérifie les besoins auprès de personnes de ta cible et conserve les liens et les dates.</div>' +
'</div>';

const studio = $("#sr-studio");
if (studio && studio.parentNode) studio.parentNode.insertBefore(section, studio.nextSibling);
else if ($("main")) $("main").appendChild(section);

const input = $("#ml-query", section);
const button = $("#ml-search", section);
const status = $("#ml-status", section);
let currentReport = null;
let linkedProjectId = null;
let linkedProjectQuery = "";

function safeUrl(raw, fallback) {
  try {
    const url = new URL(String(raw || ""));
    return ["http:", "https:"].includes(url.protocol) ? url.href : fallback;
  } catch (error) { return fallback; }
}
function dateText(value) {
  if (!value) return "Date inconnue";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date inconnue" : date.toLocaleDateString("fr-FR");
}
function cutoffDate() { return new Date(Date.now() - DAYS * 86400000).toISOString().slice(0, 10); }
function getCache(query) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    const item = cache[query];
    return item && Date.now() - item.savedAt < TTL ? item.data : null;
  } catch (error) { return null; }
}
function putCache(query, report) {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    cache[query] = { savedAt: Date.now(), data: report };
    const sorted = Object.entries(cache).sort((a, b) => b[1].savedAt - a[1].savedAt).slice(0, 8);
    localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(sorted)));
  } catch (error) { /* Storage is optional. */ }
}
async function getJson(url, source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { headers: { "Accept": "application/json" }, signal: controller.signal });
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) throw new Error(source + " : limite de requêtes atteinte. Réessaie plus tard.");
      throw new Error(source + " : réponse HTTP " + response.status + ".");
    }
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") throw new Error(source + " : délai dépassé.");
    throw error;
  } finally { clearTimeout(timer); }
}
function activeProject() {
  try {
    const saved = JSON.parse(localStorage.getItem(STUDIO_KEY) || "null");
    if (!saved || !Array.isArray(saved.projects)) return null;
    return saved.projects.find(p => p && p.id === saved.activeId) || null;
  } catch (error) { return null; }
}
function projectQuery(project) {
  if (!project || !project.idea) return "";
  const a = project.answers || {};
  return [project.idea.title, project.idea.problem, a.audience || project.idea.audience].filter(Boolean).join(" ").replace(/\s+/g, " ").slice(0, 140);
}
function saveReportToProject(report) {
  if (!linkedProjectId || report.query !== linkedProjectQuery) return;
  try {
    const saved = JSON.parse(localStorage.getItem(STUDIO_KEY) || "null");
    if (!saved || !Array.isArray(saved.projects)) return;
    const project = saved.projects.find(p => p && p.id === linkedProjectId);
    if (!project) return;
    project.marketResearch = report;
    project.updatedAt = new Date().toISOString();
    localStorage.setItem(STUDIO_KEY, JSON.stringify(saved));
  } catch (error) { console.warn("Impossible de joindre les signaux au projet.", error); }
}
function updateTrendsLink(query) {
  $("#ml-trends-link", section).href = "https://trends.google.com/trends/explore?date=today%205-y&geo=FR&q=" + encodeURIComponent(query || "");
}
function renderSource(containerId, countId, items, kind) {
  const host = $("#" + containerId, section);
  $("#" + countId, section).textContent = items.length + (items.length > 1 ? " résultats" : " résultat");
  if (!items.length) {
    host.innerHTML = '<p class="ml-empty">Aucun résultat dans cette source pour cette recherche. Cela ne veut pas dire que le besoin est inexistant.</p>';
    return;
  }
  host.innerHTML = items.slice(0, 5).map(item => {
    let meta = "";
    if (kind === "hn") meta = dateText(item.created_at) + " · " + Number(item.points || 0) + " points · " + Number(item.comments || 0) + " commentaires";
    if (kind === "repo") meta = "Mis à jour " + dateText(item.updated_at) + " · " + Number(item.stars || 0) + " étoiles · " + (item.language || "Langage non indiqué");
    if (kind === "issue") meta = dateText(item.created_at) + " · " + Number(item.comments || 0) + " commentaires · " + (item.state || "État inconnu");
    return '<div class="ml-result"><a href="' + esc(safeUrl(item.url, "#")) + '" target="_blank" rel="noopener noreferrer">' + esc(item.title) + '</a>' +
      (item.description ? '<div class="ml-meta">' + esc(item.description).slice(0, 220) + '</div>' : '') +
      '<div class="ml-meta">' + esc(meta) + '</div></div>';
  }).join("");
}
function renderReport(report, cached) {
  currentReport = report;
  renderSource("ml-hn", "ml-hn-count", report.hn || [], "hn");
  renderSource("ml-repos", "ml-repo-count", report.repos || [], "repo");
  renderSource("ml-issues", "ml-issue-count", report.issues || [], "issue");
  const available = [report.hnStatus, report.repoStatus, report.issueStatus].filter(s => s === "ok").length;
  status.textContent = (cached ? "Résultats en cache · " : "Recherche terminée · ") + available + "/3 sources disponibles.";
  $("#ml-updated", section).textContent = "Recherche du " + new Date(report.fetchedAt).toLocaleString("fr-FR") + " · Période : " + DAYS + " jours · Requête : " + report.query;
  updateTrendsLink(report.query);
}
function makeSummary() {
  if (!currentReport) return "Aucune recherche effectuée.";
  const r = currentReport;
  const lines = ["SAAS RADAR — BILAN DE SIGNAUX PUBLICS","Sujet : " + r.query,"Date : " + new Date(r.fetchedAt).toLocaleString("fr-FR"),"Période : " + DAYS + " jours","","HACKER NEWS"];
  (r.hn || []).forEach(x => lines.push("- " + x.title + " | " + dateText(x.created_at) + " | " + x.points + " points | " + x.url));
  lines.push("","GITHUB — DÉPÔTS");
  (r.repos || []).forEach(x => lines.push("- " + x.title + " | " + dateText(x.updated_at) + " | " + x.stars + " étoiles | " + x.url));
  lines.push("","GITHUB — ISSUES");
  (r.issues || []).forEach(x => lines.push("- " + x.title + " | " + dateText(x.created_at) + " | " + x.comments + " commentaires | " + x.url));
  lines.push("","LIMITES","Ces signaux ne prouvent ni la demande commerciale, ni la volonté de payer, ni la rentabilité. Vérifier auprès de personnes concernées.");
  return lines.join("\n");
}
function exportText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}

async function runSearch() {
  const query = input.value.trim().replace(/\s+/g, " ").slice(0, 140);
  if (query.length < 3) { status.textContent = "Écris au moins trois caractères pour lancer une recherche."; input.focus(); return; }
  input.value = query;
  updateTrendsLink(query);
  try { localStorage.setItem(QUERY_KEY, query); } catch (error) { /* Optional. */ }
  button.disabled = true;
  button.textContent = "Recherche en cours…";
  status.textContent = "Interrogation des sources publiques…";
  const cached = getCache(query.toLowerCase());
  if (cached) {
    renderReport(cached, true);
    saveReportToProject(cached);
    button.disabled = false;
    button.textContent = "Analyser les signaux ↗";
    return;
  }
  const since = cutoffDate();
  const sinceUnix = Math.floor(Date.now() / 1000 - DAYS * 86400);
  const hnUrl = "https://hn.algolia.com/api/v1/search_by_date?" + new URLSearchParams({ query, tags: "story", numericFilters: "created_at_i>" + sinceUnix, hitsPerPage: "8" });
  const reposUrl = "https://api.github.com/search/repositories?" + new URLSearchParams({ q: query + " created:>=" + since, sort: "updated", order: "desc", per_page: "8" });
  const issuesUrl = "https://api.github.com/search/issues?" + new URLSearchParams({ q: query + " is:issue created:>=" + since, sort: "created", order: "desc", per_page: "8" });
  const outcomes = await Promise.allSettled([
    getJson(hnUrl, "Hacker News"), getJson(reposUrl, "GitHub dépôts"), getJson(issuesUrl, "GitHub issues")
  ]);
  const report = {
    query, fetchedAt: new Date().toISOString(),
    hn: outcomes[0].status === "fulfilled" && Array.isArray(outcomes[0].value.hits) ? outcomes[0].value.hits.map(x => ({
      title: x.title || x.story_title || "Discussion sans titre",
      url: safeUrl(x.url, "https://news.ycombinator.com/item?id=" + encodeURIComponent(x.objectID || "")),
      created_at: x.created_at, points: Number(x.points || 0), comments: Number(x.num_comments || 0)
    })) : [],
    repos: outcomes[1].status === "fulfilled" && Array.isArray(outcomes[1].value.items) ? outcomes[1].value.items.map(x => ({
      title: x.full_name || x.name || "Dépôt GitHub", description: x.description || "",
      url: safeUrl(x.html_url, "https://github.com/"), updated_at: x.updated_at,
      stars: Number(x.stargazers_count || 0), language: x.language || ""
    })) : [],
    issues: outcomes[2].status === "fulfilled" && Array.isArray(outcomes[2].value.items) ? outcomes[2].value.items.map(x => ({
      title: x.title || "Issue sans titre", url: safeUrl(x.html_url, "https://github.com/"),
      created_at: x.created_at, comments: Number(x.comments || 0), state: x.state || ""
    })) : [],
    hnStatus: outcomes[0].status === "fulfilled" ? "ok" : "error",
    repoStatus: outcomes[1].status === "fulfilled" ? "ok" : "error",
    issueStatus: outcomes[2].status === "fulfilled" ? "ok" : "error",
    errors: outcomes.map(o => o.status === "rejected" ? String(o.reason && o.reason.message || "Erreur inconnue") : "")
  };
  renderReport(report, false);
  const failures = report.errors.filter(Boolean);
  if (failures.length) status.textContent += " " + failures.join(" ");
  const hasData = report.hnStatus === "ok" || report.repoStatus === "ok" || report.issueStatus === "ok";
  if (hasData) putCache(query.toLowerCase(), report);
  button.disabled = false;
  button.textContent = "Analyser les signaux ↗";
}
button.addEventListener("click", runSearch);
input.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); runSearch(); } });
$("#ml-use-project", section).addEventListener("click", () => {
  const project = activeProject();
  if (!project) { status.textContent = "Aucun projet actif. Choisis d'abord une idée dans le Studio de projet."; return; }
  input.value = projectQuery(project);
  linkedProjectId = project.id;
  linkedProjectQuery = input.value;
  updateTrendsLink(input.value);
  status.textContent = "Sujet chargé depuis ton projet : " + project.idea.title + ". Tu peux modifier la recherche puis lancer l'analyse.";
});
$("#ml-copy", section).addEventListener("click", async () => {
  const summary = makeSummary();
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error("clipboard unavailable");
    await navigator.clipboard.writeText(summary);
    status.textContent = "Bilan copié.";
  } catch (error) { status.textContent = "Copie indisponible ici : utilise Exporter le bilan .txt."; }
});
$("#ml-export", section).addEventListener("click", () => exportText("bilan-signaux-saas-radar.txt", makeSummary()));

input.addEventListener("input", () => { if (linkedProjectId && input.value.trim() !== linkedProjectQuery) linkedProjectId = null; });
try {
  const previous = localStorage.getItem(QUERY_KEY);
  if (previous) input.value = previous;
} catch (error) { /* Optional. */ }
const project = activeProject();
if (project && !input.value) { input.value = projectQuery(project); linkedProjectId = project.id; linkedProjectQuery = input.value; }
if (project && project.marketResearch && project.marketResearch.query === projectQuery(project)) renderReport(project.marketResearch, true);
updateTrendsLink(input.value);
if (input.value) {
  const cached = getCache(input.value.toLowerCase());
  if (cached) renderReport(cached, true);
}
})();