
import { database } from './firebase-config.js';
import {
  ref,
  push,
  onChildAdded,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// التحقق من تسجيل المستخدم
const currentUser = JSON.parse(localStorage.getItem("user"));
if (!currentUser || !currentUser.uid) {
  alert("يجب تسجيل الدخول أولاً.");
  location.href = "login.html";
}

const messagesRef = ref(database, "messages");
const alertsRef = ref(database, "alerts");
const bannedRef = ref(database, "bannedUsers");

const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const userStatus = document.getElementById("userStatus");

userStatus.textContent = "مرحباً " + currentUser.username + " ( " + currentUser.role + " )";

// التحقق من الحظر
let isBanned = false;
get(child(bannedRef, currentUser.uid)).then(snapshot => {
  if (snapshot.exists()) {
    isBanned = true;
    msgInput.disabled = true;
    sendBtn.disabled = true;
    msgInput.placeholder = "تم حظرك من قبل الأدمن.";
  }
});

// تحميل التنبيهات العامة
onChildAdded(alertsRef, (data) => {
  const alert = data.val();
  const alertDiv = document.createElement("div");
  alertDiv.style.color = "#ff0";
  alertDiv.style.background = "#333";
  alertDiv.style.padding = "5px";
  alertDiv.innerHTML = `🔔 <strong>${alert.from}:</strong> ${alert.text} <small style="color:#999">(${alert.time})</small>`;
  chatMessages.appendChild(alertDiv);
});

// تحميل الرسائل
onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text} <span style="font-size:0.8em;color:#888">(${msg.time})</span>`;
  chatMessages.appendChild(msgDiv);
});

// إرسال الرسالة
sendBtn.addEventListener("click", () => {
  const msg = msgInput.value.trim();
  if (!msg || isBanned) return;
  push(messagesRef, {
    sender: currentUser.username || "مستخدم",
    text: msg,
    time: new Date().toLocaleTimeString()
  }).then(() => {
    msgInput.value = "";
  });
});


// تنبيه صوتي عند وصول تنبيه جديد
const alertSound = new Audio("assets/alert.mp3");

onChildAdded(alertsRef, (data) => {
  const alert = data.val();
  const alertDiv = document.createElement("div");
  alertDiv.style.color = "#ff0";
  alertDiv.style.background = "#333";
  alertDiv.style.padding = "5px";
  alertDiv.innerHTML = `🔔 <strong>${alert.from}:</strong> ${alert.text} <small style="color:#999">(${alert.time})</small>`;
  chatMessages.appendChild(alertDiv);
  alertSound.play().catch(e => console.log("Muted alert (autoplay restriction)."));
});
