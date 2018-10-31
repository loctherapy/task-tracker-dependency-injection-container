const express 		= require("express");
const app			= express();
const bodyParser  	= require("body-parser");
const jsonParser 	= bodyParser.json();
const config 		= require("./config");
const port			= config.port;
const TaskSchema 	= require('./data-access/schemas/task');



// DI Container for Test Database
const testDIContainer = require('./dependency-injection-container')();
testDIContainer.register('dbUrl', config.dbUris.test);
testDIContainer.register('generateConfig', config.generate);
testDIContainer.register('TaskSchema', TaskSchema);
testDIContainer.factory('connection', require('./data-access/db-connection'));
testDIContainer.factory('TaskModel', require('./data-access/task'));
testDIContainer.factory('taskDropper', require('./data-gen/task-dropper'));
testDIContainer.factory('taskGenerator', require('./data-gen/task-generator'));
testDIContainer.factory('dataGenerator', require('./data-gen/data-generator'));


// Service Locator for Prod Database
const prodDIContainer = require('./dependency-injection-container')();
prodDIContainer.register('dbUrl', config.dbUris.prod);
prodDIContainer.register('TaskSchema', TaskSchema);
prodDIContainer.factory('connection', require('./data-access/db-connection'));
prodDIContainer.factory('TaskModel', require('./data-access/task'));

// Generate Test DB
testDIContainer.get('dataGenerator').generate();

// Prod Instances
const Task = prodDIContainer.get('TaskModel');

app.use(bodyParser.urlencoded({ extended: false })) // get our request parameters
	.use(jsonParser);

app.get('/tasks', (req, res) => {
	Task.find((err, tasks) => {
		if(err) {
			return res.sendStatus(400);
		}

		return res.json(tasks);
	});
});

app.listen(port, () => console.log("Listening on port ", port));