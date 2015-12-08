var restify = require('restify');

var server = restify.createServer({
	name: 'MapStream'
});

// server.get('/test', function(req, res, next) {

// 	res.header('Content-Type', 'application/json');
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");

// 	res.send('{"thing1":"hello","thing2":0}');
// });

server.get('/test', function(req, res, next) {
	res.send(200, {
		'thing1': 'hello',
		'thing2': 0
	});
	// return next();
});

// Quick route to send an sample number of pairs over a period of time
server.get('/pairs', function(req, res, next) {
	numSent = 0;

	// Send Header
	res.header('Content-Type', 'application/json');
	res.header('Access-Control-Allow-Origin', '*');

	// // Write a number of pairs between 1 and 5 to the response
	// // If flag is true, end the communication
	// function sendPairs(res, flag) {
	// 	var numPairs = Math.floor((((Math.random() * 10) % 5) + 1));
	// 	console.log('Number of Pairs: ' + (numPairs + 1));

	// 	for (var i = 0; i <= numPairs; i++) {

	// 		// Generate the pair
	// 		var pair = {
	// 			x: Math.floor(((Math.random() * 1000) % 100) + 1),
	// 			y: Math.floor(((Math.random() * 1000) % 100) + 1)
	// 		};

	// 		// Write the pair
	// 		res.write(JSON.stringify(pair) + ',');
	// 		numSent++;

	// 		// End if true
	// 		if (flag) {
	// 			res.write('{"x":0, "y": 0}]}');
	// 			res.end();
	// 			console.log('Sent: ' + numSent);
	// 			return next();
	// 		}
	// 	}

	// 	// not ending
	// 	return flag;
	// }

	// // Start array of pairs
	// res.write('{ "data": [');

	// // Queue timeouts
	// for (var i = 0; i < 1000; i++) {
	// 	var seconds = Math.floor(((Math.random() * 10000) % 7000) + 50);
	// 	console.log('Waiting: ' + seconds);

	// 	setTimeout(sendPairs, seconds, res, false);
	// }

	// // Last Pair sent, all others must finish before this to be recieved by client
	// setTimeout(sendPairs, 7100, res, true);
});

server.get('/.*/', restify.serveStatic({
	'directory': './public',
	'default': 'index.html'
}));

// Start Server
server.listen(3001, function() {
	console.log('%s listening at %s', server.name, server.url);
});