class MovieRating {
  constructor() {
    this.clearBtn = false;
    $(
      addEventListener("submit", (e) => {
        e.preventDefault();
        if ($(".title").val().length < 2) {
          return alert("Movie title must have at least 2 characters");
        }
        this.createRating();
        $("input").val("");
        if (!this.clearBtn) {
          $(".movie-container")
            .on("click", "button", function () {
              $("li").remove();
            })
            .append("<button class='clear'>Clear List</button>");
          this.clearBtn = true;
        }
      })
    );
  }
  createRating() {
    this.title = $(".title").val();
    this.rating = $(".rating").val();
    $("ul").append(`<li>${this.title}: ${this.rating}</li>`);
  }
}

new MovieRating();
