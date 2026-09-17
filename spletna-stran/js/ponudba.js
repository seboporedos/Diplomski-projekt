// CAROUSEL
const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
const totalSlides = document.querySelectorAll(".carousel-track img").length;
let current = 0;

function goToSlide(index) {
  current = index;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d) => d.classList.remove("active"));
  if (dots[current]) dots[current].classList.add("active");
}

document.querySelector(".carousel-btn.next")?.addEventListener("click", () => {
  goToSlide((current + 1) % totalSlides);
});

document.querySelector(".carousel-btn.prev")?.addEventListener("click", () => {
  goToSlide((current - 1 + totalSlides) % totalSlides);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => goToSlide(i));
});
