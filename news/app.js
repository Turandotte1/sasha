const express = require('express');
const parser = require('body-parser');
const newsLetter = require('./news.js');
const port = process.env.PORT || 8080;

app = express();
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function (req, res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/signup', function (req, res) {
    newsLetter(req, res);
});

app.listen (port, () => console.log('Listening on port ' + port));
