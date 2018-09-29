const keystone = require('keystone');
const Types = keystone.Field.Types;

var Interviews = new keystone.List('Interviews', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Interviews.add({
	name: { type: String, required: true },
	title: { type: String},
	image: { type:Types.CloudinaryImage},
	content: {type: Types.Html, wysiwyg: true, height: 300},
});

Interviews.register();
