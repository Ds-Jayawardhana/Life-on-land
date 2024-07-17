const lightModeButton = document.getElementById("lightButton");
const darkModeButton = document.getElementById("darkButton");
const customButton = document.getElementById("customButton");


// Define style settings
const styleSettings = {
  light: {
    body: { backgroundColor: "#ededed" },
    title: { backgroundColor: "#fff", color: "#000" },
    navbar: { backgroundColor: "#f5e3bb" },
    footer: { backgroundColor: "#f5e3bb" },
    footer2: { backgroundColor: "#f5e3bb" },
  },
  dark: {
    body: { backgroundColor: "#333" },
    title: { backgroundColor: "#5c5b5b", color: "#fff" },
    navbar: { backgroundColor: "#5c5b5b" },
    footer: { backgroundColor: "#5c5b5b" },
    footer2: { backgroundColor: "#5c5b5b" },
  },
  custom1: {
    body: { backgroundColor: "#FFF3B0" },
    title: { backgroundColor: "#FFAFCC", color: "#FF8E72" },
    navbar: { backgroundColor: "#FFAFCC" },
    footer: { backgroundColor: "#FFAFCC" },
    footer2: { backgroundColor: "#FFAFCC" },
  },
  custom2: {
    body: { backgroundColor: "#E8F0F2" },
    title: { backgroundColor: "#98C1D9", color: "#3D5A80" },
    navbar: { backgroundColor: "#98C1D9" },
    footer: { backgroundColor: "#98C1D9" },
    footer2: { backgroundColor: "#98C1D9" },
  },
  custom3: {
    body: { backgroundColor: "#F4EAE6" },
    title: { backgroundColor: "#D1BEB0", color: "#5A4E4D" },
    navbar: { backgroundColor: "#D1BEB0" },
    footer: { backgroundColor: "#D1BEB0" },
    footer2: { backgroundColor: "#D1BEB0" },
  },
};

function applyStyle(setting) {
  const body = document.getElementById("body");
  const title = document.getElementById("title");
  const navbar = document.getElementById("nav");
  const footer2 = document.getElementById("copyright");
  const footer = document.getElementById("footer");
  Object.assign(body.style, setting.body);
  Object.assign(title.style, setting.title);
  Object.assign(navbar.style, setting.navbar);
  Object.assign(footer2.style, setting.footer2);
  Object.assign(footer.style, setting.footer);
}

lightModeButton.addEventListener("click", () =>
  applyStyle(styleSettings.light)
);
darkModeButton.addEventListener("click", () => applyStyle(styleSettings.dark));
customButton.addEventListener("click", () => {
  const customs = [
    styleSettings.custom1,
    styleSettings.custom2,
    styleSettings.custom3,
  ];

  let mode = customs[Math.floor(Math.random() * customs.length)];
  applyStyle(mode);
});
