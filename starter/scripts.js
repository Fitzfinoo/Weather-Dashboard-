

function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=HongKong"
    // Begin building an object to contain our API call's query parameters


    // Set the API key
    var queryParams = { "api-key": "&appid=3335123026b99dfa251c15804e9bc324" };

   
  
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = $(".search-input")
      .val()
      .trim();
    
    console.log("---------------\n URL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
  }
  





    // .on("click") function associated with the Search Button
$("search-button").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });
  
//   //  .on("click") function associated with the clear button
//   $("#clear-all").on("click", clear);
  




















 