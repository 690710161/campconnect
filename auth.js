/* ============================================================
CampConnect | auth.js
ฝั่งหน้าเข้าสู่ระบบ/สมัครบัญชี (เดโมเท่านั้น ไม่ส่งและไม่บันทึกข้อมูล)
มีฟอร์ม 2 ขั้นตอน และสวิตช์ DEMO_SKIP_VALIDATION สำหรับโชว์เดโม
============================================================ */

/* ===== 7) หน้า Login / สร้างบัญชี (เดโมเท่านั้น: ไม่ส่งและไม่บันทึกข้อมูลใดๆ) ===== */
const auth = document.getElementById("auth");

// เปิด true = กด "ถัดไป" ข้ามขั้นที่ 1 ได้เลยโดยไม่ต้องกรอก (ไว้โชว์เดโม)
// ปิด false = กลับไปตรวจช่องบังคับตามปกติ
const DEMO_SKIP_VALIDATION = true;

function demoMsg(t){ document.getElementById("authMsg").textContent = t; }
function showPane(id){
  ["loginPane","signupPane"].forEach(x => { document.getElementById(x).hidden = (x !== id); });
  auth.querySelectorAll("[data-eye]").forEach(b => { document.getElementById(b.dataset.eye).type = "password"; b.textContent = "แสดง"; });
  showStep(1);
}
document.getElementById("openAuth").addEventListener("click", () => { showPane("loginPane"); auth.showModal(); });
document.getElementById("closeAuth").addEventListener("click", () => auth.close());
auth.addEventListener("click", e => {
  const a = e.target.closest("[data-pane]");
  if (a) { e.preventDefault(); showPane(a.dataset.pane); }
  const eye = e.target.closest("[data-eye]");
  if (eye) {  // ปุ่มแสดง/ซ่อนรหัสผ่าน
    const input = document.getElementById(eye.dataset.eye);
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    eye.textContent = show ? "ซ่อน" : "แสดง";
  }
});
document.getElementById("forgot").addEventListener("click", e => {
  e.preventDefault();
  demoMsg("นี่คือหน้าตัวอย่าง ยังไม่มีระบบรีเซ็ตรหัสผ่านจริง");
});
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  demoMsg("นี่คือหน้าตัวอย่าง ยังไม่ได้เข้าสู่ระบบจริง และไม่มีข้อมูลถูกส่งหรือบันทึก");
});
// สมัครบัญชี 2 ขั้นตอน: ขั้นที่ 1 ข้อมูลหลัก / ขั้นที่ 2 ข้อมูลเพิ่มเติม (ไม่บังคับ)
const signupForm = document.getElementById("signupForm");
let signupStep = 1;
function showStep(n){
  signupStep = n;
  document.getElementById("step1").hidden = n !== 1;
  document.getElementById("step2").hidden = n !== 2;
  document.getElementById("dot1").className = "dot " + (n === 1 ? "on" : "done");
  document.getElementById("dot2").className = "dot " + (n === 2 ? "on" : "");
  demoMsg("");
  auth.scrollTop = 0;
}
function step1Valid(){
  if (DEMO_SKIP_VALIDATION) return true;   // โหมดเดโม: ข้ามการตรวจ
  for (const el of document.querySelectorAll("#step1 input, #step1 select")) {
    if (!el.reportValidity()) return false;   // เบราว์เซอร์แสดงข้อความเตือนที่ช่องแรกที่ยังไม่ผ่าน
  }
  const f = new FormData(signupForm);
  if (f.get("pw") !== f.get("pw2")) { demoMsg("รหัสผ่านทั้งสองช่องไม่ตรงกัน"); return false; }
  return true;
}
document.getElementById("backStep").addEventListener("click", () => showStep(1));
// ปุ่ม "ถัดไป": คลิกแล้วไปขั้นที่ 2 โดยตรง (ไม่พึ่งการ submit ฟอร์ม)
document.getElementById("nextStep").addEventListener("click", () => { if (step1Valid()) showStep(2); });
// เมเจอร์ที่สองต้องไม่ซ้ำกับเมเจอร์แรก: ปิดตัวเลือกที่ซ้ำให้อัตโนมัติ
const majorSel = signupForm.elements.major, minorSel = document.getElementById("minorSel");
majorSel.addEventListener("change", () => {
  [...minorSel.options].forEach(o => { o.disabled = o.value !== "" && o.text === majorSel.value; });
  if (minorSel.selectedOptions[0].disabled) minorSel.value = "";
});
signupForm.addEventListener("submit", e => {
  e.preventDefault();   // ฟอร์มนี้ไม่ส่งข้อมูลไปไหน
  if (signupStep === 1) { if (step1Valid()) showStep(2); return; }
  if (!DEMO_SKIP_VALIDATION && !signupForm.elements.consent.reportValidity()) return;
  signupForm.reset();
  showPane("signupPane");   // รีเซ็ตกลับไปขั้นที่ 1
  demoMsg("นี่คือหน้าตัวอย่าง ยังไม่ได้สร้างบัญชีจริง และไม่มีข้อมูลถูกส่งหรือบันทึก");
});
