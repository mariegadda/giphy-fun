

// array of animals 
var animalArray=["cat", "dog", "mouse", "red panda", "bobcat", "owl", "panda", "penguin", "bear", "bat" ]
 // for loop to make a button out of each animal, and add the data-type attribute of that animal
  for (var i = 0; i < animalArray.length; i++) {
      
      var buttonDiv = $("#buttons-appear-here");
      var buttons = $("<button>").text(animalArray[i]);
      buttons.attr("data-type", animalArray[i]);
      buttonDiv.append(buttons);
    }  

    // Event listener for all button elements
    $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var animal = $(this).attr("data-type");
      // makes a variable for a div to hold all 10 gifs, prepends that to the div in the html
      var bigGifDiv = ("<div id='giphys'>")
      $("#gifs-appear-here").html(bigGifDiv);
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
         
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item col-md-6'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);


              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML

              $("#giphys").prepend(gifDiv);

            
          }
        });
    });
