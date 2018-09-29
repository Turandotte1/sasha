const keystone = require('keystone');
const Types = keystone.Field.Types;

var Mood = new keystone.List('Mood', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Mood.add({
	name: { type: String, required: true },
	title: { type: String},
	image: { type:Types.CloudinaryImage},
	content: {type: Types.Html, wysiwyg: true, height: 300},
});

Mood.register();
