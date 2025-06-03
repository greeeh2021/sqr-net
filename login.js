
import { auth, database } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;
  const birth = document.getElementById("birth").value;
  const country = document.getElementById("country").value;
  const nationality = document.getElementById("nationality").value;
  const gender = document.getElementById("gender").value;

  if (!username || !password) return alert("يرجى إدخال اسم المستخدم وكلمة المرور");

  try {
    const email = username + "@saqr.com";
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await set(ref(database, "users/" + userId), {
      username,
      age,
      birth,
      country,
      nationality,
      gender,
      type: "member"
    });

    alert("تم التسجيل بنجاح!");
    window.location.href = "chat.html";
  } catch (error) {
    alert("حدث خطأ: " + error.message);
  }
});

document.getElementById("guestBtn").addEventListener("click", () => {
  sessionStorage.setItem("guest", "true");
  window.location.href = "chat.html";
});
