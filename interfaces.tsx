export interface singleTaskType {
	readonly id: string,
	acheived: boolean,
	title: string,
	task: string
}

export interface tasksType {
	tasks: {
		tasks: Array<singleTaskType>
	}
}