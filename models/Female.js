const keystone = require('keystone');
const Types = keystone.Field.Types;

var Woman = new keystone.List('Woman', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Woman.add({
	name: { type: String, required: true },
	title: { type: String},
	image: { type:Types.CloudinaryImage},
	shortContent: {type: Types.Html, wysiwyg: false, height: 100},
	fullContent: {type: Types.Html, wysiwyg: false, height: 300},
});

Woman.register();
