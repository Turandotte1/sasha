const express = require('express');
const parser = require('body-parser');
const newsLetter = require('./middlewares/news.js');

app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use('/styles', express.static('public/styles'));
app.use('/img', express.static('public/img'));
app.use('/icons', express.static('public/icons'));
app.use('/js', express.static('public/js'));

app.get('/', function (req, res) {
		res.render('comingSoon');
});

app.post('/signup', function (req, res) {
    newsLetter(req, res, (err, data) => {
		if (err)
				return res.redirect('/?e='+ encodeURIComponent('Oops, something went wrong. Try one more time and make sure you haven\'t subscribed in the past!'));
		res.redirect('/?e='+ encodeURIComponent('Thank you for subscribing!'));
		}
	);
});

const PORT = process.env.PORT || 8080;
app.listen (PORT, () => console.log('Listening on port ' + PORT));
