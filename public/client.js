//This is our app
var app = {

	init: function(options) {
		/*
			Start the app. 
			options.container: References the app's main dom element 
		*/
		console.log("App Initiated");

		this.options = options;
		this.options.url = 'http://localhost:3001';
		//Create our LeafletJS Map
		var map = this.createMap();

		this.setupControls();

	},

	setupControls: function() {
		var self = this;
		/*
			Setup any buttons or other controls
		*/
		var requestButton = $('#requestButton');

		requestButton.click(function() {
			self.requestTest(self);
		});
		// requestButton.click(this.requestFeatures);
	},

	requestTest: function(context) {
		/*
			Makes a request to the test api endpoint.
		*/
		console.log('Requesting Test')

		var toCall = this.options.url + '/test';
		oboe(toCall)
			.done(function(data) {
				console.log(data);
			})
			.fail(function() {
				console.log('Didn\'t reveive data.')
			});
	},

	requestFeatures: function() {
		/*
			Makes a request to fetch features.
			Each fetched feature is passed to 'displayFeature'
		*/
		console.log('Requesting Features')
			// oboe('/myapp/things.json')
			// 	.done(function(things) {

		// 		// we got it
		// 	})
		// 	.fail(function() {

		// 		// we don't got it
		// 	});
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