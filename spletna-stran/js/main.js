// preprost toggle za meni
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

window.addEventListener("scroll", () => {
  if (mainNav.classList.contains("open")) {
    mainNav.classList.remove("open");
  }
});

const scrollBtn = document.getElementById("scrollTopBtn");

// pokaži gumb
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// klik → na vrh
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// O Kmetiji JS
const okSlides = document.querySelectorAll(".ok-slide");
let okIdx = 0;

if (okSlides.length) {
  setInterval(() => {
    okSlides[okIdx].classList.remove("active");
    okIdx = (okIdx + 1) % okSlides.length;
    okSlides[okIdx].classList.add("active");
  }, 4500);
}

// GALERIJA JS

const slike = document.querySelectorAll(".galerija-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
let idx = 0;

slike.forEach((s, i) =>
  s.addEventListener("click", () => {
    idx = i;
    lightboxImg.src = s.dataset.src || s.src; // uporabi data-src, če je na voljo, sicer src
    lightbox.classList.add("active");
  }),
);

document
  .getElementById("lightboxClose")
  .addEventListener("click", () => lightbox.classList.remove("active"));

document.getElementById("lightboxPrev").addEventListener("click", () => {
  idx = (idx - 1 + slike.length) % slike.length;
  lightboxImg.src = slike[idx].dataset.src || slike[idx].src;
});

document.getElementById("lightboxNext").addEventListener("click", () => {
  idx = (idx + 1) % slike.length;
  lightboxImg.src = slike[idx].dataset.src || slike[idx].src;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
  if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("active");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
});

slike.forEach((slika) => observer.observe(slika));
