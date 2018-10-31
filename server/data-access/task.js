module.exports = (connection, TaskSchema) => {
	return connection.model('Task', TaskSchema);
};