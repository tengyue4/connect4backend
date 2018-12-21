'use strict';

const 	dynamoApi	=	require('./dynamoApi'),
		response	=	require('./response');

module.exports.save = (event, context, callback) => {
    console.log(event);
	const { name } = JSON.parse(event.body);

	dynamoApi.saveRecord(name)
	.then(data => {
		console.log(data);
		callback(null, response(200, {message: 'Successfully saved data'}));
	}).catch(err => {
		console.log(err);
		callback(null, response(400, {message: "something is wrong"}));
	});
};

module.exports.list = (event, context, callback) => {
    console.log(event);

	dynamoApi.fetchRecords()
	.then(data => {
		console.log(data);
		callback(null, response(200, data));
	}).catch(err => {
		console.log(err);
		callback(null, response(400, {message: "something is wrong"}));
	});
};