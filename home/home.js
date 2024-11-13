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

window.onload = showFeedback;

document.querySelector("#readF").addEventListener("click", function () {
  showFeedback();
});

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

// Mirna
$(document).ready(function () {
  // best-sellers
  showBS();

  let begin = 1;
  let end = 4;

  function showBS() {
    $.ajax({
      url: "../products.json",
      method: "GET",
      dataType: "json",
      success: function (products) {
        if (begin >= 0 && end <= products.length) {
          let bestS = products.slice(begin, end);
          fetchBestS(bestS);
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }

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

  function fetchBestS(products) {
    $(".cards-items").empty();

    let i = 0;

    products.forEach((product) => {
      let bestSHTML = "";

      if (i !== 1) {
        bestSHTML = `
        <div class="card text-center">
          <div class="card-image">
            <img src="../${product.image}" class="card-img-top" alt="...">
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
                      <input type='text' name='quantity' value='0' class='quantity-input' readonly />
                      <a class='btn btn-default add-btn'>+</a>
                    </div>
                  </div>
                </div>
                <div class="add-cart">
                  <img src="images/best-sellers/cart.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      } else {
        bestSHTML = `
        <div class="card text-center" id="card-center">
          <div class="card-image">
            <img src="../${product.image}" class="card-img-top" alt="...">
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
                      <input type='text' name='quantity' value='0' class='quantity-input' readonly />
                      <a class='btn btn-default add-btn'>+</a>
                    </div>
                  </div>
                </div>
                <div class="add-cart">
                  <img src="images/best-sellers/cart.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      $(".cards-items").append(bestSHTML);
      i++;
    });
  }

  // customization
  $(".size-btn").hover(
    function () {
      // $(this).css("width", "42px");
      // $(this).css("height", "41px");
      // $(this).find("h5").css("font-size", "30px");
      // $(this).closest(".size-name").css("margin-top", "-20px");
      $(this).closest(".size-name").find("small").css("visibility", "visible");
    },
    function () {
      // $(this).css("width", "32px");
      // $(this).css("height", "31px");
      // $(this).find("h5").css("font-size", "24px");
      // $(this).closest(".size-name").css("margin-top", "-20px");
      $(this).closest(".size-name").find("small").css("visibility", "hidden");
    }
  );
});
