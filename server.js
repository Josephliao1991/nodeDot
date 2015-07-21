var express  = require('express');
var app      = express(); 								// create our app w/ express

	app.get('/api/family/', function(req, res) {

		// use mongoose to get all todos in the database
		// Todo.find(function(err, familyKey) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			// if (err)
				// res.send(err)

			res.write("Hello worlddd"); // return all todos in JSON format
		// });
	});


	app.get('/', function(req, res) {
		res.write("Hellooo"); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.listen(8888);
	console.log("App listening on port 8888");
