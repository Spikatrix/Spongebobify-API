const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const API_URL = '/api/v1/spongebobify';

app.get('/', (req, res) => {
	res.status(400).send(`Send a string to ${API_URL}`)
});

app.post(API_URL, (req, res) => {
	var success;
	var message;
	if(req.body.text) {
		success = 'true';
		message = spongebobifyText(req.body.text);
	} else {
		success = 'false';
		message = '\'text\' parameter not found';
	}

	var statusCode;
	if (success == 'true') {
		statusCode = 200;
	} else {
		statusCode = 400;
	}

	res.status(statusCode).send({
		success: success,
		message: message,
	})
});

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
});


function spongebobifyText(str) {
	let mockStr = ""
	for(let i = 0; i < str.length; i++) {
		if (Math.floor(Math.random() * 2) == 0) {
			mockStr += str.charAt(i).toLowerCase()
		} else {
			mockStr += str.charAt(i).toUpperCase()
		}
	}
	
	return mockStr
}
