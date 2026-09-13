const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const revealItems = document.querySelectorAll(".reveal");
const lightbox = document.querySelector(".lightbox");
const lightboxArt = document.querySelector(".lightbox-art");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxClose = document.querySelector(".lightbox-close");
const birthdayLayer = document.querySelector(".birthday-layer");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const visual = item.querySelector(".gallery-visual");
    const title = item.dataset.title || "Gallery preview";

    lightboxArt.className = "lightbox-art";
    lightboxArt.innerHTML = "";

    const preview = document.createElement("span");
    preview.className = visual.className;
    lightboxArt.append(preview);

    lightboxTitle.textContent = title;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.hidden = true;
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

document.querySelectorAll(".social-card.disabled").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

function createParticle(x, y, color) {
  const particle = document.createElement("span");
  const angle = Math.random() * Math.PI * 2;
  const distance = 34 + Math.random() * 54;

  particle.className = "particle";
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.setProperty("--particle-color", color);
  particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
  particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
  document.body.append(particle);
  particle.addEventListener("animationend", () => particle.remove());
}

function popBalloon(balloon) {
  const rect = balloon.getBoundingClientRect();
  const color = balloon.style.getPropertyValue("--balloon-color") || "#22e68b";
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for (let i = 0; i < 18; i += 1) {
    createParticle(x, y, color);
  }

  balloon.remove();
}

function spawnBalloon() {
  const colors = ["#22e68b", "#65e4ff", "#ffd166", "#ff7a9a", "#b9a5ff"];
  const balloon = document.createElement("button");

  balloon.className = "balloon";
  balloon.type = "button";
  balloon.setAttribute("aria-label", "Pop birthday balloon");
  balloon.style.left = `${8 + Math.random() * 84}vw`;
  balloon.style.setProperty("--balloon-color", colors[Math.floor(Math.random() * colors.length)]);
  balloon.style.setProperty("--float-speed", `${8 + Math.random() * 6}s`);
  balloon.addEventListener("click", () => popBalloon(balloon));
  balloon.addEventListener("animationend", () => balloon.remove());
  birthdayLayer.append(balloon);
}

function enableBirthdayMode() {
  document.body.classList.add("birthday-mode");

  const note = document.createElement("div");
  note.className = "birthday-note";
  note.textContent = "Birthday mode: 6 November. Tap the balloons.";
  document.body.append(note);
  setTimeout(() => note.remove(), 7000);

  for (let i = 0; i < 8; i += 1) {
    setTimeout(spawnBalloon, i * 420);
  }

  setInterval(spawnBalloon, 1700);
}

const today = new Date();
const isBirthday = today.getMonth() === 10 && today.getDate() === 6;

if (isBirthday) {
  enableBirthdayMode();
}
