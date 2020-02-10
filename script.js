var cities = ['Sacramento', 'Denver', 'Seattle', 'Portland', 'Miami', 'Austin']

// display date in result section
var display = moment().format('dddd, MMMM Do')
var date = $('#date')
$(date).html(display)

//icon images
var clear = `http://openweathermap.org/img/wn/01d@2x.png`
var fewClouds = `http://openweathermap.org/img/wn/02d@2x.png`
var scatteredClouds = `http://openweathermap.org/img/wn/03d@2x.png`
var brokenClouds = `http://openweathermap.org/img/wn/04d@2x.png`
var showerRain = `http://openweathermap.org/img/wn/09d@2x.png`
var rain = `http://openweathermap.org/img/wn/10d@2x.png`
var thunderStorm = `http://openweathermap.org/img/wn/11d@2x.png`
var snow = `http://openweathermap.org/img/wn/13d@2x.png`

function displayWeatherInfo () {
    var city = $(this).attr("data-name")
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=3455836d834ccb1cfc79c01accd2b751";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        var location = `https://api.openweathermap.org/data/2.5/uvi?appid=3455836d834ccb1cfc79c01accd2b751&lat=` + response.city.coord.lat + `&lon=` + response.city.coord.lon
        console.log(response)

        // make city name appear in waether result section
        var result = $('#result-name');
    
        var name = response.city.name;
        
        var cityName = $(result).text(name);
        
        result.append(cityName)

    // display weather data in weather results section
    var tempResult = $('#result-temp')
    var humidityResult = $("#result-humidity")
    var windSpeedResult = $("#result-windspeed")

    var temp = response.list[0].main.temp
    $(tempResult).text("Temperature: " + temp + "˚F")

    var humidity = response.list[0].main.humidity
    $(humidityResult).text("Humidity: " + humidity + "%")

    var windSpeed = response.list[0].wind.speed
    $(windSpeedResult).text("Wind Speed: " + windSpeed + " mph")

    //display icons 
    var iconResult = $("#result-icon")
    var icon = response.list[0].weather[0].icon

    if (icon == `01d` || icon == `01n`) {
        var image = $(`#result-icon`).attr(`src`, clear)
        $(`#result-icon`).append(image)
    } else if (icon == `02d` || icon == `02n`) {
        var image = $(`#result-icon`).attr(`src`, fewClouds)
        $(`#result-icon`).append(image)
    } else if (icon == `03d` || icon == `03n`) {
        var image = $(`#result-icon`).attr(`src`, scatteredClouds)
        $(`#result-icon`).append(image)
    } else if (icon == `04d` || icon == `04n`) {
        var image = $(`#result-icon`).attr(`src`, brokenClouds)
        $(`#result-icon`).append(image)
    } else if (icon == `09d` || icon == `09n`) {
        var image = $(`#result-icon`).attr(`src`, showerRain)
        $(`#result-icon`).append(image)
    } else if (icon == `10d` || icon == `10n`) {
        var image = $(`#result-icon`).attr(`src`, rain)
        $(`#result-icon`).append(image)
    } else if (icon == `11d` || icon == `11n`) {
        var image = $(`#result-icon`).attr(`src`, thunderStorm)
        $(`#result-icon`).append(image)
    } else if (icon == `13d` || icon == `13n`) {
        var image = $(`#result-icon`).attr(`src`, snow)
        $(`#result-icon`).append(image)
    }

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