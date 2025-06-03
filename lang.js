
const translations = {
  ar: {
    title: "صقر العرب اليماني",
    welcome: "مرحبآ بكم في موقعي المتواضع، أخوكم صقر العرب اليماني يرحب بكم"
  },
  en: {
    title: "Saqr Alarab Alyemeni",
    welcome: "Welcome to my humble website. Yours truly, Saqr Alarab Alyemeni welcomes you!"
  }
};

function switchLang(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.querySelector(".welcome").innerText = translations[lang].welcome;
}
