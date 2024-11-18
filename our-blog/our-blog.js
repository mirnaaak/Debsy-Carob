$(document).ready(function () {
  $.ajax({
    url: "blog.json",
    method: "GET",
    dataType: "json",
    success: function (blogItems) {
      fetchBlog(blogItems);
    },
    error: function (error) {
      console.log(error);
    },
  });

  function fetchBlog(blogItems) {
    $(".content").empty();

    blogItems.forEach((blogItem) => {
      let blogHTML = `
        <div class="card">
            <div class="card-image">
                <img src="${blogItem.image}" class="card-img-top" alt="...">
            </div>

            <div class="card-body">
                <div class="category-date">
                    <div class="category">
                        ${blogItem.category}
                    </div>
                    <div class="date">
                        ${blogItem.date}
                    </div>
                </div>
                <h5 class="card-title">${blogItem.title}</h5>
                <p class="card-text">${blogItem.description}
                </p>
                <div class="read-post" data-id="${blogItem.id}">
                    <span>Read Post</span>
                    <img src="images/arrow.svg" alt="">
                </div>
            </div>
        </div>
        `;

      $(".content").append(blogHTML);
    });
  }
});
