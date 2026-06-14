async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Could not load ${file}`);
    return;
  }

  const html = await response.text();
  document.getElementById(id).innerHTML = html;

  if (id === "header") {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
      });
    }
  }
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");