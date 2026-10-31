/* ============================================================
CampConnect | data.js
ฝั่งข้อมูล: โปรไฟล์ของเจ้าของเว็บ (ME) และโปรไฟล์ตัวอย่างสมมติ (DEMO)
อยากเพิ่มหรือแก้โปรไฟล์ ให้แก้ที่ไฟล์นี้ไฟล์เดียว (ยังไม่มีฐานข้อมูลจริง)
============================================================ */

/* ===== 1) ข้อมูลของเจ้าของเว็บ (แก้ได้) ===== */
const ME = {
  name: "มิ้งค์",
  year: "1st year Student",
  institution: "Faculty of Science, Silpakorn University", // ถ้าไม่สะดวกบอก ให้ลบข้อความเป็น ""
  major: "Marketing",
  major2: "Programming",   // เมเจอร์ที่สอง (ถ้าไม่มีให้ลบบรรทัดนี้)
  photo: "images/me.jpg",   // วางรูปของคุณไว้ที่ images/me.jpg
  // แนะนำตัว: เล่าความชอบ ทักษะ เป้าหมายในอนาคต และเพื่อนที่อยากเจอ (1-3 ประโยค)
  bio: "มุ่งมั่นในโลกของ Marketing & Tech เข้าด้วยกัน ชื่นชอบการวิเคราะห์ Consumer Data การทำ PR Campaign และการพัฒนา Web Application",
  skills: ["C Programming", "Python", "HTML/CSS"],           // เพิ่ม-ลดให้ตรงกับที่ทำได้จริง
  interests: ["Consumer Data Analysis", "PR Campaign", "Web Application"],
  lookingFor: ["Marketing", "Programming"],   // เลือกได้หลายเมเจอร์ที่อยากเจอ (ถ้ารวมเมเจอร์ตัวเอง = หาเพื่อนสายเดียวกัน)
  contacts: [
    { label: "Instagram: ohmxnk_", url: "https://instagram.com/ohmxnk_" }
  ],
  isMe: true
};

/* ===== 2) โปรไฟล์ตัวอย่าง (สมมติทั้งหมด ไม่ใช่บุคคลจริง) ===== */
const DEMO = [
  {name:"น้ำใส (ตัวอย่าง)", year:"ปี 1", major:"Design", lookingFor:["Programming","Content"], skills:["Figma","Illustrator","Poster Design"], interests:["UI สำหรับมือถือ","งานภาพประกอบ"], bio:"ชอบวาดภาพและออกแบบหน้าเว็บให้ใช้ง่าย ฝันอยากเป็น UI Designer ที่ทำแอปให้คนใช้แล้วยิ้มได้ อยากหาเพื่อนสายโค้ดมาช่วยทำให้ดีไซน์ขยับได้จริง", contacts:["Instagram: xxxxx"]},
  {name:"พีท (ตัวอย่าง)", year:"ปี 2", institution:"มหาวิทยาลัยตัวอย่าง", major:"Programming", lookingFor:["Programming"], skills:["JavaScript","Git","Node.js"], interests:["API","Open Source"], bio:"ชอบแก้โจทย์และเล่นกับ API กำลังหัดทำเว็บเต็มรูปแบบ เป้าหมายคืออยากเป็น Full-stack Developer อยากหาเพื่อนสายโค้ดไว้ช่วยกัน debug และรีวิวโค้ด", contacts:["LINE: xxxxx"]},
  {name:"มายด์ (ตัวอย่าง)", year:"ปี 1", major:"Marketing", major2:"Content", lookingFor:["Marketing","Programming"], skills:["Canva","Content Calendar","Survey Design"], interests:["Brand Storytelling","Consumer Insight"], bio:"สนใจการสื่อสารแบรนด์และพฤติกรรมผู้บริโภค อยากรู้ว่าเว็บแบบไหนทำให้คนกลับมาใช้ซ้ำ ในอนาคตอยากทำงานด้าน Digital Marketing อยากคุยกับทั้งสายการตลาดและสายโค้ด", contacts:["Facebook: xxxxx","Instagram: xxxxx"]},
  {name:"ก้อง (ตัวอย่าง)", year:"ปี 3", institution:"มหาวิทยาลัยตัวอย่าง", major:"Content", lookingFor:["Content"], skills:["Copywriting","Storytelling","Video Editing"], interests:["บทความสายเทค","Podcast"], bio:"ชอบเขียนบทความสายเทคและเล่าเรื่องให้เข้าใจง่าย ฝันอยากมีพอดแคสต์ของตัวเอง อยากแลกเทคนิคเล่าเรื่องกับเพื่อนสายคอนเทนต์", contacts:["X: xxxxx"]},
  {name:"ฟ้า (ตัวอย่าง)", year:"ปี 2", major:"Design", lookingFor:["Design"], skills:["UI/UX","Prototyping"], interests:["Design System","Accessibility"], bio:"ฝึกทำ UI เว็บมือถือและสนใจเรื่อง Accessibility เป้าหมายคืออยากทำ Design System ที่ทุกคนใช้ได้ อยากได้เพื่อนสายดีไซน์ช่วยวิจารณ์งานตรงๆ", contacts:[]},
  {name:"เบนซ์ (ตัวอย่าง)", year:"ปี 1", institution:"มหาวิทยาลัยตัวอย่าง", major:"Programming", major2:"Design", lookingFor:["Design","Content"], skills:["HTML/CSS","React","Python"], interests:["Frontend","Game Dev"], bio:"ชอบทำฟรอนต์เอนด์และเกมเล็กๆ กำลังฝึก React อยากทำเว็บเกมของตัวเองให้เสร็จสักชิ้น ยังขาดคนช่วยออกแบบและเขียนข้อความบนเว็บ", contacts:["Instagram: xxxxx"]},
  {name:"ใบเตย (ตัวอย่าง)", year:"ปี 2", major:"Content", lookingFor:["Programming","Design"], skills:["UX Writing","Interview"], interests:["Educational Content","Newsletter"], bio:"ชอบเขียนข้อความบนเว็บให้อ่านง่ายและชอบสัมภาษณ์คน ฝันอยากเป็น UX Writer อยากทำงานเป็นทีมกับสายโค้ดและดีไซน์", contacts:[]},
  // ตัวอย่างโปรไฟล์ที่กรอกข้อมูลน้อย: ช่องที่ไม่บังคับถูกเว้นว่าง การ์ดจะซ่อนส่วนนั้นเอง
  {name:"แพรว (ตัวอย่าง)", year:"ปี 1", major:"Content", skills:["Copywriting"]},
  {name:"ภูมิ (ตัวอย่าง)", major:"Programming", skills:["Python","SQL"], lookingFor:["Design"], contacts:["Instagram: xxxxx"]},
  {name:"ออม (ตัวอย่าง)", year:"ปี 2", institution:"มหาวิทยาลัยตัวอย่าง", major:"Marketing", bio:"แค่อยากมาทำความรู้จักเพื่อนๆ ในค่าย ใครสนใจเรื่องแบรนด์ทักมาคุยกันได้", contacts:["LINE: xxxxx"]},
  {name:"นนท์ (ตัวอย่าง)", major:"Design"}
];

