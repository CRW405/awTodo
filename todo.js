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
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.note = notes;
		this.checklist = checklist;
		allTodos.push(this);
	}

	del() {
		allTodos.splice(allTodos.indexOf(this), 1);
	}
}

class project {
	constructor(title, todoArr) {
		this.title = title;
		this.todoArr = todoArr;
		allProjects.push(this);
	}

	add(todo) {
		this.todoArr.push(todo);
	}

	remove(todo) {
		this.todoArr.splice(this.todoArr.indexOf(todo), 1);
	}

	del() {
		this.todoArr.forEach((todo) => {
			todo.del();
		});
		allProjects.splice(allProjects.indexOf(this), 1);
	}
}

export { allTodos, allProjects, todo, project };
