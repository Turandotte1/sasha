let keystone = require('keystone');

let lastArticles = (collection) =>
{
	return keystone.list(collection).model.find().sort('-publishedDate').limit('8');

}

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	view.on('init', function (next) {
			lastArticles('Mood')
				.exec((err, results) => {
					console.log(results);
					locals.mood = results;
			});
		});
	view.on('init', function (next) {
			lastArticles('Female')
				.exec((err, results) =>{
					console.log(results);
					locals.female = results;
					next(err);
			});
		});
	view.on('init', function (next) {
			lastArticles('News')
				.exec((err, results) =>{
					console.log(results);
					locals.news = results;
					next(err);
			});
		});
	view.on('init', function (next) {
			lastArticles('Interviews')
				.exec((err, results) =>{
					console.log(la + results);
					locals.interviews = results;
					next(err);
			});
	});
	console.log('coucou');
	view.render('landing');
};
