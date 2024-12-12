//banner

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const subtitle = document.getElementById("hero-subtitle");
  const title = document.getElementById("hero-title");
  const description = document.getElementById("hero-description");
  const dotsContainer = document.querySelector(".carousel-dots");

  // Array with background images and text
  const slides = [
    {
      image: 'url("images/banner/banner.png")',
      subtitle: "Your Sweet Tooth’s",
      title: "New Best Friend",
      description: "Vegan - Dark Chocolate - No Added Sugar",
    },
    {
      image: 'url("images/banner/Brownie.png")',
      subtitle: "The Perfect Snack",
      title: "Hazelnut Craze",
      description: "Vegan - Dark Chocolate - No Added Sugar",
    },
    {
      image: 'url("images/banner/Tahini.png")',
      subtitle: "Freshly Ground, Your Perfect",
      title: "Tahini Moment",
      description: "Vegan - Dark Chocolate - No Added Sugar",
    },
  ];

  let currentIndex = 0;

  function changeSlide() {
    const currentSlide = slides[currentIndex];

    // Update background and text
    hero.style.backgroundImage = currentSlide.image;
    subtitle.innerText = currentSlide.subtitle;
    title.innerText = currentSlide.title;
    description.innerText = currentSlide.description;

    updateDots(currentIndex);

    currentIndex = (currentIndex + 1) % slides.length;
  }

  function updateDots(index) {
    const dots = document.querySelectorAll(".carousel-dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "carousel-dot";
      dot.addEventListener("click", () => {
        currentIndex = index;
        changeSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  createDots();

  setInterval(changeSlide, 5000); // Automatically change slide every 5 seconds
  changeSlide(); // Initial call to set the first slide
});

// Yazan
const feedbacks = [
  {
    text: "Debsy Carob is a game-changer for vegans! Their naturally sweet, plant-based carob treats are made with clean ingredients, and the family story adds a special touch. It's a snack I can enjoy without compromise!",
    name: "Sara M.",
  },
  {
    text: "As someone who loves discovering healthy snacks, Debsy Carob is a gem! The traditional, family-oriented touch makes the experience even more wholesome. Plus, the taste is incredible—it feels good to indulge guilt-free!",
    name: "Maya H.",
  },
  {
    text: "Debsy Carob is a must-try for anyone seeking a unique, natural treat. The blend of tradition and sustainability makes it stand out. Every bite reminds me of how snacks can be delicious and mindful at the same time!",
    name: "Omar K.",
  },
];

let currentFeedback = 0;

function showFeedback() {
  const feedback = feedbacks[currentFeedback];
  document.getElementById("feedbackText").innerText = feedback.text;
  document.getElementById("feedbackName").innerText = feedback.name;
}

function nextFeedback() {
  currentFeedback = (currentFeedback + 1) % feedbacks.length;
  showFeedback();
}

function previousFeedback() {
  currentFeedback = (currentFeedback - 1 + feedbacks.length) % feedbacks.length;
  showFeedback();
}

document
  .querySelector(".input-with-icon")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      console.log("Form submitted");
    }
  });

document.querySelector(".arrow-prev").addEventListener("click", function () {
  previousFeedback();
});

document.querySelector(".arrow-next").addEventListener("click", function () {
  nextFeedback();
});

$(document).ready(function () {
  // MIRNA (start)

  // best-sellers
  showBS();

  $(".ing").hide();

  $(".move-left").click(function () {
    begin--;
    end--;

    showBS();
  });

  $(".move-right").click(function () {
    begin++;
    end++;

    showBS();
  });

  // products
  showProducts();

  // customization

  // customization-ingredients
  showJI();

  $(".size-btn").hover(
    function () {
      $(this).closest(".size-name").find("small").css("visibility", "visible");
    },
    function () {
      $(this).closest(".size-name").find("small").css("visibility", "hidden");
    }
  );

  let size = "";
  $(".size-btn").click(function () {
    size = $(this).find("h5").text();
    $(".size-btn").css("background-color", "transparent");
    $(this).css("background-color", "#E0CCB0");
  });

  $(".undo").click(function () {
    if ($(".i-1").is(":hidden")) {
      alert("Please add ingredients to undo!");
    }

    if (size == "S") {
      if ($(".i-2").is(":hidden") && $(".i-3").is(":hidden")) {
        $(".i-1").empty().hide();
        $(".jar").removeClass("jar-rel");
        $(".jar-customization").css("margin-top", "45px");
        updateCaloriesAndPrice(
          Number($(".i-1").data("calories")),
          Number($(".i-1").data("price")),
          "subtract"
        );
      } else if ($(".i-3").is(":hidden")) {
        $(".i-2").empty().hide();
        $(".jar-customization").css("margin-top", "318px");
        updateCaloriesAndPrice(
          Number($(".i-2").data("calories")),
          Number($(".i-2").data("price")),
          "subtract"
        );
      } else if (
        !(
          $(".i-1").is(":hidden") ||
          $(".i-2").is(":hidden") ||
          $(".i-3").is(":hidden")
        )
      ) {
        $(".i-3").empty().hide();
        $(".jar-customization").css("margin-top", "245px");
        updateCaloriesAndPrice(
          Number($(".i-3").data("calories")),
          Number($(".i-3").data("price")),
          "subtract"
        );
      }
    }
  });

  $(".reset").click(function () {
    if (!$(".i-1").is(":hidden")) {
      reset();
    } else {
      alert("Please add ingredients to reset!");
    }
  });

  // blog btn
  $("#our-blog .btn-con").click(function () {
    window.location.href = "../our-blog/our-blog.html";
  });

  $(".container-about .btn-more").click(function () {
    window.location.href = "../AboutUs/about.html";
  });

  // functions
  let begin = 1;
  let end = 4;
  let ing = 0;

  function showBS() {
    $.ajax({
      url: "../Products/products.json",
      method: "GET",
      dataType: "json",
      success: function (products) {
        products = products.filter((product) => product.bestSeller);

        let bestS = products;
        if (begin >= 0 && end <= products.length) {
          bestS = products.slice(begin, end);
        } else if (begin < 0) {
          begin = products.length - 3;
          end = products.length;
          bestS = products.slice(begin, end);
        } else if (end > products.length) {
          begin = 1;
          end = 4;
          bestS = products.slice(begin, end);
        }
        fetchpcBestS(bestS);
        fetchmobBestS(products);

        counter();
        addToCartProducts();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function fetchpcBestS(products) {
    $(".cards-items").empty();

    let i = 0;

    products.forEach((product) => {
      let pcBestSHTML = "";

      if (i !== 1) {
        pcBestSHTML = `
        <div class="card text-center">
          <div class="card-image">
            <img src="../Products/${product.image}" class="card-img-top" alt="...">
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
                  <img src="images/best-sellers/cart.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      } else {
        pcBestSHTML = `
        <div class="card text-center" id="card-center">
          <div class="card-image">
            <img src="../Products/${product.image}" class="card-img-top" alt="...">
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
                  <img src="images/best-sellers/cart.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      $(".cards-items").append(pcBestSHTML);
      i++;
    });
  }

  function fetchmobBestS(products) {
    products.forEach((product) => {
      let mobileBestSHTML = `
      <div class="card text-center mob-card">
        <div class="card-image">
          <img src="../Products/${product.image}" class="card-img-top" alt="...">
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
                <img src="images/best-sellers/cart.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>`;

      $(".cards-items").append(mobileBestSHTML);
    });
  }

  function showProducts() {
    $.ajax({
      url: "../Products/products.json",
      method: "GET",
      dataType: "json",
      success: function (products) {
        products = products.filter((product) => product.id !== 0);
        fetchProducts(products.slice(0, 8));
        counter();
        addToCartProducts();
      },
      error: function (error) {
        console.error("Error fetching the products:", error);
      },
    });
  }

  function fetchProducts(products) {
    $(".products-cards").empty();

    products.forEach((product) => {
      const productsHTML = `
      <div class="card text-center">
        <div class="card-image">
          <img src="../Products/${product.image}" class="card-img-top" alt="${product.title}">
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
      </div>`;

      $(".products-cards").append(productsHTML);
    });
  }

  function showJI() {
    $.ajax({
      url: "jar-ingredients.json",
      method: "GET",
      dataType: "json",
      success: function (ingredients) {
        jarIngredients(ingredients[ing]);

        $(".ing-left").click(function () {
          ing--;

          if (ing >= 0) {
            showJI();
          } else {
            ing = ingredients.length;
            showJI();
          }
        });

        $(".ing-right").click(function () {
          ing++;

          if (ing <= ingredients.length) {
            showJI();
          } else {
            ing = 0;
            showJI();
          }
        });

        $(".add-ing").click(function () {
          if (size === "") {
            alert("Please select size to start adding ingredients!");
          } else {
            let calories = Number($(this).data("calories"));
            let price = Number($(this).data("price"));
            let jarImage = $(this).data("jar");

            if (size == "S") {
              if (jarImage === "") {
                alert(
                  "Jar image is unavailable at this moment, please try another item!"
                );
              } else {
                $(".jar").addClass("jar-rel");

                if (!$(".i-3").is(":hidden")) {
                  alert(
                    "You have reached the maximum number of ingredients for this size!"
                  );
                }

                if ($(".i-1").is(":hidden")) {
                  $(".jar-customization").css("margin-top", "318px");
                  updateCaloriesAndPrice(calories, price, "add");
                  $(".i-1").data("calories", calories);
                  $(".i-1").data("price", price);
                  $(".i-1").append($("<img>").attr("src", jarImage)).show();
                } else if ($(".i-2").is(":hidden")) {
                  $(".jar-customization").css("margin-top", "245px");
                  updateCaloriesAndPrice(calories, price, "add");
                  $(".i-2").data("calories", calories);
                  $(".i-2").data("price", price);
                  $(".i-2").append($("<img>").attr("src", jarImage)).show();
                } else if ($(".i-3").is(":hidden")) {
                  $(".jar-customization").css("margin-top", "155px");
                  updateCaloriesAndPrice(calories, price, "add");
                  $(".i-3").data("calories", calories);
                  $(".i-3").data("price", price);
                  $(".i-3").append($("<img>").attr("src", jarImage)).show();
                }
              }
            } else {
              alert(
                "Size is unavailable at this moment. Please try another size!"
              );
            }
          }
        });

        addToCartProducts();
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

  function jarIngredients(ingredient) {
    let ingredientHTML = `          
    <div class="ing-image">
      <div class="ing-left">
        <img src="images/customization/left.svg" alt="">
      </div>
      <img src="${ingredient.image}" id="ing" alt="">
      <div class="ing-right">
        <img src="images/customization/right.svg" alt="">
      </div>
    </div>
    <div class="ing-details">
      <h5 id="ing-title">${ingredient.name}</h5>
      <button class="btn-more customization-btn add-ing" data-calories="${ingredient.calories}" data-price="${ingredient.price}" data-jar="${ingredient.jarImage}">add</button>
    </div>`;

    $(".ingredient").empty().append(ingredientHTML);
  }

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

  function addToCartProducts() {
    $(".add-cart").off("click");
    $(".add-cart").click(function () {
      let productId = $(this).data("id");

      let storedProducts = localStorage.getItem("cartProducts");
      let cartProducts = [];

      if (storedProducts) {
        cartProducts = JSON.parse(storedProducts) || [];
      }

      let existingProduct = cartProducts.find(
        (product) => product.id == productId
      );

      let product = {};

      if (productId == 0) {
        if ($(".i-1").is(":hidden")) {
          alert("Please select ingredients to add to cart!");
        } else if ($(".i-3").is(":hidden")) {
          alert("Please add at least 3 ingredients!");
        } else {
          if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1;
          } else {
            product = {
              id: productId,
              price: Number(
                $(".total .price .value h6").text().replace("$", "")
              ),
              quantity: 1,
            };
            cartProducts.push(product);
          }

          reset();
        }
      } else {
        let quantityInput = $(this).closest(".cart").find(".quantity-input");
        let quantity = Number(quantityInput.val().trim());

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          product = {
            id: productId,
            quantity: Number(quantity),
          };

          cartProducts.push(product);
        }

        quantityInput.val(1);
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    });
  }

  function updateCaloriesAndPrice(caloriesVal, priceVal, operation) {
    let calories = $(".calories .value h6");
    let price = $(".price .value h6");

    if (operation === "add") {
      if (calories.text() == "__" && price.text() == "__") {
        calories.text(caloriesVal);
        price.text(priceVal + "$");
      } else {
        calories.text(caloriesVal + Number(calories.text()));
        price.text(priceVal + Number(price.text().replace("$", "")) + "$");
      }
    } else if (operation === "subtract") {
      let cal = Number(calories.text()) - caloriesVal;
      let pr = Number(price.text().replace("$", "")) - priceVal;

      if (cal == 0 && pr == 0) {
        calories.text("__");
        price.text("__");
      } else {
        calories.text(cal);
        price.text(pr + "$");
      }
    }
  }

  function reset() {
    $(".ing").empty().hide();
    $(".jar").removeClass("jar-rel");
    $(".jar-customization").css("margin-top", "45px");
    $(".calories .value h6").text("__");
    $(".price .value h6").text("__");
    $(".size-btn").css("background-color", "transparent");
  }

  // MIRNA (end)
});
