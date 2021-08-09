
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


d3.json(queryUrl).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData){
   
    for (var i = 0; i < earthquakeData.length - 1; i++) {
    
      var longitude = earthquakeData[i].geometry.coordinates[0];
      var latitude = earthquakeData[i].geometry.coordinates[1];
      var depth = earthquakeData[i].geometry.coordinates[2];
      var location = [];
      location[0] = latitude ;
      location[1] = longitude;
      
      
      var color = "";
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
     
      L.circleMarker(location, {
        fillOpacity: 1,
        color: "gray",
        weight: 1,
        fillColor: color,
        radius: earthquakeData[i].properties.mag * 3
      }).bindPopup("<h4> Place: " + earthquakeData[i].properties.place + "</h4> <hr> <h4>Magnitude: "+ earthquakeData[i].properties.mag +"&nbsp&nbsp&nbsp| &nbsp&nbsp Depth: "+ depth +"</h4>").addTo(myMap);
    }

    //"<h3> Place: " + earthquakeData[i].properties.place + "</h3> <hr> <h4>Magnitude: "+ earthquakeData[i].properties.mag +"</h4> <hr> <h5>Depth: "+ depth +"</h4>").addTo(myMap);
    var legend = L.control({ position: "bottomright" });
    
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = ["-10-10","10-30","30-50","50-70","70-90","90+" ];
      var colors = ["LimeGreen", "GreenYellow",  "Gold", "Orange", "Tomato", "Crimson" ];
      var labels = [];

      var legendInfo = "<p><center> EQ Depth </center> </p>";
      div.innerHTML = legendInfo;

      limits.forEach(function(limit, index) {
         labels.push("<tr> <th style=\"background-color: " + colors[index] + "\">"+ "&nbsp&nbsp&nbsp&nbsp&nbsp" + "</th>" + "<td>" + limits[index]+ "</td>  </tr>");
      });

      div.innerHTML += "<table>" + labels.join("") + "</table>";
      return div;
    };

    legend.addTo(myMap);

}