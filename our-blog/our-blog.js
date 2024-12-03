$(document).ready(function () {
  $(".blog-details").hide();

  $.ajax({
    url: "blog.json",
    method: "GET",
    dataType: "json",
    success: function (blogItems) {
      blogItems = blogItems;
      fetchBlog(blogItems);
      fetchCategories(blogItems);
    },
    error: function (error) {
      console.log(error);
    },
  });

  function fetchBlog(blogItems) {
    $(".blog-items").empty();

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

      $(".blog-items").append(blogHTML);

      $(".card-text").text(function (index, currentText) {
        return currentText.substr(0, 76) + "...";
      });
    });

    $(".read-post").click(function () {
      blogId = $(this).data("id");
      $.ajax({
        url: "blog.json",
        method: "GET",
        dataType: "json",
        success: function (blogs) {
          blogs.forEach((blog) => {
            if (blog.id == blogId) {
              blogDetails(blog);
            }
            $("#blog-details").modal("show");
          });
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  }

  function blogDetails(blog) {
    let blogDetailsHTML = `
    <div class="close back" data-bs-dismiss="modal" aria-label="Close">
      <img src="images/back.svg" alt="">
      <span>Back to Blog</span>
    </div>
    <div class="details-top">
      <div class="blog-title">
        ${blog.title}
      </div>
      <div class="category-date">
        <div class="category">
          ${blog.category}
        </div>
        <div class="date">
          ${blog.date}
        </div>
      </div>
    </div>
    <div class="details-bottom">
      <div class="blog-image">
          <img src="${blog.image}" alt="...">
      </div>
      <div class="blog-description">
        ${blog.description}
      </div>
    </div>`;

    $(".modal-content").empty().append(blogDetailsHTML);
  }

  function fetchCategories(blogItems) {
    $(".categories").empty();

    let categories = new Set();
    blogItems.forEach((blogItem) => {
      categories.add(blogItem.category);
    });

    let categoriesHTML = `<div class="category" data-name="All">
        All
      </div>`;
    $(".categories").append(categoriesHTML);

    categories.forEach((category) => {
      categoriesHTML = `
      <div class="category" data-name="${category}">
        ${category}
      </div>
      `;

      $(".categories").append(categoriesHTML);
    });

    $(".category").click(function () {
      let category = $(this).data("name");
      console.log(category);
      filterItems(blogItems, category);
    });
  }

  function filterItems(blogItems, category) {
    
    if (category != "All") {
      blogItems = blogItems.filter(function (blogItem) {
        return blogItem.category == category;
      });
    }

    fetchBlog(blogItems);
  }
});
