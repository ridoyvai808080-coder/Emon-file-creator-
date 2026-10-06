const $ = (s) => document.querySelector(s);

const loginView = $("#loginView");
const panelView = $("#panelView");
const loginForm = $("#loginForm");
const keyInput = $("#keyInput");
const loginStatus = $("#loginStatus");
const engineText = $("#engineText");
const engineDot = $("#engineDot");
const engineMessage = $("#engineMessage");

function showPanel(key) {
  loginView.classList.add("hidden");
  panelView.classList.remove("hidden");
  $("#activationKey").textContent = key ? `Key: ${key.slice(0, 4)}••••${key.slice(-3)}` : "Key validated";
}

function showLogin() {
  panelView.classList.add("hidden");
  loginView.classList.remove("hidden");
  keyInput.value = "";
  loginStatus.textContent = "";
  loginStatus.className = "status";
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const key = keyInput.value.trim();
  if (!key) return;

  const correctPassword = "emon13";

  if (key !== correctPassword) {
    loginStatus.textContent = "Wrong password.";
    loginStatus.className = "status err";
    return;
  }

  loginStatus.textContent = "Password accepted.";
  loginStatus.className = "status ok";
  localStorage.setItem("stirlaxKey", key);
  setTimeout(() => showPanel(key), 350);
});

$("#freeKeyBtn").addEventListener("click", () => {
  loginStatus.textContent = "Add your key-provider URL in app.js to enable this button.";
  loginStatus.className = "status";
});

$("#startBtn").addEventListener("click", () => {
  engineText.textContent = "RUNNING";
  engineDot.classList.add("running");
  engineMessage.textContent = "Engine started successfully.";
  engineMessage.className = "status ok";
});

$("#stopBtn").addEventListener("click", () => {
  engineText.textContent = "STOPPED";
  engineDot.classList.remove("running");
  engineMessage.textContent = "Engine stopped.";
  engineMessage.className = "status";
});

$("#logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("stirlaxKey");
  showLogin();
});


const savedKey = localStorage.getItem("stirlaxKey");
if (savedKey) showPanel(savedKey);
