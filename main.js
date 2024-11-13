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
  $(".size-btn").hover(
    function () {
      $(this).css("width", "42px");
      $(this).css("height", "41px");
      $(this).find("h5").css("font-size", "30px");
      $(this).closest(".size-name").css("margin-top", "-20px");
      $(this).closest(".size-name").find("small").css("visibility", "visible");
    },
    function () {
      $(this).css("width", "32px");
      $(this).css("height", "31px");
      $(this).find("h5").css("font-size", "24px");
      $(this).closest(".size-name").css("margin-top", "-20px");
      $(this).closest(".size-name").find("small").css("visibility", "hidden");
    }
  );

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
