console.log("App Initiated");

var url = 'http://localhost:3001/features';

var map = createMap();


//Functions ~~~~

function requestTraditional() {
	/*
		Makes a request to fetch features using a traditional request.
		Each fetched feature is passed to 'displayFeature'
	*/
	console.log('Requesting Features Traditionally')

	oboe(url)
		.done(function(features) {
			console.log(features);
			L.geoJson(features.polygons).addTo(map);
		})
		.fail(function() {
			console.log('Error requesting features.')
		});
};

function requestStreaming() {
	/*
		Makes a request to fetch features using streaming.
		Each fetched feature is passed to 'displayFeature'
	*/
	console.log('Requesting Features with Streaming')

	oboe(url)
		.node('polygons.*', function(polygon) {
			console.log(polygon);
			L.geoJson(polygon).addTo(map);
		})
		.done(function(features) {
			console.log(features);
		});
};

function displayFeature(feature, type) {
	/*
		Take a feature and attempts to add it to the map
	*/
	console.log('Displaying Features: ', feature, type);

	L.geoJson(feature).addTo(map);
};

function createMap() {
	/*
		Create our Leaflet Map.
		This assumes that a div exists with the id="map"
	*/
	console.log('Creating the Map')

	var map = L.map('map', {
		// center: [53.579, -109.072],
		center: [40, 15],
		zoom: 2
	});

	var baseMaps = {
		OpenStreetMap: L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			// attribution: '&copy; <a href="//openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}),
		'ESRI Arial': L.tileLayer("//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg", {
			maxZoom: 18,
			// attribution: 'Tiles Â© Esri â€” Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		})
	};

	L.control.layers(baseMaps, null, {
		position: 'topleft'
	}).addTo(map);

	baseMaps['ESRI Arial'].addTo(map);

	return map;
};