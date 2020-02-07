var city = "miami"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=3455836d834ccb1cfc79c01accd2b751";



    // Creating an AJAX call for the specific city button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(queryURL)
        console.log(response)
    })