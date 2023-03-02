const http = require('http');
const { MongoClient } = require('mongodb');
var checkpassword = require('./passwordchecker.js');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const server = http.createServer((request, response) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST',
	};

	if (request.method === 'POST' && request.url === '/check') {
		let body = [];
		request
			.on('data', (chunk) => {
				body.push(chunk);
			})
			.on('end', async () => {
				body = Buffer.concat(body).toString();
				let result = checkpassword(body);
				const db = client.db('password');
				const collection = db.collection('passwordlog');
				await collection.insertOne({ password: body, changes: result });
				response.writeHead(200, headers);
				response.end(result.toString());
			});
	} else {
		response.statusCode = 404;
		response.end();
	}
});

server.listen(8080, async () => {
	await client.connect();
	console.log('Db connected');
});
