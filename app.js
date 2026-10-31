/* ============================================================
CampConnect | app.js
ฝั่งตรรกะหลัก: ตัวกรอง/ค้นหา (matches), สร้างการ์ด (cardHTML), วาดหน้าจอ (render),
แท็บเมเจอร์ และแบบทดสอบ Match Quiz
ต้องโหลดต่อจาก data.js
============================================================ */

/* ===== 3) ตัวแปรและค่าคงที่ ===== */
const MAJORS = ["Design","Programming","Marketing","Content"];
const LOOK_TEXT = {same:"หาเพื่อนสายเดียวกัน", other:"หาเพื่อนต่างสาย", both:"หาทั้งสายเดียวกันและต่างสาย"};
const COLORS = {Design:"#ea580c",Programming:"#1d4ed8",Marketing:"#a16207",Content:"#0f766e"};
const state = {major:"all", look:"all", q:""};

/* ===== 4) ฟังก์ชันช่วย ===== */
// สรุปว่าโปรไฟล์นี้หาเพื่อนแบบไหน จากรายการเมเจอร์ที่เลือกไว้ใน lookingFor
function lookType(p){
  if (!p.lookingFor || !p.lookingFor.length) return null;   // ไม่ได้กรอกช่องนี้
  const same = p.lookingFor.includes(p.major);
  const other = p.lookingFor.some(m => m !== p.major);
  return same && other ? "both" : same ? "same" : "other";
}

// กัน XSS: แปลงข้อความให้ปลอดภัยก่อนใส่ใน HTML
function esc(s){ const d = document.createElement("div"); d.textContent = s ?? ""; return d.innerHTML; }

// อวาตาร์ไม่มีหน้า สีตามเมเจอร์ (SVG ที่วาดเอง ไม่มีลิขสิทธิ์)
function avatarFor(major){
  const c = COLORS[major] || "#94a3b8";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 62"><rect width="62" height="62" fill="#e9ecf3"/><circle cx="31" cy="24" r="11" fill="${c}"/><path d="M8 62c0-13 10-22 23-22s23 9 23 22z" fill="${c}"/></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

// ตัวกรอง: คืนค่า true ถ้าโปรไฟล์ผ่านทุกเงื่อนไข
function matches(p){
  if (MAJORS.includes(state.major) && p.major !== state.major) return false;
  if (state.look !== "all" && lookType(p) !== state.look && lookType(p) !== "both") return false;
  const q = state.q.trim().toLowerCase();
  if (q) {
    const text = [p.name, ...(p.skills || []), ...(p.interests || [])].join(" ").toLowerCase();
    if (!text.includes(q)) return false;
  }
  return true;
}

/* ===== 5) สร้างการ์ดและแสดงผล ===== */
function contactHTML(c){
  if (typeof c === "string") return `<span class="ct">${esc(c)}</span>`; // ข้อมูลตัวอย่าง: ข้อความธรรมดา ไม่เป็นลิงก์
  return `<a class="ct" target="_blank" rel="noopener" href="${esc(c.url)}">${esc(c.label)}</a>`;
}

function cardHTML(p){
  // ช่องที่ไม่บังคับ: ถ้าไม่ได้กรอก จะไม่แสดงส่วนนั้นบนการ์ด
  const roleLine = [p.year, p.institution].filter(Boolean).join(", ");
  const majorLine = p.major2 ? `Major ${p.major} & ${p.major2}` : `Major ${p.major}`;
  const tags = (arr, cls) => arr.map(t => `<span class="tag ${cls}">${esc(t)}</span>`).join("");
  const role = roleLine ? `<p class="role">${esc(roleLine)}</p>` : "";
  const intro = p.bio ? `<section class="intro" style="--tc:${COLORS[p.major]}" aria-label="แนะนำตัว">
      <div class="intro-h">
        <span class="intro-ic"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M4 5h16v11H10l-6 4z"/></svg></span>
        <div class="intro-t">แนะนำตัว<small>ความชอบ ทักษะ เป้าหมาย และเพื่อนที่อยากเจอ</small></div>
      </div>
      <p>${esc(p.bio)}</p>
    </section>` : "";
  const skills = p.skills && p.skills.length
    ? `<div class="lbl">SKILLS &amp; EXPERTISE</div><div class="tags">${tags(p.skills, "")}</div>` : "";
  const interests = p.interests && p.interests.length
    ? `<div class="lbl">INTERESTS</div><div class="tags">${tags(p.interests, "i")}</div>` : "";
  const looking = p.lookingFor && p.lookingFor.length
    ? `<div class="lbl">LOOKING FOR</div>
    <div class="tags">${p.lookingFor.map(m => `<span class="tag m" style="--tc:${COLORS[m]}">${esc(m)}</span>`).join("")}</div>
    <div class="look"><b>${LOOK_TEXT[lookType(p)]}</b></div>` : "";
  const contacts = p.contacts && p.contacts.length
    ? `<div class="contacts">${p.contacts.map(contactHTML).join("")}</div>` : "";
  return `<article class="card ${p.isMe ? "me" : ""}">
    ${p.isMe ? '<span class="spot">★ เจ้าของเว็บ</span>' : ""}
    <div class="head">
      <img class="avatar" src="${esc(p.photo || avatarFor(p.major))}" alt="" onerror="this.onerror=null;this.src='${avatarFor(p.major)}'">
      <div><p class="name">${esc(p.name)}</p>${role}<p class="major">${esc(majorLine)}</p></div>
    </div>
    ${intro}
    ${skills}
    ${interests}
    ${looking}
    ${contacts}
  </article>`;
}

function render(){
  const list = [ME, ...DEMO].filter(matches);
  const note = state.look !== "all" ? ` · ตัวกรองจากแบบทดสอบ: ${LOOK_TEXT[state.look]} (กดแท็บเพื่อล้าง)` : "";
  document.getElementById("count").textContent = `พบ ${list.length} โปรไฟล์` + note;
  document.getElementById("grid").innerHTML = list.length
    ? list.map(cardHTML).join("")
    : '<p class="empty">ไม่พบโปรไฟล์ที่ตรงกับตัวกรอง ลองเปลี่ยนเมเจอร์หรือคำค้นหา</p>';
}

// ไอคอนของแต่ละแท็บ (SVG เส้นที่วาดเอง) และสีประจำเมเจอร์
const TABS = [
  {v:"all", label:"All", color:"#0f1f3d", icon:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'},
  {v:"Design", label:"Design", color:COLORS.Design, icon:'<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>'},
  {v:"Programming", label:"Programming", color:COLORS.Programming, icon:'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>'},
  {v:"Marketing", label:"Marketing", color:COLORS.Marketing, icon:'<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>'},
  {v:"Content", label:"Content", color:COLORS.Content, icon:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 8h3M9 12h7M9 16h7"/>'}
];

// วาดแท็บเมเจอร์ พร้อมตัวเลขจำนวนโปรไฟล์ของแต่ละสาย
function renderTabs(){
  const all = [ME, ...DEMO];
  document.getElementById("tabs").innerHTML = TABS.map(t => {
    const n = t.v === "all" ? all.length : all.filter(p => p.major === t.v).length;
    return `<button class="tab" style="--tc:${t.color}" data-v="${t.v}" aria-pressed="${state.major === t.v}">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t.icon}</svg>
      <span>${t.label}</span><span class="n">${n}</span></button>`;
  }).join("");
}

/* ===== 6) อีเวนต์ ===== */
document.getElementById("tabs").addEventListener("click", e => {
  const b = e.target.closest(".tab");
  if (!b) return;
  state.major = b.dataset.v;
  state.look = "all"; // กดแท็บ = ล้างตัวกรองที่มาจากแบบทดสอบ
  renderTabs(); render();
});
document.getElementById("search").addEventListener("input", e => { state.q = e.target.value; render(); });

const quiz = document.getElementById("quiz");
document.getElementById("openQuiz").addEventListener("click", () => quiz.showModal());
document.getElementById("closeQuiz").addEventListener("click", () => quiz.close());
document.getElementById("quizForm").addEventListener("submit", () => {
  const f = new FormData(document.getElementById("quizForm"));
  state.major = f.get("q1");
  state.look = f.get("q2");
  renderTabs(); render();
  document.getElementById("count").scrollIntoView({behavior:"smooth"});
});


/* เริ่มต้นแสดงผลครั้งแรกเมื่อโหลดหน้า */
renderTabs();
render();
