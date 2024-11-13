// Cyrine
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

document.querySelector(".hamburger").addEventListener("click", function () {
  toggleMenu();
});

// Mirna
$(document).ready(function () {
  // counter
  $(".minus-btn").click(function () {
    let quantityInput = $(this)
      .closest(".counter-content")
      .find(".quantity-input");
    let quantity = quantityInput.val().trim();
    quantity--;
    if (quantity >= 0) {
      quantityInput.val(quantity);
    }
  });

  $(".add-btn").click(function () {
    let quantityInput = $(this)
      .closest(".counter-content")
      .find(".quantity-input");
    let quantity = quantityInput.val().trim();
    quantity++;
    if (quantity <= 10) {
      quantityInput.val(quantity);
    }
  });
});
