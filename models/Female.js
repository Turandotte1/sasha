const keystone = require('keystone');
const Types = keystone.Field.Types;

var Female = new keystone.List('Female', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Female.add({
	name: { type: String, required: true },
	title: { type: String},
	story: {type: Types.Html, wysiwyg: true, height: 300},
});

Female.register();
