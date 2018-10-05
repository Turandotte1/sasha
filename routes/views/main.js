let keystone = require('keystone');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	view.on('init', function (next) {
			keystone.list('Mood').model.find().sort('-publishedDate').limit(8)
				.exec((err, results) => {
					console.log(results);
					locals.mood = results;
					next(err);
			});
		});

	view.on('init', function (next) {
			keystone.list('Interviews').model.find().sort('-publishedDate').limit(8)
				.exec((err, results) =>{
					console.log(results);
					locals.woman = results;
					next(err);
			});
		});

	view.on('init', function (next) {
			keystone.list('Mood').model.find().sort('-publishedDate').limit(8)
				.exec((err, results) =>{
					console.log(results);
					locals.news = results;
					next(err);
			});
		});

	view.on('init', function (next) {
			keystone.list('Woman').model.find().sort('-publishedDate').limit(8)
				.exec((err, results) =>{
					console.log(results);
					locals.interviews = results;
					next(err);
			});
	});
	view.render('landing');
};
