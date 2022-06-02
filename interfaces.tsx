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

export interface Istate {
    tasks: Array<singleTaskType>
}

export interface Iaction {
	payload: {
		id: string,
	}
}

export interface IaddAction {
	payload: {
		title: string
		task: string
	}
}