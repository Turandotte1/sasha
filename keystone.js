const keystone = require('keystone');
const keys = require('./routes/config/keys.js');

keystone.init({
	'name': 'gustatorial',
	'brand': 'gustatorialmag',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'auto update': false,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cloudinary config': keys.CLOUDINARY_URL,
	'cookie secret': keys.COOKIE_SECRET
});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	users: 'users',
	woman: 'Woman',
	interviews: 'Interviews',
	news: 'News',
	mood: 'Mood',
});

keystone.start();
