const emailjsNaVoljo =
  typeof window.emailjs?.init === "function" &&
  typeof window.emailjs?.sendForm === "function";

if (emailjsNaVoljo) {
  emailjs.init({
    publicKey: "tsW2nGJcWF_L58Yzq",
  });
}

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

const telefon = document.createElement("a");
telefon.href = "tel:+38625516050";
telefon.textContent = "02 551 60 50";

function prikaziNapakoPosiljanja() {
  uspehSporocilo.replaceChildren(
    "Pri pošiljanju je prišlo do napake, zato vašega sporočila nismo prejeli. Za informacije ali povpraševanje nas lahko pokličete na ",
    telefon,
    ".",
  );
}

function preveriPolje(input, izpisNapake, sporociloNapake) {
  izpisNapake.textContent = sporociloNapake;
  input.classList.toggle("napaka-input", sporociloNapake !== "");

  return sporociloNapake === "";
}

obrazec.addEventListener("submit", function (event) {
  event.preventDefault();

  uspehSporocilo.textContent = "";

  const ime = imeInput.value.trim();
  const email = emailInput.value.trim();
  const zadeva = zadevaInput.value.trim();
  const message = messageInput.value.trim();

  // Preverjanje imena in priimka
  let napakaIme = "";

  if (ime === "") {
    napakaIme = "Vnesite ime in priimek.";
  } else if (ime.length < 2) {
    napakaIme = "Ime mora vsebovati vsaj 2 znaka.";
  } else if (!/^[\p{L}\s'-]+$/u.test(ime)) {
    napakaIme = "Ime lahko vsebuje samo črke, presledke, vezaje in apostrofe.";
  }

  // Preverjanje e-poštnega naslova
  let napakaEmail = "";

  if (email === "") {
    napakaEmail = "Vnesite e-poštni naslov.";
  } else if (emailInput.validity.typeMismatch) {
    napakaEmail = "Vnesite veljaven e-poštni naslov.";
  }

  // Preverjanje zadeve
  let napakaZadeva = "";

  if (zadeva === "") {
    napakaZadeva = "Vnesite zadevo sporočila.";
  } else if (zadeva.length < 3) {
    napakaZadeva = "Zadeva mora vsebovati vsaj 3 znake.";
  }

  // Preverjanje sporočila
  let napakaMessage = "";

  if (message === "") {
    napakaMessage = "Vnesite sporočilo.";
  } else if (message.length < 10) {
    napakaMessage = "Sporočilo mora vsebovati vsaj 10 znakov.";
  }

  const rezultatiPreverjanja = [
    preveriPolje(imeInput, imeNapaka, napakaIme),
    preveriPolje(emailInput, emailNapaka, napakaEmail),
    preveriPolje(zadevaInput, zadevaNapaka, napakaZadeva),
    preveriPolje(messageInput, messageNapaka, napakaMessage),
  ];

  const obrazecVeljaven = rezultatiPreverjanja.every(Boolean);

  // Preverjanje pošiljanja obrazca
  if (obrazecVeljaven) {
    if (!emailjsNaVoljo) {
      prikaziNapakoPosiljanja();
      return;
    }
    const gumbPoslji = obrazec.querySelector('button[type="submit"]');

    gumbPoslji.disabled = true;
    gumbPoslji.textContent = "Pošiljanje...";

    emailjs
      .sendForm("service_sebo", "template_xmo185j", obrazec)
      .then(() => {
        uspehSporocilo.replaceChildren(
          "Hvala za vaše sporočilo. Uspešno smo ga prejeli in vam bomo odgovorili v najkrajšem možnem času. Za neposredne informacije nas lahko pokličete na ",
          telefon,
          ".",
        );

        obrazec.reset();
      })
      .catch(() => {
        prikaziNapakoPosiljanja();
      })
      .finally(() => {
        gumbPoslji.disabled = false;
        gumbPoslji.textContent = "Pošlji sporočilo";
      });
  } else {
    document.querySelector(".napaka-input")?.focus();
  }
});
