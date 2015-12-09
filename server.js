var restify = require('restify');

var server = restify.createServer({
	name: 'MapStream'
});

/*This data recipe thing is just my goofy way of saying, 
I want X features that take Y seconds to get, and so on.*/
var data_recipe = [{
	time: 15,
	amount: 10
}, {
	time: 10,
	amount: 20
}, {
	time: 8,
	amount: 30
}, {
	time: 5,
	amount: 40
}, {
	time: 2,
	amount: 50
}, {
	time: 1,
	amount: 100
}];

server.get('/traditional', function(req, res, next) {
	var message = '';
	var sent = 0;
	message += '{"things": [';

	for (var i = 0; i < data_recipe.length + 1; i++) {

		if (i < data_recipe.length + 1) {
			setTimeout(function() {
				message += '{"thing": "hello"},';
				sent += 1;
				if (sent === data_recipe.length) {
					message += '{"thing": "end"}]}';
					res.send(message);
				};
			}, 1000);
		};
	};

	// return next();
});

// Quick route to send an sample number of pairs over a period of time
server.get('/stream', function(req, res, next) {

	res.write('{"things": [');
	res.write('{"thing1": "hello"},');
	res.write('{"thing2": "bye"},');
	res.write('{"thing3": 1},');
	res.write('{"thing4": 0}]}');
	res.end();
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