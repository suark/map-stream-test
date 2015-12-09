var restify = require('restify');

var server = restify.createServer({
	name: 'MapStream'
});

/*This data recipe thing is just my goofy way of saying, 
I want X features that take Y seconds to get, and so on.*/
var data_recipe = [{
	type: 'polygon',
	time: 2000,
	amount: 5
}, {
	type: 'polygon',
	time: 1000,
	amount: 10
}, {
	type: 'polygon',
	time: 300,
	amount: 30
}, {
	type: 'point',
	time: 750,
	amount: 10
}, {
	type: 'point',
	time: 200,
	amount: 20
}];

// Quick route to send an sample number of pairs over a period of time
server.get('/features', function(req, res, next) {

	var amountToSend = data_recipe.length;
	var amountSent = 0;

	res.write('{"things": [');
	for (var i = 0; i < amountToSend; i++) {
		// data_recipe[i]

		if (i !== amountToSend - 1) {
			setTimeout(function() {
				res.write('{"thing1": "hello"},');
			}, 3000);
		} else {
			setTimeout(function() {
				res.write('{"thing4": 0}]}');
				res.end();
			}, 3000);
		};
	};

	return next();
});

// 	{
//    "foods": [
//       {"name":"aubergine",    "colour":"purple"},
//       {"name":"apple",        "colour":"red"},
//       {"name":"nuts",         "colour":"brown"}
//    ],
//    "badThings": [
//       {"name":"poison",       "colour":"pink"},
//       {"name":"broken_glass", "colour":"green"}
//    ]
// }

server.get('/.*/', restify.serveStatic({
	'directory': './public',
	'default': 'index.html'
}));

// Start Server
server.listen(3001, function() {
	console.log('%s listening at %s', server.name, server.url);
});