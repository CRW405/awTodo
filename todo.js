const allTodos = [];
const allProjects = [];

class todo {
	constructor(
		title,
		desc = "",
		dueDate = "",
		priority = 1,
		notes = "",
		checklist = [],
	) {
		if (allTodos.includes(title)) {
			console.log("error: todo with title " + title + " already exists");
			return;
		}
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.note = notes;
		this.checklist = checklist;
		allTodos.push(this);
	}

	del() {
		const index = allTodos.indexOf(this);
		if (index === -1) {
			return;
		}
		allTodos.splice(index, 1);
	}

	edit(
		title = null,
		desc = null,
		dueDate = null,
		priority = null,
		notes = null,
		checklist = null,
	) {
		if (title !== null) {
			this.title = title;
		}
		if (desc !== null) {
			this.desc = desc;
		}
		if (dueDate !== null) {
			this.dueDate = dueDate;
		}
		if (priority !== null) {
			this.priority = priority;
		}
		if (notes !== null) {
			this.note = notes;
		}
		if (checklist !== null) {
			this.checklist = checklist;
		}
	}
}

class project {
	constructor(title, todoArr = []) {
		if (allProjects.includes(title)) {
			console.log("error: project with title " + title + " already exists");
			return;
		}
		this.title = title;
		this.todoArr = todoArr;
		allProjects.push(this);
	}

	add(todo) {
		this.todoArr.push(todo);
	}

	remove(todo) {
		const index = this.todoArr.indexOf(todo);
		if (index === -1) {
			return;
		}
		this.todoArr.splice(index, 1);
	}

	del() {
		this.todoArr.forEach((todo) => {
			todo.del();
		});
		allProjects.splice(allProjects.indexOf(this), 1);
	}
}

export { allTodos, allProjects, todo, project };
