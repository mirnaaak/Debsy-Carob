$(document).ready(function () {
  let productsData = [];

  function renderProducts(products) {
    const productsContainer = $(".products-cards");
    productsContainer.empty();
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
    addToCartProducts();
  }

  function addToCartProducts() {
    $(".add-cart").off("click");
    $(".add-cart").click(function () {
      const productId = $(this).data("id");

      const quantityInput = $(this).closest(".cart").find(".quantity-input");
      const quantity = Number(quantityInput.val().trim());

      let storedProducts = localStorage.getItem("cartProducts");
      let cartProducts = [];

      if (storedProducts) {
        cartProducts = JSON.parse(storedProducts) || [];
      }

      const existingProduct = cartProducts.find(
        (product) => product.id == productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const product = { id: productId, quantity: Number(quantity) };
        cartProducts.push(product);
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      
      quantityInput.val(1);
    });
  }

  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: function (products) {
      productsData = products;
      renderProducts(products);

      populateFilters(products);
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

  function populateFilters(products) {
    const categories = [...new Set(products.map((p) => p.category))].sort();
    const filterSelect = $("#filter");
    categories.forEach((category) => {
      filterSelect.append(`<option value="${category}">${category}</option>`);
    });

    const sortSelect = $("#sort");
    sortSelect.append(`
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    `);

    filterSelect.change(filterAndSortProducts);
    sortSelect.change(filterAndSortProducts);
  }

  function filterAndSortProducts() {
    const selectedCategory = $("#filter").val();
    const selectedSort = $("#sort").val();

    let filteredProducts = productsData;

    if (selectedCategory && selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSort === "asc") {
      filteredProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (selectedSort === "desc") {
      filteredProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    renderProducts(filteredProducts);
  }
});
