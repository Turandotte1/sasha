var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'female';

	view.query('female', keystone.list('Female').model.find().sort('sortOrder'));

	// Render the view
	view.render('female');

};