var cars = ["bmw", "honda", "nissan", "ford","chevy", "lexus", "audi"];

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#car-Buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < cars.length; i++) {

        // Then dynamicaly generating buttons for each car in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of car to our button
        a.addClass("car-button");
        // Adding a data-attribute
        a.attr("data-name", cars[i]);
        // Providing the initial button text
        a.text(cars[i]);
        // Adding the button to the buttons-view div
        $("#car-Buttons").append(a);
    }
}
renderButtons();

$("#add-car").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var car = $("#car-input").val().trim();

    // Adding movie from the textbox to our array
    cars.push(car);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#car-Buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < cars.length; i++) {

        // Then dynamicaly generating buttons for each car in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of car to our button
        a.addClass("car-button");
        // Adding a data-attribute
        a.attr("data-name", cars[i]);
        // Providing the initial button text
        a.text(cars[i]);
        // Adding the button to the buttons-view div
        $("#car-Buttons").append(a);
    }
}

function displayCarInfo() {

    var car = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(queryURL);
        var cars = response.data;
        console.log(cars);
        $("#cars").empty();
        //Creating a div to hold the movie
        for (var i = 0; i < cars.length; i++) {
            var carDiv = $("<div class='car-div'>");

            // Storing the rating data
            var rating = cars[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            carDiv.append(pOne);

            // Retrieving the URL for the image
            var originalStillImgURL = cars[i].images.fixed_height_still.url;
            var originalImgURL = cars[i].images.fixed_height.url;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", originalStillImgURL);
            image.addClass("car");
            image.attr("data-state", "still");
            image.attr("data-animate", originalImgURL);
            image.attr("data-still", originalStillImgURL);
            // Appending the image
            carDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#cars").prepend(carDiv);
        }

    });

}
$(document).on("click", ".car", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
$(document).on("click", ".car-button", displayCarInfo);
//renderButtons();
