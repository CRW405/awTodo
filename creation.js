import { allTodos, allProjects, todo, project } from "./todo.js";

// input
const new_title = document.getElementById("new-title");
const new_desc = document.getElementById("new-desc");
const new_due = document.getElementById("new-due");
const new_priority = document.getElementById("new-priority");
const new_note = document.getElementById("new-note");
const new_checklist = document.getElementById("new-checklist");
const new_select_project = document.getElementById("new-select-project");
const new_project = document.getElementById("new-project");

// button
const add_checklist = document.getElementById("add-checklist");
const add_task = document.getElementById("add-task");
const add_project = document.getElementById("add-project");

function create_new_task() {
	const title = new_title.value;
	const desc = new_desc.value;
	const due = new_due.value;
	const priority = new_priority.value;
	const note = new_note.value;
	const checklist = new_checklist.value.split("\n");
	const projectTitle = new_select_project.value;

	if (title === "") {
		alert("Title cannot be empty");
		return;
	}

	let selectedProject;
	if (projectTitle.length > 0) {
		selectedProject = allProjects.find((proj) => proj.title === projectTitle);
		if (!selectedProject) {
			alert("Selected project does not exist");
			return;
		}
	}

	const newTodo = new todo(
		title,
		desc,
		due,
		priority,
		note,
		checklist,
	);
	if (selectedProject) {
		selectedProject.add(newTodo);
	}
	console.log(allTodos);
	console.log(allProjects);
}

function create_new_project() {
	const title = new_project.value;

	if (title === "") {
		alert("Title cannot be empty");
		return;
	}

	const newProject = new project(title);
	console.log(allProjects);

	update_project_select();
}

function update_project_select() {
	new_select_project.innerHTML = "";

	const defaultOption = document.createElement("option");
	defaultOption.value = "";
	defaultOption.textContent = "Select a project";
	new_select_project.appendChild(defaultOption);

	allProjects.forEach((proj) => {
		const option = document.createElement("option");
		option.value = proj.title;
		option.textContent = proj.title;
		new_select_project.appendChild(option);
	});
}

add_task.addEventListener("click", create_new_task);
add_project.addEventListener("click", create_new_project);

export { create_new_task, create_new_project, update_project_select };
