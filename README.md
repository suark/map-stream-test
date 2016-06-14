# Map Stream

Testing out the ability to stream geoJSON features to a leafletJS map using oboeJS. 

A leaflet map and two buttons. One button does a typical fetch, where the user sees nothing until the entire request is complete. The other button streams the request results and it's more visually satisfying for the user. I don't have any real geoJSON data so we use a library to generate random data on the server.

This project was made as a way to try streaming features to a leaflet map. When it comes to showing data to a user, streaming is often more satisfying, and mapping applications can be a great place to apply streaming techniques.

To run:

 * npm install
 * bower install
 * gulp


The main components are:

* leafletJS
* oboeJS
* geoJSON-random
