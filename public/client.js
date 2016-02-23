/*
	A basic client that contains a map.
	It can request polygons using oboe like a traditional ajax request
	and like a streaming request.
*/
var url = 'http://localhost:3001/features';
var map = createMap();

function requestTraditional() {
	/*
		Makes a request to fetch features and uses oboe like a traditional request.
	*/
	showLoadingIndicator(true);
	showMessageArea(false);
	oboe(url)
		.done(function(features) {
			L.geoJson(features.polygons).addTo(map);
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
	oboe(url)
		.node('polygons.*', function(polygon) {
			L.geoJson(polygon).addTo(map);
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

function showMessageArea(flag, message) {
	/*
		Get the message area to show/hide and contain a message.
	*/
	if (flag) {
		document.getElementById('message-area').style.left = '10px';
		document.getElementById('message-area').innerHTML = message;
	} else {
		document.getElementById('message-area').style.left = '-146px';
		document.getElementById('message-area').innerHTML = '';
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