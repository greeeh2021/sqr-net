
import { database } from './firebase-config.js';
import {
  ref,
  onChildAdded,
  remove,
  get,
  child,
  set,
  push
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const adminUserInput = document.getElementById("adminUser");
const adminPassInput = document.getElementById("adminPass");
const loginBtn = document.getElementById("adminLoginBtn");
const adminPanel = document.getElementById("adminPanel");
const adminLogin = document.getElementById("adminLogin");
const adminMessages = document.getElementById("adminMessages");
const userList = document.getElementById("userList");
const alertInput = document.getElementById("adminAlert");
const sendAlertBtn = document.getElementById("sendAlertBtn");

loginBtn.addEventListener("click", () => {
  const user = adminUserInput.value.trim();
  const pass = adminPassInput.value.trim();

  if (user === "saqr-net" && pass === "+++369ggg***") {
    adminPanel.style.display = "block";
    adminLogin.style.display = "none";
    loadMessages();
    loadUsers();
  } else {
    alert("بيانات الدخول غير صحيحة.");
  }
});

function loadMessages() {
  const messagesRef = ref(database, "messages");
  adminMessages.innerHTML = "";

  onChildAdded(messagesRef, (data) => {
    const { sender, text, time } = data.val();
    const msgDiv = document.createElement("div");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}
      <span style="font-size:0.8em;color:#888">(${time})</span>
      <button onclick="deleteMsg('${data.key}')">🗑 حذف</button>`;
    adminMessages.appendChild(msgDiv);
  });
}

function loadUsers() {
  const usersRef = ref(database, "users");
  get(usersRef).then((snapshot) => {
    userList.innerHTML = "";
    if (snapshot.exists()) {
      const users = snapshot.val();
      Object.keys(users).forEach((uid) => {
        const user = users[uid];
        const userDiv = document.createElement("div");
        userDiv.innerHTML = `
          👤 ${user.username || "مستخدم"} (${user.country || "?"}) - ${user.gender || "?"}
          <button onclick="banUser('${uid}')">🚫 حظر</button>
        `;
        userList.appendChild(userDiv);
      });
    } else {
      userList.innerText = "لا يوجد مستخدمون.";
    }
  });
}

window.deleteMsg = (key) => {
  const msgRef = ref(database, "messages/" + key);
  remove(msgRef).then(() => {
    alert("تم حذف الرسالة");
    location.reload();
  });
};

window.banUser = (uid) => {
  const userRef = ref(database, "bannedUsers/" + uid);
  set(userRef, true).then(() => {
    alert("تم حظر المستخدم");
  });
};

sendAlertBtn.addEventListener("click", () => {
  const alertText = alertInput.value.trim();
  if (!alertText) return;
  const alertRef = ref(database, "alerts");
  push(alertRef, {
    from: "الأدمن",
    text: alertText,
    time: new Date().toLocaleTimeString()
  }).then(() => {
    alert("تم إرسال التنبيه");
    alertInput.value = "";
  });
});
