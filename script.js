/* ---------------- Safety Wrapper & Helpers ---------------- */
(function () {
  try {
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    const debounce = (func, wait) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); }; };

    /* ---------------- Boot Animation ---------------- */
    setTimeout(() => {
      $('#boot').style.display = 'none';
      $('#app').style.display = 'block';
      startTypewriter();
      startMatrix();
      initExpandableCards();
      initScrollAnimations();
      initSearch();
      initThemeToggle();
      initContactForm();
      initPagination();
      initModals();
      initSlider();
      generateDummyEntries();
      initKeyboardNav();
      $('#year').textContent = new Date().getFullYear();
    }, 4000); // 4 seconds boot animation

    /* ---------------- Typewriter Header ---------------- */
    const headerText = "Faiz Elahi | Security Researcher | Threat Hunter | DFIR | SOC | Google CyberSec Certified | Curious Learner";
    let typeIndex = 0;

    function startTypewriter() {
      const el = $("#typewriter");
      if (!el) return;
      function type() {
        if (typeIndex < headerText.length) {
          el.innerHTML = headerText.substring(0, typeIndex + 1) + '<span class="cursor"></span>';
          typeIndex++;
          setTimeout(type, 30);
        } else {
          $(".cursor").style.display = "none";
        }
      }
      type();
    }

    /* ---------------- Sidebar Section Switching ---------------- */
    const buttons = $$(".sidebar button");
    const sections = $$(".section");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        sections.forEach(s => s.classList.remove("active"));
        $(`#${btn.dataset.section}`).classList.add("active");
        // Scroll to top of content
        $("#content").scrollTop = 0;
      });
    });

    /* ---------------- Expandable/Collapsible Cards ---------------- */
    function initExpandableCards() {
      const cards = $$('.card');
      cards.forEach(card => {
        const p = card.querySelector('p');
        if (p && p.textContent.length > 100) {
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
          $(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
      });
    });

    /* ---------------- Matrix Rain Background (Enhanced) ---------------- */
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
      let colorCycle = 0;

      function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0,0,width,height);
        // Cycle colors for variety
        const colors = ['#0f0', '#00ff88', '#0ff'];
        ctx.fillStyle = colors[colorCycle % colors.length];
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(33 + Math.random() * 94);
          ctx.fillText(text, i*fontSize, drops[i]*fontSize);
          if(drops[i]*fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        colorCycle++;
      }
      setInterval(draw, 50);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });
    }

    /* ---------------- Dynamic Content Generator (Enhanced for Multiple Sections) ---------------- */
    function generateDummyEntries() {
      // Projects (with pagination support)
      const projectsContainer = $('#projectsContainer');
      if (projectsContainer) {
        for (let i = 0; i < 120; i++) {
          const card = document.createElement('div');
          card.className = 'card';
          card.dataset.index = i;
          const h3 = document.createElement('h3');
          h3.textContent = `Project ${i+1} — Recon & Analysis`;
          const p = document.createElement('p');
          p.textContent = `Dummy: Project ${i+1}: Built an automated recon pipeline that maps endpoints, finds hidden params, and generates prioritized test lists. Implementation details include custom heuristics, concurrency controls, and integration with passive DNS sources.`;
          const tagsDiv = document.createElement('div');
          tagsDiv.className = 'tags';
          ['Python','Recon','Automation'].forEach(t => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = t;
            tagsDiv.appendChild(span);
          });
          card.appendChild(h3);
          card.appendChild(p);
          card.appendChild(tagsDiv);
          card.addEventListener('click', () => openModal(`Project ${i+1}`, p.textContent, 'https://via.placeholder.com/300x200?text=Project+Image'));
          projectsContainer.appendChild(card);
        }
      }

      // Bounties
      const bountiesContainer = $('#bountiesContainer');
      if (bountiesContainer) {
        for (let i = 0; i < 80; i++) {
          const card = document.createElement('div');
          card.className = 'card';
          card.dataset.index = i;
          const h3 = document.createElement('h3');
          h3.textContent = `Bounty ${i+1} — Vulnerability Report`;
          const p = document.createElement('p');
          p.textContent = `Dummy: Bounty ${i+1}: Discovered a medium-high severity issue (XSS/SQLi/CSRF) depending on target. Provided reproduction steps, PoC payloads, and recommended fixes (input validation, prepared statements, CSP).`;
          const tagsDiv = document.createElement('div');
          tagsDiv.className = 'tags';
          ['XSS','Web'].forEach(t => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = t;
            tagsDiv.appendChild(span);
          });
          card.appendChild(h3);
          card.appendChild(p);
          card.appendChild(tagsDiv);
          bountiesContainer.appendChild(card);
        }
      }

      // Write-ups
      const writeupsContainer = $('#writeupsContainer');
      if (writeupsContainer) {
        for (let i = 0; i < 50; i++) {
          const card = document.createElement('div');
          card.className = 'card';
          const h3 = document.createElement('h3');
          h3.textContent = `Write-up ${i+1} — Lab Challenge`;
          const p = document.createElement('p');
          p.textContent = `Dummy: A detailed write-up covering attack chain, payloads, mitigations, and lessons learned. This write-up includes code snippets, payload encodings, and defensive guidance.`;
          const tagsDiv = document.createElement('div');
          tagsDiv.className = 'tags';
          ['Write-up','Lab','Guide'].forEach(t => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = t;
            tagsDiv.appendChild(span);
          });
          card.appendChild(h3);
          card.appendChild(p);
          card.appendChild(tagsDiv);
          writeupsContainer.appendChild(card);
        }
      }

      // Blog
      const blogContainer = $('#blogContainer');
      if (blogContainer) {
        for (let i = 0; i < 10; i++) {
          const card = document.createElement('div');
          card.className = 'card';
          const h3 = document.createElement('h3');
          h3.textContent = `Blog Post ${i+1} — Cybersecurity Trends`;
          const p = document.createElement('p');
          p.textContent = `Dummy: Exploring the latest in threat hunting and DFIR. This post discusses emerging vulnerabilities, best practices, and real-world case studies.`;
          card.appendChild(h3);
          card.appendChild(p);
          blogContainer.appendChild(card);
        }
      }

      // Timeline
      const timelineContainer = $('#timelineContainer');
      if (timelineContainer) {
        for (let i = 0; i < 10; i++) {
          const card = document.createElement('div');
          card.className = 'card';
          const h3 = document.createElement('h3');
          h3.textContent = `Event ${i+1} — ${2020+i}`;
          const p = document.createElement('p');
          p.textContent = `Dummy: Achieved certification or completed a major project in cybersecurity. Key milestones include bug bounty rewards and hackathon wins.`;
          card.appendChild(h3);
          card.appendChild(p);
          timelineContainer.appendChild(card);
        }
      }

      initExpandableCards();
      initPagination(); // Re-init after generation
    }

    /* ---------------- New Features ---------------- */

    // Search Functionality
    function initSearch() {
      const searchInput = $('#searchInput');
      const searchBtn = $('#searchBtn');
      if (!searchInput) return;
      const filterCards = debounce(() => {
        const query = searchInput.value.toLowerCase();
        $$('.card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(query) ? 'block' : 'none';
        });
      }, 300);
      searchInput.addEventListener('input', filterCards);
      searchBtn.addEventListener('click', filterCards);
    }

    // Theme Toggle
    function initThemeToggle() {
      const toggle = $('#themeToggle');
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggle.classList.toggle('fa-moon');
        toggle.classList.toggle('fa-sun');
      });
    }

    // Contact Form
    function initContactForm() {
      const form = $('.contact-form');
      if (!form) return;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const message = form.querySelector('[name="message"]').value;
        if (!name || !email || !message) {
          alert('Please fill all fields.');
          return;
        }
        alert('Message sent! (Mock - integrate with EmailJS)');
        form.reset();
      });
    }

    // Pagination
    function initPagination() {
      $$('.section').forEach(section => {
        const cards = section.querySelectorAll('.card');
        if (cards.length > 10) {
          let currentPage = 1;
          const itemsPerPage = 10;
          const totalPages = Math.ceil(cards.length / itemsPerPage);
          const paginationDiv = document.createElement('div');
          paginationDiv.className = 'pagination';
          for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.addEventListener('click', () => {
              currentPage = i;
              cards.forEach((card, idx) => {
                card.style.display = (idx >= (i-1)*itemsPerPage && idx < i*itemsPerPage) ? 'block' : 'none';
              });
            });
            paginationDiv.appendChild(btn);
          }
          section.appendChild(paginationDiv);
          // Initial load
          cards.forEach((card, idx) => {
            card.style.display = idx < itemsPerPage ? 'block' : 'none';
          });
        }
      });
    }

    // Modals
    function initModals() {
      const modal = $('.modal');
      const closeBtn = $('.close');
      if (!modal || !closeBtn) return;
      closeBtn.addEventListener('click', () => modal.style.display = 'none');
      window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    }
    function openModal(title, desc, imgSrc) {
      const modal = $('.modal');
      const content = $('.modal-content');
      content.innerHTML = `<span class="close">&times;</span><h3>${title}</h3><img src="${imgSrc}" alt="${title}"><p>${desc}</p>`;
      modal.style.display = 'flex';
    }

    // Slider for Testimonials
    function initSlider() {
      const prevBtn = $('#prevSlide');
      const nextBtn = $('#nextSlide');
      const slides = $('.slides');
      if (!prevBtn || !nextBtn || !slides) return;
      let currentSlide = 0;
      const totalSlides = slides.children.length;
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      });
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      });
    }

    // Scroll-Triggered Animations
    function initScrollAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      });
      $$('.section').forEach(section => observer.observe(section));
    }

    // Keyboard Navigation
    function initKeyboardNav() {
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault();
          $('#searchInput').focus();
        }
        // Arrow keys for sidebar (simplified)
        const activeBtn = $('.sidebar button.active');
        if (e.key === 'ArrowDown') {
          const next = activeBtn.nextElementSibling;
          if (next) next.click();
        }
        if (e.key === 'ArrowUp') {
          const prev = activeBtn.previousElementSibling;
          if (prev) prev.click();
        }
      });
    }

    /* ---------------- Error Handling ---------------- */
    window.addEventListener('error', (e) => {
      console.error('JS Error:', e.message);
      // Fallback: Ensure UI loads
      $('#boot').style.display = 'none';
      $('#app').style.display = 'block';
    });

  } catch (err) {
    console.error('Fatal JS Error:', err);
    // Reveal UI anyway
    try {
      document.getElementById('boot').style.display = 'none';
      document.getElementById('app').style.display = 'block';
    } catch(e){}
  }
})();
