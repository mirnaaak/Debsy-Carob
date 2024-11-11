// Mirna
$(document).ready(function () {
  $(".size-btn").hover(
    function () {
      $(this).css("width", "42px");
      $(this).css("height", "41px");
      $(this).find("h5").css("font-size", "30px");
      $(this).closest('.size-name').css("margin", "0 -10px");
      $(this).closest('.size-name').css("margin-top", "-30px");
      $(this).closest('.size-name').find('small').css("display", "block");

    },
    function () {
      $(this).css("width", "32px");
      $(this).css("height", "31px");
      $(this).css("margin-top", "0");
      $(this).find("h5").css("font-size", "24px");
      $(this).closest('.size-name').css("margin-top", "0");
      $(this).closest('.size-name').css("margin", "0 1px");
      $(this).closest('.size-name').find('small').css("display", "none")
    }
  );
});

// Cyrine
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
