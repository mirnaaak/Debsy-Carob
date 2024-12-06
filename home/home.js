//banner 

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector('.hero');
  const subtitle = document.getElementById('hero-subtitle');
  const title = document.getElementById('hero-title');
  const description = document.getElementById('hero-description');
  const dotsContainer = document.querySelector('.carousel-dots');

  // Array with background images and text
  const slides = [
    {
      image: 'url("images/banner/banner.png")',
      subtitle: 'Your Sweet Tooth’s',
      title: 'New Best Friend',
      description: 'Vegan - Dark Chocolate - No Added Sugar'
    },
    {
      image: 'url("images/banner/Brownie.png")',
      subtitle: 'The Perfect Snack',
      title: 'Hazelnut Craze',
      description: 'Vegan - Dark Chocolate - No Added Sugar'
    },
    {
      image: 'url("images/banner/Tahini.png")',
      subtitle: 'Freshly Ground, Your Perfect',
      title: 'Tahini Moment',
      description: 'Vegan - Dark Chocolate - No Added Sugar'
    }
   
   
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
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.addEventListener('click', () => {
        currentIndex = index;
        changeSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  createDots();

  setInterval(changeSlide, 5000);  // Automatically change slide every 5 seconds
  changeSlide();  // Initial call to set the first slide
});




// Yazan
const feedbacks = [
  {
    text: "Carob is a game-changer for vegans! Their naturally sweet, plant-based carob treats are made with clean ingredients, and the family story adds a special touch. It's a snack I can enjoy without compromise!",
    name: "Sara M",
  },
  {
    text: "Debsy Carob has been my go-to for healthy snacks. The taste and quality are unbeatable!",
    name: "Alex J",
  },
  {
    text: "Finally a treat that fits my dietary restrictions without sacrificing taste. Highly recommended!",
    name: "Mona K",
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
      <div class="button customization-btn add-ing">
        <a class="btn btn-default btn-more">add</a>
      </div>
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

  // MIRNA (end)
});
