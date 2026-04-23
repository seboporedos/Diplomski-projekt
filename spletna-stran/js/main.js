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
