const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const API_URL = '/api/v1/spongebobify';

app.get('/', (req, res) => {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl.substring(0, req.originalUrl.length - 1);
	res.status(400).send(`Send a GET request or a query with a string in the '<i>text</i>' key parameter to ` + 
						 `<b>${fullUrl}${API_URL}</b> to spongebobify the text<br><br>` + 
						 `Example: ${fullUrl}${API_URL}?text=Spongebobify or ` + 
			     			 `<code>curl -X GET http://nameless-waters-90998.herokuapp.com/api/v1/spongebobify -d text="Spongebobify"</code>`)
});

app.get(API_URL, (req, res) => {
	var success;
	var message;
	if (req.query.text) {
		success = 'true';
		message = spongebobifyText(req.query.text);
	} else if (req.body.text) {
		success = 'true';
		message = spongebobifyText(req.body.text);
	} else {
		success = 'false';
		message = '\'text\' parameter not found';
	}

	res.json({
		success: success,
		message: message,
	})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
});


function spongebobifyText(str) {
	let mockStr = ""
	for (let i = 0; i < str.length; i++) {
		if (Math.floor(Math.random() * 2) == 0) {
			mockStr += str.charAt(i).toLowerCase()
		} else {
			mockStr += str.charAt(i).toUpperCase()
		}
	}
	
	return mockStr
}
