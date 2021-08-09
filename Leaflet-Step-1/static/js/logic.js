// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(queryUrl)
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// Create a map object
function createFeatures(earthquakeData){

    console.log ("earthquakeData =", earthquakeData );
    console.log ("earthquakeData lenght =", earthquakeData.length );
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    }).addTo(myMap);


    // Loop through the cities array and create one marker for each city object
    for (var i = 0; i < earthquakeData.length - 1; i++) {
    //for (var i = 0; i < 10; i++) {
      // Conditionals for countries points
      var longitude = earthquakeData[i].geometry.coordinates[0];
      var latitude = earthquakeData[i].geometry.coordinates[1];
      var depth = earthquakeData[i].geometry.coordinates[2];
      var location = [];
      location[0] = latitude ;
      location[1] = longitude;
      //console.log("location=",location);
      //console.log("depth=",depth);

      var color = "";
      //if (countries[i].points >= 200) {
      if (depth >= 90) {
        color = "Red";
      }
      else if (depth < 90 && depth >= 70) {
        color = "Salmon";
      }
      else if (depth < 70 && depth >= 50) {
        color = "Orange";
      }
      else if (depth < 50 && depth >= 30) {
        color = "Gold";
      }
      else if (depth < 30 && depth >= 10) {
        color = "GreenYellow";
      }
      else if (depth < 10 && depth >= -10) {
        color = "PaleGreen";
      }
      else {
        color = "Blue";
      }
      // Add circles to map
      L.circleMarker(location, {
        fillOpacity: 0.75,
        color: "gray",
        weight: 1,
        fillColor: color,
        // Adjust radius
        radius: earthquakeData[i].properties.mag * 3
      }).bindPopup("<h3> Place: " + earthquakeData[i].properties.place + "</h3> <hr> <h4>Magnitude: "+ earthquakeData[i].properties.mag +"</h4> <hr> <h5>Depth: "+ depth +"</h4>").addTo(myMap);
    }
}