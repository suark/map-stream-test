/*
	A basic client that contains a map.
	It can request polygons using oboe like a traditional ajax request
	and like a streaming request.
*/
var url = 'http://localhost:3001/features';
var map = createMap();
var message = '';
var loading = false;
var layer = [];

function requestTraditional() {
	/*
		Makes a request to fetch features and uses oboe like a traditional request.
	*/
	showLoadingIndicator(true);
	showMessageArea(false);
	removeLayers();
	oboe(url)
		.done(function(features) {
			loadLayers(L.geoJson(features.polygons));
			showLoadingIndicator(false);
			console.log(features);
			showMessageArea(true, 'Loaded ' + features.polygons.length + ' features');
		})
		.fail(function() {
			showLoadingIndicator(false);
			showMessageArea(true, 'Error fetching data');
		});
};

function requestStreaming() {
	/*
		Makes a request to fetch features and uses oboe to receive them as a stream.
	*/
	showLoadingIndicator(true);
	showMessageArea(false);
	removeLayers();
	oboe(url)
		.node('polygons.*', function(polygon) {
			loadLayers(L.geoJson(polygon));
		})
		.done(function(features) {
			showLoadingIndicator(false);
			console.log(features);
			showMessageArea(true, 'Loaded ' + features.polygons.length + ' features');
		})
		.fail(function() {
			showLoadingIndicator(false);
			showMessageArea(true, 'Error fetching data');
		});
};

function loadLayers(data) {
	/*
		Loads some GeoJson into the map and updates the layers variable
	*/
	layer.push(data);
	for (var i = layer.length - 1; i >= 0; i--) {
		layer[i].addTo(map);
	};
};

function removeLayers() {
	/*
		Clears the GeoJson layers
	*/
	if (layer.length !== 0) {
		for (var i = layer.length - 1; i >= 0; i--) {
			map.removeLayer(layer[i]);
		};
		layer = [];
	};
};

function showLoadingIndicator(flag) {
	/*
		Get the loading indicator to show or hide
	*/
	loading = flag;
	if (flag) {
		document.getElementById('loading').style.visibility = 'visible';
	} else {
		document.getElementById('loading').style.visibility = 'hidden';
	};
};

function showMessageArea(flag, m) {
	/*
		Get the message area to show/hide and contain a message.
	*/
	if (flag) {
		document.getElementById('message-area').style.right = '10px';
		message = m;
		document.getElementById('message-area').innerHTML = message;
	} else {
		document.getElementById('message-area').style.right = '-150px';
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
		'Esri World Street Map': L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
		}),
		'Esri World Imagery': L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			maxZoom: 18,
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		})
	};

	L.control.layers(baseMaps, null, {
		position: 'topleft'
	}).addTo(map);

	baseMaps['Esri World Imagery'].addTo(map);

	return map;
};