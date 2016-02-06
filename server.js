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
// server.get('/features', function(req, res, next) {

// 	var amountToSend = data_recipe.length;
// 	var amountSent = 0;

// 	res.write('{"things": [');
// 	for (var i = 0; i < amountToSend; i++) {
// 		// data_recipe[i]

// 		if (i !== amountToSend - 1) {
// 			setTimeout(function() {
// 				res.write('{"thing1": "hello"},');
// 			}, 3000);
// 		} else {
// 			setTimeout(function() {
// 				res.write('{"thing4": 0}]}');
// 				res.end();
// 			}, 3000);
// 		};
// 	};

// 	return next();
// });

// server.get('/features', function(req, res, next) {

// 	function createFeature() {

// 		var f = JSON.stringify({
// 			type: "Feature",
// 			properties: {},
// 			geometry: {
// 				type: "Polygon",
// 				coordinates: [
// 					[
// 						[-104.05, 48.99],
// 						[-97.22, 48.98],
// 						[-96.58, 45.94],
// 						[-104.03, 45.94],
// 						[-104.05, 48.99]
// 					]
// 				]
// 			}
// 		});
// 		console.log(f);
// 		return f;
// 	};

// 	function sendFeature(lastRun) {
// 		console.log('lastRun: ', lastRun);

// 		res.write(createFeature() + ',');

// 		if (lastRun) {
// 			res.write('{"x":0, "y": 0}]}');
// 			res.end();
// 			return next();
// 		}
// 	};

// 	var last = false;

// 	res.write('{ "things": [');

// 	for (var i = 0; i <= data_recipe.length; i++) {

// 		// setTimeout(sendFeature, data_recipe[i].time, last);
// 		setTimeout(sendFeature, 1000, last);


// 		if (i === data_recipe.length - 1) {
// 			last = true;
// 		};
// 		console.log('test ', i, last);
// 	}
// });


server.get('/features', function(req, res, next) {

	var count = 0;
	var lastCount = 500;
	var id = setInterval(sendFeatures, 10);

	function sendFeatures() {
		console.log('count: ', count, ' lastCount: ', lastCount);
		if (count === lastCount) {
			res.write('{"x":0, "y": 0}');
			res.end();
			clearInterval(id);
			console.log('-----------------------------');
			return next()
		} else {
			count += 10;
		}
	}


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