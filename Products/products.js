$(document).ready(function () {
  $.ajax({
    url: "products.json", // Ensure the correct path to your JSON file
    method: "GET",
    dataType: "json",
    success: function (products) {
      const productsContainer = $(".products-cards");
      products.forEach((product) => {
        const productHTML = `
                    <div class="card text-center">
                        <div class="card-image">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">Price: ${product.price}</p>
                            <div class="cart">
                                <div class="cart-info">
                                    <div class='quantity-counter'>
                                        <div class="counter-border">
                                            <div class="counter-content">
                                                <a class='btn btn-default minus-btn'>_</a>
                                                <input type='text' name='quantity' value='1' class='quantity-input' readonly />
                                                <a class='btn btn-default add-btn'>+</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="add-cart" data-id="${product.id}">
                                        <img src="../home/images/best-sellers/cart.svg" alt="Add to Cart">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        productsContainer.append(productHTML);
      });

      counter();
    },
    error: function (error) {
      console.error("Error fetching the products:", error);
    },
  });

  function counter() {
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
  }
});
