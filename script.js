// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

toggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  toggle.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

// AUDIO
const bgAudio = document.getElementById("bgAudio");
bgAudio.volume = 0.05;

// LOADER → START AUDIO
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("text-sequence").classList.remove("hidden");

    // Play ambient audio (requires user interaction later if browser blocks)
    bgAudio.play().catch(() => {});
  }, 3000);
});

// PANEL FLOW
function goNext(n) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  document.getElementById(`c${n}`).classList.add("active");

  // Ensure audio is playing while reading
  if (bgAudio.paused) {
    bgAudio.play().catch(() => {});
  }
}

function showVideo() {
  // STOP BACKGROUND AUDIO
  bgAudio.pause();
  bgAudio.currentTime = 0;

  document.getElementById("text-sequence").style.display = "none";
  const section = document.getElementById("video-section");
  section.classList.add("active");

  const video = document.getElementById("messageVideo");
  video.muted = false;
  video.volume = 1;
  video.play().catch(() => {});
}
