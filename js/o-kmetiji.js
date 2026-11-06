// O Kmetiji JS slider
const slides = document.querySelectorAll(".slider-image");
const sliderToggle = document.getElementById("sliderToggle");

let currentSlide = 0;
let intervalDrsnika = null;

function naslednjaSlika() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

function zazeniDrsnik() {
  intervalDrsnika = setInterval(naslednjaSlika, 4500);
  sliderToggle.textContent = "⏸ Ustavi";
  sliderToggle.setAttribute("aria-label", "Ustavi samodejno menjavanje slik");
}

function ustaviDrsnik() {
  clearInterval(intervalDrsnika);
  intervalDrsnika = null;
  sliderToggle.textContent = "▶ Predvajaj";
  sliderToggle.setAttribute("aria-label", "Zaženi samodejno menjavanje slik");
}

if (slides.length > 1) {
  zazeniDrsnik();

  sliderToggle.addEventListener("click", () => {
    if (intervalDrsnika === null) {
      zazeniDrsnik();
    } else {
      ustaviDrsnik();
    }
  });
} else {
  sliderToggle.hidden = true;
}
