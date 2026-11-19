// Language switch
// Clicking "English" or "Español" sets data-lang on the <html> tag.
// styles.css uses that attribute to show the matching text.

const root = document.documentElement;
const buttons = document.querySelectorAll("[data-set-lang]");

function setLanguage(lang) {
  root.dataset.lang = lang;
  root.lang = lang; // tells screen readers and browsers which language the page is in

  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
  });

  // In the headline, only the active language is read aloud by screen readers
  document.querySelectorAll(".hero-line").forEach((line) => {
    line.setAttribute("aria-hidden", String(line.lang !== lang));
  });

  // Remember the choice for next visit (wrapped in try in case storage is blocked)
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLang));
});

// Pixel portrait: hops when clicked.
// Removing and re-adding the class restarts the animation on every click.
const avatar = document.querySelector(".avatar");
if (avatar) {
  avatar.addEventListener("click", () => {
    avatar.classList.remove("is-hopping");
    void avatar.offsetWidth; // forces the browser to notice the class was removed
    avatar.classList.add("is-hopping");
  });
  avatar.addEventListener("animationend", () => avatar.classList.remove("is-hopping"));
}

// On load: use the saved choice, or Spanish if the visitor's browser prefers it
let saved = null;
try { saved = localStorage.getItem("lang"); } catch (e) {}
const browserPrefersSpanish = (navigator.language || "").toLowerCase().startsWith("es");
setLanguage(saved || (browserPrefersSpanish ? "es" : "en"));
