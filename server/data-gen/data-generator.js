module.exports = (taskDropper, taskGenerator) => {
	return {
		generate: () => {
			// Drop tasks
			taskDropper.drop().then(() => {
				// Generate new tasks
				return taskGenerator.generate();
			}).then((tasks) => {

				for (let i = 0; i < tasks.length; i++) {
					console.log(`Task name: "${ tasks[i].name }". Completed: ${ tasks[i].completed }`);
				}
			});
		}
	};
};
