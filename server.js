var restify = require('restify');

var server = restify.createServer({
	name: 'MapStream'
});

var random = require('geojson-random');

server.get('/features', function(req, res, next) {

	var count = 0;
	var lastCount = 5000;
	var id = setInterval(sendFeatures, 10);

	res.write('{ "things": [');

	function sendFeatures() {
		if (count === lastCount) {
			res.write('{"x":0, "y": 0}]}');
			res.end();
			clearInterval(id);
			console.log('count: ', count, ' lastCount: ', lastCount);

			console.log('-----------------------------');
			return next()
		} else {
			res.write(createFeature() + ',');
			count += 10;
		}
	}

	function createFeature() {

		var f = JSON.stringify({});

		return f;
	};

	function provideFeatures() {



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