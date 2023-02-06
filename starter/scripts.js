//Declare a variable 
var city="";
var searchCity = $("#search-input");
var searchButton = $("#search-button");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidity= $("#humidity");
var currentWindSpeed=$("#wind");

var seCity=[];


$("#search-button").on("click",displayWeather);
$(document).on("click",lastSearch);
$(window).on("load",lastCity);
// check the city search in storage
function find(c){
    for (var i=0; i<seCity.length; i++){
        if(c.toUpperCase()===seCity[i]){
            return -1;
        }
    }
    return 1;
}
//Set up the API key
var APIKey="3335123026b99dfa251c15804e9bc324";
// Display the curent and future weather 
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
        forecast(city);
    }
}
// create the AJAX call
function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
  
      console.log(response);

        //Dta object from server side Api for icon property.
        var weatherIcon= response.weather[0].icon;
        var iconLink="https://openweathermap.org/img/wn/"+ weatherIcon +".png" ;

        var date=new Date(response.dt*1000).toLocaleDateString();

        //parse the response for name of city and concanatig the date and icon.
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconLink+">");

        // parse the response to display the current temperature.
        var temperatureDC = (response.main.temp - 273.15) ;
        $(currentTemperature).html((temperatureDC).toFixed(2)+"&#8451");
  
        //Display Wind speed and convert to MPH
        var windSpeed=response.wind.speed;
        var windSpeedMph=(windSpeed*2.237).toFixed(1);
        $(currentWindSpeed).html(windSpeedMph+"MPH");

        // Display the Humidity
        $(currentHumidity).html(response.main.humidity+"%");
    });
}

// display the forecast 
function forecast(city){
    var dayover= false;
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var weatherIcon= response.list[((i+1)*8)-1].weather[0].icon;
            var iconLink="https://openweathermap.org/img/wn/"+weatherIcon+".png" ;
            var temperatureKelvin= response.list[((i+1)*8)-1].main.temp;
            var temperatureDC=(temperatureKelvin-273.5).toFixed(2);
            var windSpeed=response.list[((i+1)*8)-1].wind.speed;
            var windspeedMph=(windSpeed*2.237).toFixed(1);
            var humidity= response.list[((i+1)*8)-1].main.humidity;

        
            $("#forcastDate"+i).html(date);
            $("#forcastImage"+i).html("<img src="+iconLink+">");
            $("#forcastTemperature"+i).html(temperatureDC+"&#8451");
            $("#forcastWind"+i).html(windspeedMph+"MPH");  
            $("#forcastHumidity"+i).html(humidity+"%");
        }
        
    });
}

//add the passed city on the search history
function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item list-group-item-info");  
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}
// display the past search in the list group 
function lastSearch(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
        forecast(city);
    }
}

// render function
function lastCity(){
    $("ul").empty();
    var seCity = JSON.parse(localStorage.getItem("cityname"));
    if(seCity!==null){
        seCity=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<seCity.length;i++){
            addToList(seCity[i]);
        }
        city=seCity[i-1];
        currentWeather(city);
        forecast(city);
    }

}

//Click Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",lastSearch);
$(window).on("load",lastCity);













