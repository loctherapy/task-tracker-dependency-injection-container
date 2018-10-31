const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	name: {
		type: String,
		unique: false,
		required: true
	},
	description: {
		type: String,
		unique: false,
		required: false
	},
	completed: {
		type: Boolean,
		unique: false,
		required: true
	}
});

module.exports = (connection) => {
	return connection.model('Task', TaskSchema);
};