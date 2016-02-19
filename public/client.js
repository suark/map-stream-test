/*
	A basic client that contains a map.
	It can request polygons using oboe like a traditional ajax request
	and like a streaming request.
*/
var url = 'http://localhost:3001/features';
var map = createMap();

function requestTraditional() {
	/*
		Makes a request to fetch features using a traditional request.
		Each fetched feature is passed to 'displayFeature'
	*/
	showLoadingIndicator(true);
	oboe(url)
		.done(function(features) {
			L.geoJson(features.polygons).addTo(map);
			showLoadingIndicator(false);
		})
		.fail(function() {
			showLoadingIndicator(false);
		});
};

function requestStreaming() {
	/*
		Makes a request to fetch features using streaming.
		Each fetched feature is passed to 'displayFeature'
	*/
	showLoadingIndicator(true);
	oboe(url)
		.node('polygons.*', function(polygon) {
			L.geoJson(polygon).addTo(map);
		})
		.done(function(features) {
			showLoadingIndicator(false);
		});
};

function showLoadingIndicator(flag) {
	/*
		Get the loading indicator to show or hide
	*/
	if (flag) {
		document.getElementById('loading').style.visibility = 'visible';
	} else {
		document.getElementById('loading').style.visibility = 'hidden';
	};
};

function createMap() {
	/*
		Create our Leaflet Map.
		This assumes that a div exists with the id="map"
	*/
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