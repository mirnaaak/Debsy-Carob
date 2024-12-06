
$(document).ready(function () {
  // Show the Visa pop-up
  $(".visa").on("click", function () {
    $("#visaPopup").fadeIn();
  });

  // Show the MasterCard pop-up
  $(".master").on("click", function () {
    $("#masterPopup").fadeIn();
  });

  // Close the Visa pop-up
  $("#closeVisaPopup").on("click", function () {
    $("#visaPopup").fadeOut();
  });

  // Close the MasterCard pop-up
  $("#closeMasterPopup").on("click", function () {
    $("#masterPopup").fadeOut();
  });

  // Optional: Close the pop-up when clicking outside the form
  $(window).on("click", function (e) {
    if ($(e.target).is("#visaPopup")) {
      $("#visaPopup").fadeOut();
    } else if ($(e.target).is("#masterPopup")) {
      $("#masterPopup").fadeOut();
    }
  });
});
