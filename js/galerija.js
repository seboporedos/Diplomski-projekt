// GALERIJA JS

const slike = document.querySelectorAll(".galerija-grid img");
const filterGalerija = document.querySelector("#filterGalerija");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let idx = 0;
let prikazaneSlike = Array.from(slike);
let zacetekDotika;

// FILTRIRANJE SLIK GLEDE NA IZBRANO KATEGORIJO
filterGalerija.addEventListener("change", () => {
  const izbranaKategorija = filterGalerija.value;
  prikazaneSlike = [];

  slike.forEach((slika) => {
    const seUjema =
      izbranaKategorija === "vse" ||
      slika.dataset.category === izbranaKategorija;

    slika.style.display = seUjema ? "block" : "none";

    if (seUjema) {
      prikazaneSlike.push(slika);
    }
  });
});

// LIGHTBOX

function prikaziSliko() {
  const slika = prikazaneSlike[idx];

  lightboxImg.src = slika.dataset.src || slika.src;
  lightboxImg.alt = slika.alt;
}

slike.forEach((slika) => {
  slika.setAttribute("tabindex", "0");
  slika.setAttribute("role", "button");

  function odpriLightbox() {
    idx = prikazaneSlike.indexOf(slika);
    prikaziSliko();
    lightbox.classList.add("active");
    lightboxClose.focus();
  }

  slika.addEventListener("click", odpriLightbox);

  slika.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      odpriLightbox();
    }
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightboxPrev.addEventListener("click", () => {
  idx = (idx - 1 + prikazaneSlike.length) % prikazaneSlike.length;
  prikaziSliko();
});

lightboxNext.addEventListener("click", () => {
  idx = (idx + 1) % prikazaneSlike.length;
  prikaziSliko();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }

  if (event.key === "ArrowLeft") {
    lightboxPrev.click();
  }

  if (event.key === "ArrowRight") {
    lightboxNext.click();
  }
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

lightbox.addEventListener("touchstart", (event) => {
  zacetekDotika = event.touches[0].clientX;
});

lightbox.addEventListener("touchend", (event) => {
  const premik = event.changedTouches[0].clientX - zacetekDotika;

  if (premik < -50) {
    lightboxNext.click();
  } else if (premik > 50) {
    lightboxPrev.click();
  }
});

//  INTERSECTION OBSERVER
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "200px",
  },
);

slike.forEach((slika) => {
  observer.observe(slika);
});
