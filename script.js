var cities = ['Sacramento', 'Denver', 'Seattle', 'Portland', 'Miami', 'Austin', 'Pheonix']

 function displayWeatherInfo () {
    var city = 'Miami'
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=3455836d834ccb1cfc79c01accd2b751";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response)

    }) 
 }

// Function for displaying weather data
function renderButtons() {

    // Deletes the weather info prior to adding new info
var savedBtn = $('#saved-buttons')

    $(savedBtn).empty();
    // Loops through the array of cities
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generates buttons for each city in the array
        var a = $("<button>");
        // Adds a class of city to our button
        a.addClass("city btn btn-primary m-1 col-12");
        // Added a data-attribute
        a.attr("data-name", cities[i]);
        // Provided the initial button text
        a.text(cities[i]);
        // Added the button to the saved-buttons div
        $(savedBtn).prepend(a);
    }
}

// This function handles events where the search button is clicked
$("#button-search").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var city = $("#city-input").val().trim();

    // The city from the textbox is then added to our array
    cities.push(city);

    // Calling renderButtons which handles the processing of our city array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayWeatherInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();