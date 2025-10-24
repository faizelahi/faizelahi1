// Typewriter effect for header
const text = "Faiz Elahi — Security Researcher | Threat Hunter | DFIR | SOC | Google CyberSec Certified | Curious Learner";
const typewriter = document.getElementById("typewriter");
let i = 0;
function type() {
  if (i < text.length) {
    typewriter.innerHTML = text.substring(0, i + 1) + "<span class='cursor'>|</span>";
    i++;
    setTimeout(type, 40);
  } else {
    document.querySelector(".cursor").style.display = "none";
  }
}
type();

// Section switching
const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll(".section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});
