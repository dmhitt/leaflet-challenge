//Dinnara Hitt

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(queryUrl)

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  
});


function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.circleMarker(feature.geometry.coordinates,{
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: countries[i].points / 7.5
          }).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) +  "</h3><hr><p> Mag: " + (feature.properties.mag)+"</p>" +
        "</h3><hr><p> Deepth: " + (feature.geometry.coordinates[2])+"</p>");
      //console.log(feature.geometry.coordinates[2]);
    }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {onEachFeature: onEachFeature});
    createMap(earthquakes);
}

function createMap(earthquakes) {
    console.log (earthquakes);
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);
}