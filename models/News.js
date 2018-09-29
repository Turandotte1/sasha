const keystone = require('keystone');
const Types = keystone.Field.Types;

var News = new keystone.List('News', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

News.add({
	name: { type: String, required: true },
	title: { type: String},
	image: { type:Types.CloudinaryImage},
	story: {type: Types.Html, wysiwyg: true, height: 300},
});

News.register();
