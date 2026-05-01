import { allTodos, allProjects } from "./todo.js";
import { update_project_select } from "./creation.js";

const project_list = document.getElementById("project-list");
const all_projects = document.getElementById("all-projects");
const task_items = document.getElementById("tasks");
const add_task = document.getElementById("add-task");
const add_project = document.getElementById("add-project");

let current_project_filter = "";

add_task.addEventListener("click", () => refresh_task_list(current_project_filter));
add_project.addEventListener("click", () => {
	refresh_project_list();
	update_project_select();
});

project_list.addEventListener("click", (e) => {
	const target = e.target.closest(".project-selection");
	if (!target) return;

	if (target.id === "all-projects") {
		refresh_task_list("");
		return;
	}

	refresh_task_list(target.dataset.project || "");
});

function refresh_task_list(project = current_project_filter) {
	current_project_filter = project;
	task_items.innerHTML = "";

	let filtered_tasks = allTodos;

	if (project.length > 0) {
		const selected_project = allProjects.find((p) => p.title === project);
		filtered_tasks = selected_project ? selected_project.todoArr : [];
	}

	filtered_tasks.forEach((todo) => {
		task_items.appendChild(render_task(todo));
	});
}

function render_task(todo) {
	const task = document.createElement("li");
	task.classList.add("task");
	task.dataset.task = todo.title;

	const title = document.createElement("h3");
	title.classList.add("task-title");
	title.textContent = todo.title;
	task.appendChild(title);

	const desc = document.createElement("p");
	desc.classList.add("task-desc");
	desc.textContent = `Description: ${todo.desc}`;
	task.appendChild(desc);

	const dueDate = document.createElement("p");
	dueDate.classList.add("task-due-date");
	dueDate.textContent = `Due Date: ${todo.dueDate}`;
	task.appendChild(dueDate);

	const priority = document.createElement("p");
	priority.classList.add("task-priority");
	priority.textContent = `Priority: ${todo.priority}`;
	task.appendChild(priority);

	const notes = document.createElement("p");
	notes.classList.add("task-notes");
	notes.textContent = `Notes: ${todo.note}`;
	task.appendChild(notes);

	const checklist = document.createElement("ul");
	checklist.classList.add("task-checklist");
	todo.checklist.forEach((item) => {
		const checklistItem = document.createElement("li");
		checklistItem.textContent = item;
		checklist.appendChild(checklistItem);
	});
	task.appendChild(checklist);

	const editButton = document.createElement("button");
	editButton.classList.add("task-edit");
	editButton.textContent = "Edit";
	editButton.onclick = () => begin_edit(task, todo);
	task.appendChild(editButton);

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("task-delete");
	deleteButton.textContent = "Delete";
	deleteButton.onclick = () => delete_task(todo);
	task.appendChild(deleteButton);

	return task;
}

function begin_edit(task, todo) {
	const title = task.querySelector(".task-title");
	const desc = task.querySelector(".task-desc");
	const dueDate = task.querySelector(".task-due-date");
	const priority = task.querySelector(".task-priority");
	const notes = task.querySelector(".task-notes");
	const checklist = task.querySelector(".task-checklist");

	if (!title || !desc || !dueDate || !priority || !notes || !checklist) {
		return;
	}

	const title_input = document.createElement("input");
	title_input.type = "text";
	title_input.value = todo.title;
	title_input.classList.add("task-title");
	title.replaceWith(title_input);

	const desc_input = document.createElement("textarea");
	desc_input.value = todo.desc;
	desc_input.classList.add("task-desc");
	desc.replaceWith(desc_input);

	const due_date_input = document.createElement("input");
	due_date_input.type = "datetime-local";
	due_date_input.value = todo.dueDate;
	due_date_input.classList.add("task-due-date");
	dueDate.replaceWith(due_date_input);

	const priority_input = document.createElement("input");
	priority_input.type = "number";
	priority_input.min = "1";
	priority_input.value = todo.priority;
	priority_input.classList.add("task-priority");
	priority.replaceWith(priority_input);

	const notes_input = document.createElement("textarea");
	notes_input.value = todo.note;
	notes_input.classList.add("task-notes");
	notes.replaceWith(notes_input);

	const checklist_input = document.createElement("textarea");
	checklist_input.value = todo.checklist.join("\n");
	checklist_input.classList.add("task-checklist");
	checklist.replaceWith(checklist_input);

	const editButton = task.querySelector(".task-edit");
	const deleteButton = task.querySelector(".task-delete");

	if (!editButton || !deleteButton) {
		return;
	}

	editButton.textContent = "Save";
	editButton.onclick = () =>
		save_edit(
			todo,
			title_input,
			desc_input,
			due_date_input,
			priority_input,
			notes_input,
			checklist_input,
		);

	deleteButton.textContent = "Cancel";
	deleteButton.onclick = () => refresh_task_list(current_project_filter);
}

function save_edit(
	todo,
	title_input,
	desc_input,
	due_date_input,
	priority_input,
	notes_input,
	checklist_input,
) {
	const title = title_input.value.trim();
	if (title === "") {
		alert("Title cannot be empty");
		return;
	}

	const checklist = checklist_input.value
		.split("\n")
		.map((item) => item.trim())
		.filter((item) => item.length > 0);

	todo.edit(
		title,
		desc_input.value,
		due_date_input.value,
		priority_input.value,
		notes_input.value,
		checklist,
	);

	refresh_task_list(current_project_filter);
}

function delete_task(todo) {
	allProjects.forEach((project) => {
		if (project.todoArr.includes(todo)) {
			project.remove(todo);
		}
	});
	todo.del();
	refresh_task_list(current_project_filter);
}

function refresh_project_list() {
	project_list.innerHTML = "";
	project_list.appendChild(all_projects);

	allProjects.forEach((project) => {
		const li = document.createElement("li");
		li.textContent = project.title;
		li.dataset.project = project.title;
		li.classList.add("project-selection");
		project_list.appendChild(li);
	});
}

refresh_project_list();
refresh_task_list();
update_project_select();
