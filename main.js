// Cyrine
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

document.querySelector(".hamburger").addEventListener("click", function () {
  toggleMenu();
});

$(document).ready(function () {
  // Mirna
  $(".shopping-bag").click(function () {
    window.location.href = "../cart/cart.html";
  });

  $(".products-vm").click(function () {
    window.location.href = "../Products/products.html";
  });
});
