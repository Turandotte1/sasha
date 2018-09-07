module.exports = app => {

  app.get('/', function (req, res) {
  		res.render('comingSoon');
  })

  app.get('/main', function (req, res) {
    res.render('landing');
  })

  app.get('/female', function (req, res) {
  	res.render('female');
  })

  app.get('/interviews', function (req, res) {
  	res.render('interviews');
  })

  app.get('/news', function (req, res) {
  	res.render('news');
  })

  app.get('/mood', function (req, res) {
  	res.render('mood');
  })

  app.post('/signup', function (req, res) {
    newsLetter(req, res, (err, data) => {
		if (err)
				return res.redirect('/?e='+ encodeURIComponent('Oops, something went wrong. Try one more time and make sure you haven\'t subscribed in the past.'));
		res.redirect('/?e='+ encodeURIComponent('Your curated list will be served shortly.'));
    });
  });
};
