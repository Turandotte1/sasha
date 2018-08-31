const express = require('express');
const parser = require('body-parser');
const newsLetter = require('./middlewares/news.js');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use('/styles', express.static('public/styles'));
app.use('/img', express.static('public/img'));
app.use('/icons', express.static('public/icons'));
app.use('/js', express.static('public/js'));

app.get('/', function (req, res) {
		res.render('comingSoon', {messages: req.flash('caca')});
});

app.post('/signup', function (req, res) {
    newsLetter(req, res, (err, data) =>{
		if (err)
			{
				return res.redirect('/?e='+ encodeURIComponent('Incorrect username or password'));
			}
			res.redirect('/');
		}
	);
});

const PORT = process.env.PORT || 8080;
app.listen (PORT, () => console.log('Listening on port ' + PORT));
