// TOGGLE za hamburger meni
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

function nastaviMeni(odprt) {
  mainNav.classList.toggle("open", odprt);
  navToggle.setAttribute("aria-expanded", String(odprt));
}

function zapriMeni() {
  if (mainNav.contains(document.activeElement)) {
    navToggle.focus({ preventScroll: true });
  }

  nastaviMeni(false);
}

navToggle.addEventListener("click", () => {
  nastaviMeni(!mainNav.classList.contains("open"));
});

window.addEventListener("scroll", () => {
  if (mainNav.classList.contains("open")) {
    zapriMeni();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !mainNav.classList.contains("open")) {
    return;
  }

  if (event.target === navToggle || mainNav.contains(event.target)) {
    event.preventDefault();
    zapriMeni();
  }
});

// SCROLL TOP BTN

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
