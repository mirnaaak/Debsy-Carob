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
