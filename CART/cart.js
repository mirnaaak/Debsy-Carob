// Sample data for item prices
const prices = {
  carob_macron: 3.13,
  ginger_biscuits: 3.13,
  carob_date_bites: 3.13,
  zaatar_biscuits: 3.13,
};

function updateQuantity(item, change) {
  const qtyElem = document.getElementById(`qty-${item}`);
  let qty = parseInt(qtyElem.textContent) + change;

  if (qty < 1) qty = 1; // Minimum quantity is 1
  qtyElem.textContent = qty;

  // Update total for each item
  const totalElem = document.getElementById(`total-${item}`);
  totalElem.textContent = (prices[item] * qty).toFixed(2) + "$";

  // Update subtotal and total
  updateCartTotal();
}

function removeItem(item) {
  const row = document.getElementById(`row-${item}`);
  row.remove();
  updateCartTotal();
}

function updateCartTotal() {
  const subtotals = Array.from(
    document.querySelectorAll("tbody td[id^='total-']")
  );
  let subtotal = subtotals.reduce(
    (sum, elem) => sum + parseFloat(elem.textContent),
    0
  );
  document.getElementById("subtotal").textContent = subtotal.toFixed(2) + "$";
  document.getElementById("total").textContent =
    (subtotal + 2.0).toFixed(2) + "$";
}

$(document).ready(function(){
  // Mirna
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
})