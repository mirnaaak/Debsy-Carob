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

$(document).ready(function () {
  // Mirna
  showCartItems();
  counter();

  function counter() {
    $(".minus-btn, .add-btn").off("click");

    $(".minus-btn").click(function () {
      let quantityInput = $(this)
        .closest(".counter-content")
        .find(".quantity-input");
      let quantity = quantityInput.val().trim();
      quantity--;
      if (quantity >= 1) {
        quantityInput.val(quantity);
        const productId = $(this).data("id");
        let storedProducts = localStorage.getItem("cartProducts");
        let cartProducts = [];

        if (storedProducts) {
          cartProducts = JSON.parse(storedProducts) || [];
        }

        const existingProduct = cartProducts.find(
          (product) => product.id == productId
        );

        existingProduct.quantity = quantity;

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

        showCartItems();
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

        const productId = $(this).data("id");
        let storedProducts = localStorage.getItem("cartProducts");
        let cartProducts = [];

        if (storedProducts) {
          cartProducts = JSON.parse(storedProducts) || [];
        }

        const existingProduct = cartProducts.find(
          (product) => product.id == productId
        );

        existingProduct.quantity = quantity;

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

        showCartItems();
      }
    });
  }

  function showCartItems() {
    $.ajax({
      url: "../Products/products.json",
      method: "GET",
      dataType: "json",
      success: function (products) {
        let storedProducts = JSON.parse(localStorage.getItem("cartProducts"));

        $("#cart-items").empty();

        products.forEach((product) => {
          storedProducts.forEach((sproduct) => {
            if (product.id == sproduct.id) {
              if (sproduct.price !== undefined) {
                fetchCartProducts(product, sproduct.price, sproduct.quantity);
              } else {
                fetchCartProducts(product, 0, sproduct.quantity);
              }
            }
          });
        });

        counter();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function fetchCartProducts(product, price, quantity) {
    let qty = parseInt(quantity, 10);
    let total = "";
    if (price === 0) {
      price = parseFloat(product.price, 10);
    }

    total = price * qty;
    total = parseFloat(total.toFixed(2));

    let productHTML = `
      <tr>
        <td class="prod"><img class="itemimg" src="../Products/${product.image}" alt="${product.title}"><span
          class="itemname">${product.title}</span></td>
        <td class='quantity'>
          <div class='quantity-counter'>
            <div class="counter-border">
              <div class="counter-content">
                <a class='btn btn-default minus-btn' data-id="${product.id}">_</a>
                <input type='text' name='quantity' value='${quantity}' class='quantity-input' readonly />
                <a class='btn btn-default add-btn' data-id="${product.id}">+</a>
              </div>
            </div>
          </div>
        </td>
        <td class="total">${total}$</td>
        <td class="Remove"> <img src="cartimages/remove.svg" alt=""></td>
      </tr>
    `;

    $("#cart-items").append(productHTML);
  }
  // Mirna (end)
});
