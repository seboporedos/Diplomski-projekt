// CAROUSEL
document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = [...track.querySelectorAll("img")];
  const dots = [...carousel.querySelectorAll(".dot")];
  let current = 0;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide, i) => {
      if (i === current) slide.removeAttribute("aria-hidden");
      else slide.setAttribute("aria-hidden", "true");
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  if (!slides.length) return;
  carousel
    .querySelector(".carousel-btn.prev")
    ?.addEventListener("click", () => goToSlide(current - 1));
  carousel
    .querySelector(".carousel-btn.next")
    ?.addEventListener("click", () => goToSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goToSlide(i)));
  goToSlide(0);
});
