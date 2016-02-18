var restify = require('restify');

var server = restify.createServer({
	name: 'MapStream'
});

var random = require('geojson-random');

server.get('/features', function(req, res, next) {

	var count = 10;
	var lastCount = 8000;
	var id = setInterval(sendFeatures, 10);

	res.write('{ "polygons": [');

	function sendFeatures() {
		if (count === lastCount) {
			res.write(givePolygons(1, 3, true));
			res.end();
			clearInterval(id);
			return next()
		} else {
			res.write(giveRandomPolygons());
			count += 10;
		}
	};

	function givePolygons(count, num_vertices, last) {

		var polygonString = '';
		var featureCollection = random.polygon(count, num_vertices, 1);
		var features = featureCollection.features;

		if (last === true) {
			for (var i = features.length - 1; i >= 1; i--) {
				polygonString += JSON.stringify(features[i]) + ',';
			};
			polygonString += JSON.stringify(features[0]) + ']}';
		} else {
			for (var i = features.length - 1; i >= 0; i--) {
				polygonString += JSON.stringify(features[i]) + ',';
			};
		};
		return polygonString;
	};

	function giveRandomPolygons() {
		
		var count = Math.floor(Math.random() * 10 + 1);
		var num_vertices = Math.floor(Math.random() * 5 + 1);

		return givePolygons(count, num_vertices);
	};
});


server.get('/.*/', restify.serveStatic({
	'directory': './public',
	'default': 'index.html'
}));

// Start Server
server.listen(3001, function() {
	console.log('%s listening at %s', server.name, server.url);
});