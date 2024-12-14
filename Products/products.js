$(document).ready(function () {
  // Rami
  let productsData = [];

  // Event listener for the search icon
  $("#searchIcon").on("click", function (event) {
    event.preventDefault();  // Prevent the default form submission
    $("#searchForm").submit();  // Submit the form when the icon is clicked
  });

  // Fetch the product data
  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: function (products) {
      productsData = products.filter((product) => product.id !== 0);
      console.log(productsData);
      renderProducts(productsData);

      // Get the search query from the URL (if available)
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get('search');

      // If there's a search query, filter the products
      if (searchQuery) {
        const filteredProducts = filterProductsBySearch(productsData, searchQuery);
        renderProducts(filteredProducts);

        // Scroll to the product section after rendering the products
        scrollToProductsSection();
      } else {
        renderProducts(productsData); // Show all products if no search query
      }

      populateFilters(productsData);
    },
    error: function (error) {
      console.error("Error fetching the products:", error);
    },
  });

  // Function to filter products based on the search query
  function filterProductsBySearch(products, query) {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  // Function to render the filtered products on the page
  function renderProducts(products) {
    const productsContainer = $(".products-cards");
    productsContainer.empty();

    if (products.length === 0) {
      productsContainer.append("<p>No products found matching your search.</p>");
      return;
    }

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

  // Smooth scroll to the product section after search
  function scrollToProductsSection() {
    $('html, body').animate({
      scrollTop: $(".products_section").offset().top
    }, 1000); // Scroll duration in milliseconds (1 second)
  }
  // Rami (end)

  // Mirna
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

  function counter() {
    $(".minus-btn").click(function () {
      let quantityInput = $(this)
        .closest(".counter-content")
        .find(".quantity-input");
      let quantity = quantityInput.val().trim();
      quantity--;
      if (quantity >= 1) {
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
  // Mirna (end)

  // Jana
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
  // Jana (end)
});
