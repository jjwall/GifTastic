$(document).ready(function() {
var gifs = ["cat", "dog", "honey badger", "elephant", "zebra", "opossum"];

    $(".animal").bind("click", appendGifs);
      function appendGifs() {
        $("#gifs-appear-here").empty();
        var animal = $(this).attr("data-animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animalImage = $("<img class='gifanimate'>");
          animalImage.attr("src", results[i].images.fixed_height_still.url)
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state",'still');
          animalDiv.prepend(p);
          animalDiv.prepend(animalImage);
          $("#gifs-appear-here").prepend(animalDiv);
         }

        $(".gifanimate").on("click", function() {
          var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

    function renderButtons() {
        $("#button-div").empty();
        for (var i = 0; i < gifs.length; i++) {
          var a = $("<button>");
          a.addClass("animal");
          a.attr("data-animal", gifs[i]); 
          a.text(gifs[i]);
          $("#button-div").append(a);
        }
      }

      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
      });
      renderButtons();
      $(document).on("click", ".animal", appendGifs);
});