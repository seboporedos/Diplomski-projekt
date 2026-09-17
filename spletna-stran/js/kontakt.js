emailjs.init({
  publicKey: "tsW2nGJcWF_L58Yzq",
});

const obrazec = document.querySelector("#contactForm");
const imeInput = document.querySelector("#name");
const imeNapaka = document.querySelector("#nameNapaka");
const emailInput = document.querySelector("#email");
const emailNapaka = document.querySelector("#emailNapaka");
const zadevaInput = document.querySelector("#zadeva");
const zadevaNapaka = document.querySelector("#zadevaNapaka");
const messageInput = document.querySelector("#message");
const messageNapaka = document.querySelector("#messageNapaka");
const uspehSporocilo = document.querySelector("#uspehSporocilo");

obrazec.addEventListener("submit", function (event) {
  event.preventDefault();

  let obrazecVeljaven = true;

  uspehSporocilo.textContent = "";

  const ime = imeInput.value.trim();
  const email = emailInput.value.trim();
  const zadeva = zadevaInput.value.trim();
  const message = messageInput.value.trim();

  // Preverjanje ime in priimek
  imeNapaka.textContent = "";
  imeInput.classList.remove("napaka-input");

  if (ime === "") {
    imeNapaka.textContent = "Vnesite ime in priimek.";
    imeInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  } else if (ime.length < 2) {
    imeNapaka.textContent = "Ime mora vsebovati vsaj 2 znaka.";
    imeInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  } else if (!/^[\p{L}\s'-]+$/u.test(ime)) {
    imeNapaka.textContent =
      "Ime lahko vsebuje samo črke, presledke, vezaje in apostrofe.";
    imeInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  }

  // Preverjanje email
  emailNapaka.textContent = "";
  emailInput.classList.remove("napaka-input");

  if (email === "") {
    emailNapaka.textContent = "Vnesite e-poštni naslov.";
    emailInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  } else if (emailInput.validity.typeMismatch) {
    emailNapaka.textContent = "Vnesite veljaven e-poštni naslov.";
    emailInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  }

  // Preverjanje zadeva
  zadevaNapaka.textContent = "";
  zadevaInput.classList.remove("napaka-input");

  if (zadeva === "") {
    zadevaNapaka.textContent = "Vnesite zadevo sporočila.";
    zadevaInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  } else if (zadeva.length < 3) {
    zadevaNapaka.textContent = "Zadeva mora vsebovati vsaj 3 znake.";
    zadevaInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  }

  // Preverjanje sporočila
  messageNapaka.textContent = "";
  messageInput.classList.remove("napaka-input");

  if (message === "") {
    messageNapaka.textContent = "Vnesite sporočilo.";
    messageInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  } else if (message.length < 10) {
    messageNapaka.textContent = "Sporočilo mora vsebovati vsaj 10 znakov.";
    messageInput.classList.add("napaka-input");
    obrazecVeljaven = false;
  }

  // Preverjanje pošiljanja obrazca
  if (obrazecVeljaven) {
    const gumbPoslji = obrazec.querySelector('button[type="submit"]');

    gumbPoslji.disabled = true;
    gumbPoslji.textContent = "Pošiljanje...";

    emailjs
      .sendForm("service_sebo", "template_xmo185j", obrazec)
      .then(() => {
        uspehSporocilo.textContent =
          "Hvala za vaše sporočilo! Uspešno je bilo poslano.";

        obrazec.reset();
      })
      .catch(() => {
        uspehSporocilo.textContent =
          "Pri pošiljanju je prišlo do napake. Poskusite znova.";
      })
      .finally(() => {
        gumbPoslji.disabled = false;
        gumbPoslji.textContent = "Pošlji sporočilo";
      });
  } else {
    document.querySelector(".napaka-input")?.focus();
  }
});
