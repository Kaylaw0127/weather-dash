var cities = ['Sacramento', 'Denver', 'Seattle', 'Portland', 'Miami', 'Austin']

 function displayWeatherInfo () {
    var city = $(this).attr("data-name")
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=3455836d834ccb1cfc79c01accd2b751";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        var location = `https://api.openweathermap.org/data/2.5/uvi?appid=3455836d834ccb1cfc79c01accd2b751&lat=` + response.city.coord.lat + `&lon=` + response.city.coord.lon
        console.log(response)

        // make city name appear in result section
        var result = $('#result-name');
    
        var name = response.city.name;
    
        var cityName = $(result).text(name);
    
        result.append(cityName)
    }) 
 }

 // Function for displaying weather data
function renderButtons() {

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

// Where the city search btn is clicked 
$("#button-search").on("click", function (event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();

    cities.push(city);

    renderButtons();
});

// added click to all city buttons 
$(document).on("click", ".city", displayWeatherInfo);


renderButtons()