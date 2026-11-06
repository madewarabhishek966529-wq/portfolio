/* ==========================================================================
   ABHISHEK MADEWAR — PORTFOLIO SCRIPT
   Vanilla JS. No frameworks, no build step.
   ========================================================================== */

(() => {
  "use strict";

  /* ---------- Small helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const fetchJSON = async (path) => {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path}`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /* ==========================================================================
     LOADING SCREEN
     ========================================================================== */
  function initLoader() {
    const loader = $("#loader");
    if (!loader) return;
    const hide = () => loader.classList.add("loader-hide");
    window.addEventListener("load", () => setTimeout(hide, 500));
    // Safety net in case 'load' never fires cleanly
    setTimeout(hide, 3500);
  }

  /* ==========================================================================
     CUSTOM CURSOR
     ========================================================================== */
  function initCursor() {
    if (window.matchMedia("(max-width: 860px)").matches) return;
    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    const hoverables = "a, button, .chip, .project-card, .skill-card, .repo-card, input, textarea";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) ring.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) ring.classList.remove("cursor-hover");
    });
  }

  /* ==========================================================================
     SCROLL PROGRESS BAR
     ========================================================================== */
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = `${scrolled}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ==========================================================================
     NAVBAR: scroll state + mobile toggle + active link
     ========================================================================== */
  function initNavbar() {
    const navbar = $("#navbar");
    const toggle = $("#navToggle");
    const links = $("#navLinks");

    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    $$(".nav-link", links).forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ==========================================================================
     BACK TO TOP
     ========================================================================== */
  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ==========================================================================
     SCROLL REVEAL
     ========================================================================== */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     ANIMATED COUNTERS
     ========================================================================== */
  function animateCounters() {
    $$(".stat-num").forEach((el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      tick();
    });
  }

  /* ==========================================================================
     TYPING ANIMATION (hero terminal)
     ========================================================================== */
  function initTyping(roles) {
    const el = $("#typedRole");
    if (!el || !roles || !roles.length) return;
    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = `"${current.slice(0, charIndex)}"`;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        el.textContent = `"${current.slice(0, charIndex)}"`;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 85);
    }
    tick();
  }

  /* ==========================================================================
     RENDER: PROFILE / HERO / ABOUT / SOCIALS / FOOTER
     ========================================================================== */
  function socialIconSVG(kind) {
    const icons = {
      github: "🐙",
      linkedin: "in",
      email: "✉",
      phone: "☎",
    };
    return icons[kind] || "🔗";
  }

  function renderSocials(socials, container, label = "") {
    if (!container || !socials) return;
    container.innerHTML = "";
    Object.entries(socials).forEach(([key, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.className = "social-icon";
      a.setAttribute("aria-label", `${label}${key}`);
      if (url.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.textContent = socialIconSVG(key);
      container.appendChild(a);
    });
  }

  function renderProfile(profile) {
    if (!profile) return;
    $("#heroName").innerHTML = `Hi, I'm <span class="grad-text">${profile.name}</span>.<br>I build things that ship.`;
    $("#heroBio").textContent = profile.shortBio || profile.bio || "";
    $("#resumeBtn").href = profile.resumeFile || "#";
    $("#resumeBtn").setAttribute("download", "");

    // About section
    const aboutText = $("#aboutText");
    aboutText.innerHTML = `<p>${profile.bio || ""}</p>`;

    const aboutMeta = $("#aboutMeta");
    const rows = [
      ["name", profile.name],
      ["title", profile.title],
      ["location", profile.location],
      ["email", profile.email],
      ["status", profile.availability],
    ];
    aboutMeta.innerHTML = rows.map(([label, value]) => `
      <div class="about-meta-row">
        <span class="about-meta-label">${label}</span>
        <span class="about-meta-value">${value || "—"}</span>
      </div>
    `).join("");

    document.title = `${profile.name} — ${profile.title}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", profile.bio || "");

    initTyping(profile.roles);

    const year = new Date().getFullYear();
    $("#footerCopy").textContent = `© ${year} ${profile.name}. All rights reserved.`;
  }

  function renderContactInfo(profile, socials) {
    const box = $("#contactInfo");
    if (!box || !profile) return;
    box.innerHTML = `
      <div class="contact-info-row">
        <span class="contact-info-label">// email</span>
        <span class="contact-info-value"><a href="mailto:${profile.email}">${profile.email}</a></span>
      </div>
      <div class="contact-info-row">
        <span class="contact-info-label">// phone</span>
        <span class="contact-info-value"><a href="tel:${profile.phone}">${profile.phone}</a></span>
      </div>
      <div class="contact-info-row">
        <span class="contact-info-label">// location</span>
        <span class="contact-info-value">${profile.location}</span>
      </div>
      <div class="contact-info-row">
        <span class="contact-info-label">// status</span>
        <span class="contact-info-value">${profile.availability}</span>
      </div>
    `;
  }

  /* ==========================================================================
     RENDER: SKILLS (with search + category filter + animated bars)
     ========================================================================== */
  function renderSkills(skills) {
    const grid = $("#skillsGrid");
    const filterBox = $("#skillFilters");
    const search = $("#skillSearch");
    if (!grid || !skills) return;

    const categories = ["All", ...new Set(skills.map((s) => s.category))];
    filterBox.innerHTML = categories.map((c, i) =>
      `<button class="chip ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");

    grid.innerHTML = skills.map((s) => `
      <div class="skill-card" data-name="${s.name.toLowerCase()}" data-cat="${s.category}">
        <div class="skill-head">
          <span class="skill-name"><span>${s.icon || ""}</span> ${s.name}</span>
          <span class="skill-pct">${s.percentage}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="background:${s.color || "var(--grad-primary)"}" data-target="${s.percentage}"></div>
        </div>
      </div>
    `).join("");

    // Animate bars once visible
    const bars = $$(".skill-bar-fill", grid);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.target}%`;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => obs.observe(b));

    function applyFilters() {
      const activeCat = $(".chip.active", filterBox)?.dataset.cat || "All";
      const query = search.value.trim().toLowerCase();
      $$(".skill-card", grid).forEach((card) => {
        const matchesCat = activeCat === "All" || card.dataset.cat === activeCat;
        const matchesSearch = card.dataset.name.includes(query);
        card.classList.toggle("skill-card-hidden", !(matchesCat && matchesSearch));
      });
    }

    filterBox.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", filterBox).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      applyFilters();
    });
    search.addEventListener("input", applyFilters);
  }

  /* ==========================================================================
     RENDER: PROJECTS (with search + category filter)
     ========================================================================== */
  function renderProjects(projects) {
    const grid = $("#projectsGrid");
    const filterBox = $("#projectFilters");
    const search = $("#projectSearch");
    if (!grid || !projects) return;

    const categories = ["All", ...new Set(projects.map((p) => p.category))];
    filterBox.innerHTML = categories.map((c, i) =>
      `<button class="chip ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`
    ).join("");

    grid.innerHTML = projects.map((p) => `
      <div class="project-card" data-name="${p.title.toLowerCase()}" data-cat="${p.category}">
        ${p.featured ? '<span class="project-badge">featured</span>' : ""}
        <h3 class="project-title">${p.title}</h3>
        <p class="project-tagline">${p.tagline || ""}</p>
        <p class="project-desc">${p.description || ""}</p>
        <div class="tech-tags">
          ${(p.tech || []).map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <div class="project-links">
          ${p.github ? `<a class="project-link" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub →</a>` : ""}
          ${p.demo ? `<a class="project-link" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live Demo →</a>` : ""}
        </div>
      </div>
    `).join("");

    function applyFilters() {
      const activeCat = $(".chip.active", filterBox)?.dataset.cat || "All";
      const query = search.value.trim().toLowerCase();
      $$(".project-card", grid).forEach((card) => {
        const matchesCat = activeCat === "All" || card.dataset.cat === activeCat;
        const matchesSearch = card.dataset.name.includes(query);
        card.classList.toggle("project-card-hidden", !(matchesCat && matchesSearch));
      });
    }

    filterBox.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", filterBox).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      applyFilters();
    });
    search.addEventListener("input", applyFilters);
  }

  /* ==========================================================================
     RENDER: EXPERIENCE / EDUCATION TIMELINES
     ========================================================================== */
  function renderTimeline(items, containerEl, type) {
    if (!containerEl || !items) return;
    if (type === "experience") {
      containerEl.innerHTML = items.map((item) => `
        <div class="timeline-item">
          <p class="timeline-period">${item.period}</p>
          <h3 class="timeline-role">${item.role}</h3>
          <p class="timeline-company">${item.company}${item.location ? " · " + item.location : ""}</p>
          <ul class="timeline-points">
            ${(item.points || []).map((pt) => `<li>${pt}</li>`).join("")}
          </ul>
        </div>
      `).join("");
    } else {
      containerEl.innerHTML = items.map((item) => `
        <div class="timeline-item">
          <p class="timeline-period">${item.period}</p>
          <h3 class="timeline-role">${item.institution}</h3>
          <p class="timeline-company">${item.degree}</p>
        </div>
      `).join("");
    }
  }

  /* ==========================================================================
     RENDER: CERTIFICATES / ACHIEVEMENTS
     ========================================================================== */
  function renderCertificates(certs) {
    const grid = $("#certGrid");
    if (!grid || !certs) return;
    grid.innerHTML = certs.map((c) => `
      <div class="cert-card">
        <span class="cert-icon">📜</span>
        <div>
          <p class="cert-title">${c.title}</p>
          <p class="cert-issuer">${c.issuer}${c.year ? " · " + c.year : ""}</p>
        </div>
      </div>
    `).join("");
  }

  function renderAchievements(items) {
    const grid = $("#achievementsGrid");
    if (!grid || !items) return;
    grid.innerHTML = items.map((a) => `
      <div class="achievement-card">
        <span class="ach-icon">${a.icon || "🏆"}</span>
        <div>
          <p class="ach-title">${a.title}</p>
          <p class="ach-desc">${a.description || ""}</p>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     CONTACT FORM VALIDATION (FormSubmit backend)
     ========================================================================== */
  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    const submitBtn = $("button[type='submit']", form);
    const btnText = $(".btn-text", submitBtn);
    const spinner = $(".btn-spinner", submitBtn);

    const validators = {
      fname: (v) => v.trim().length >= 2 || "Please enter your name.",
      femail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
      fsubject: (v) => v.trim().length >= 3 || "Subject is a bit short.",
      fmessage: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
    };

    function validateField(id) {
      const input = $(`#${id}`, form);
      const row = input.closest(".form-row");
      const errorEl = $(".form-error", row);
      const result = validators[id](input.value);
      if (result === true) {
        row.classList.remove("invalid");
        errorEl.textContent = "";
        return true;
      } else {
        row.classList.add("invalid");
        errorEl.textContent = result;
        return false;
      }
    }

    Object.keys(validators).forEach((id) => {
      $(`#${id}`, form).addEventListener("blur", () => validateField(id));
    });

    form.addEventListener("submit", async (e) => {
      const allValid = Object.keys(validators).map(validateField).every(Boolean);
      if (!allValid) {
        e.preventDefault();
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status error";
        return;
      }
      submitBtn.setAttribute("disabled", "true");
      btnText.textContent = "Sending…";
      spinner.hidden = false;
      status.textContent = "";
      status.className = "form-status";
      // Allow native FormSubmit POST to proceed (no preventDefault on success path)
    });
  }

  /* ==========================================================================
     LAZY LOAD IMAGES (data-src pattern, if any images use it)
     ========================================================================== */
  function initLazyImages() {
    const imgs = $$("img[data-src]");
    if (!imgs.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          obs.unobserve(img);
        }
      });
    });
    imgs.forEach((img) => obs.observe(img));
  }

  /* ==========================================================================
     INIT
     ========================================================================== */
  async function init() {
    initLoader();
    initCursor();
    initScrollProgress();
    initNavbar();
    initBackToTop();
    initContactForm();

    const [profile, skills, projects, experience, education, certificates, achievements, socials] =
      await Promise.all([
        fetchJSON("data/profile.json"),
        fetchJSON("data/skills.json"),
        fetchJSON("data/projects.json"),
        fetchJSON("data/experience.json"),
        fetchJSON("data/education.json"),
        fetchJSON("data/certificates.json"),
        fetchJSON("data/achievements.json"),
        fetchJSON("data/socials.json"),
      ]);

    renderProfile(profile);
    renderContactInfo(profile, socials);
    renderSocials(socials, $("#heroSocials"), "");
    renderSocials(socials, $("#footerSocials"), "");
    renderSkills(skills);
    renderProjects(projects);
    renderTimeline(experience, $("#experienceTimeline"), "experience");
    renderTimeline(education, $("#educationTimeline"), "education");
    renderCertificates(certificates);
    renderAchievements(achievements);

    initReveal();
    initLazyImages();

    // Animate counters once hero is in view
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          heroObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    const heroVisual = $(".hero-visual");
    if (heroVisual) heroObserver.observe(heroVisual);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
