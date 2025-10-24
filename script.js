/* ---------------- Boot Animation ---------------- */
setTimeout(() => {
  document.getElementById('boot').style.display = 'none';
  document.getElementById('main').style.display = 'block';
  startTypewriter();
  startMatrix();
  initExpandableCards();
}, 4000); // 4 seconds boot animation

/* ---------------- Typewriter Header ---------------- */
const headerText = "Faiz Elahi | Security Researcher | Threat Hunter | DFIR | SOC | Google CyberSec Certified | Curious Learner";
let typeIndex = 0;

function startTypewriter() {
  const el = document.getElementById("typewriter");
  function type() {
    if (typeIndex < headerText.length) {
      el.innerHTML = headerText.substring(0, typeIndex + 1) + '<span class="cursor"></span>';
      typeIndex++;
      setTimeout(type, 30);
    } else {
      document.querySelector(".cursor").style.display = "none";
    }
  }
  type();
}

/* ---------------- Sidebar Section Switching ---------------- */
const buttons = document.querySelectorAll(".sidebar button");
const sections = document.querySelectorAll(".section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});

/* ---------------- Expandable/Collapsible Cards ---------------- */
function initExpandableCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const p = card.querySelector('p');
    if (p.textContent.length > 100) {
      const shortText = p.textContent.substring(0, 100) + '...';
      const fullText = p.textContent;
      p.textContent = shortText;
      const toggle = document.createElement('span');
      toggle.textContent = ' [Read More]';
      toggle.style.color = '#ff3c3c';
      toggle.style.cursor = 'pointer';
      toggle.addEventListener('click', () => {
        if (p.textContent === shortText) {
          p.textContent = fullText;
          toggle.textContent = ' [Show Less]';
        } else {
          p.textContent = shortText;
          toggle.textContent = ' [Read More]';
        }
        p.appendChild(toggle);
      });
      p.appendChild(toggle);
    }
  });
}

/* ---------------- Smooth Scroll Animation ---------------- */
sections.forEach(section => {
  section.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
});

/* ---------------- Matrix Rain Background ---------------- */
function startMatrix() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrixCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const letters = Array(256).join("1").split("");
  const fontSize = 14;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(33 + Math.random() * 94);
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if(drops[i]*fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ---------------- Dynamic Content Generator (Simulate Hundreds of Entries) ---------------- */
function generateDummyEntries() {
  const projectsSection = document.getElementById('projects');
  for (let i = 0; i < 50; i++) { // 50 dummy projects
    const card = document.createElement('div');
    card.className = 'card';
    const h3 = document.createElement('h3');
    h3.textContent = `Project ${i+1}`;
    const p = document.createElement('p');
    p.textContent = `This is a detailed description of project ${i+1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'tags';
    const tags = ['Python','Security','Automation'];
    tags.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t;
      tagsDiv.appendChild(span);
    });
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(tagsDiv);
    projectsSection.appendChild(card);
  }

  // Similar dynamic generation for Bug Bounties
  const bountiesSection = document.getElementById('bounties');
  for (let i = 0; i < 50; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    const h3 = document.createElement('h3');
    h3.textContent = `Bug Bounty ${i+1}`;
    const p = document.createElement('p');
    p.textContent = `Detailed write-up for bug bounty ${i+1}, including reproduction steps and mitigation suggestions.`;
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'tags';
    ['XSS','SQLi','CSRF'].forEach(t => {
      const span = document.createElement('span');
      span.textContent = t;
      tagsDiv.appendChild(span);
    });
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(tagsDiv);
    bountiesSection.appendChild(card);
  }

  initExpandableCards();
}

/* ---------------- Call Dynamic Content Generator ---------------- */
generateDummyEntries();

/* ---------------- Additional Animations Placeholder ---------------- */
// You can add more animations like fadeIn sections, hover matrix effects, etc.
