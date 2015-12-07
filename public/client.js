//This is our app
var app = {

	init: function(options) {
		/*
			Start the app. 
			options.container: References the app's main dom element 
		*/
		console.log("App Initiated");

		//Create our LeafletJS Map
		var map = this.createMap();

		this.setupControls();

	},

	setupControls: function() {
		/*
			Setup any buttons or other controls
		*/
		var requestButton = $('#requestButton');

		requestButton.click(this.requestFeatures);
	},

	requestFeatures: function() {
		/*
			Makes a request to fetch features.
			Each fetched feature is passed to 'displayFeature'
		*/
		console.log('Requesting Features')
	},

	displayFeature: function(feature) {
		/*
			Take a feature and attempts to add it to the map
		*/
		console.log('Displaying Features: ', feature);
	},

	createMap: function() {
		/*
			Create our Leaflet Map.
			This assumes that a div exists with the id="map"
		*/
		console.log('Creating the Map')

		var map = L.map('map', {
			center: [53.579, -109.072],
			zoom: 5
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
	}
};