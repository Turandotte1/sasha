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
					locals.mood = results;
					next(err);
			});
			lastArticles('Female')
				.exec((err, results) =>{
					locals.female = results;
					next(err);
			});
			lastArticles('News')
				.exec((err, results) =>{
					locals.news = results;
					next(err);
			});
			lastArticles('Interviews')
				.exec((err, results) =>{
					locals.interviews = results;
					next(err);
			});
	});
	console.log(locals.female);
	view.render('landing');
};
