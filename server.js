var app,
		express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.sendfile('src/index.html');
});

app.listen(3000);
console.log("Listening on port: 3000");
