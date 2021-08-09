// legend /2-Before/Activities/04-Par_MoneyChoropleth/Solved/Money_Choropleth.html
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(queryUrl)

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

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// Create a map object
function createFeatures(earthquakeData){

    console.log ("earthquakeData =", earthquakeData );
    console.log ("earthquakeData lenght =", earthquakeData.length );
    
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
        color = "Crimson";
      }
      else if (depth < 90 && depth >= 70) {
        color = "Tomato";
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
        color = "LimeGreen";
      }
      else {
        color = "Blue";
      }
      // Add circles to map
      L.circleMarker(location, {
        fillOpacity: 1,
        color: "gray",
        weight: 1,
        fillColor: color,
        // Adjust radius
        radius: earthquakeData[i].properties.mag * 3
      }).bindPopup("<h3> Place: " + earthquakeData[i].properties.place + "</h3> <hr> <h4>Magnitude: "+ earthquakeData[i].properties.mag +"</h4> <hr> <h5>Depth: "+ depth +"</h4>").addTo(myMap);
    }


    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = ["90+", "70-90", "50-70", "30-50", "10-30", "-10-10"];
      var colors = ["Crimson", "Tomato", "Orange", "Gold", "GreenYellow", "LimeGreen"];
      var labels = [];

     var legendInfo = "<p><center> Eathquake Depth </center> </p>";
      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
         labels.push("<tr> <th style=\"background-color: " + colors[index] + "\">"+ "&nbsp&nbsp&nbsp&nbsp&nbsp" + "</th>" + "<td>" + limits[index]+ "</td>  </tr>");
      });

      div.innerHTML += "<table>" + labels.join("") + "</table>";
      return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

    


}