const keystone = require('keystone');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'female';
	view.query('female', keystone.list('Female').model.find().sort());
	view.render('female');
};
