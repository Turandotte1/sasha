require('dotenv').config();
const keystone = require('keystone');

keystone.init({
	'name': 'gustatorial',
	'brand': 'gustatorialmag',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'mongo': process.env.MONGO_URI,
	'auto update': false,
	'session': true,
	'auth': true,
	'user model': 'User',
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
	female: 'Female',
	users: 'users',
});

keystone.start();
