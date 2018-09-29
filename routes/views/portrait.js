var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.female = null;

		view.on('init', (next) =>
		{
			keystone.list('Female').model.findOne({key :'dame-qui-fait-peur'})
				.exec((err, ret) =>{
					locals.female = ret;
					next(err);
				});
		});
		console.log(locals.female);
		view.render('portrait');
};
