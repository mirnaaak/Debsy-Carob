// Cyrine
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

document.querySelector(".hamburger").addEventListener("click", function () {
  toggleMenu();
});
