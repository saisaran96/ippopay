const http = require('http');
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Use connect method to connect to the server
client.connect((err) => {
	if (err) {
		console.error('Failed to connect to MongoDB:', err);
		return;
	}
	console.log('Connected successfully to MongoDB');

	// Create an HTTP server
	const server = http.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Hello World!');
	});

	// Start listening for incoming requests
	server.listen(8080, () => {
		console.log('Server started listening on port 8080');
	});
});
