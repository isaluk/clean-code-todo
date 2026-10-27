const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createLabel = function (taskText) {
  const label = document.createElement('label');
  // innerText, not innerHTML: the task text is typed by the user and must not be parsed as markup.
  label.innerText = taskText;
  label.className = 'task';
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');
  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  listItem.append(
    createCheckbox(),
    createLabel(taskText),
    createEditInput(),
    createEditButton(),
    createDeleteButton(),
  );
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const toggleEditMode = function (event) {
  const listItem = event.currentTarget.closest('li');

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function (event) {
  event.currentTarget.closest('li').remove();
};

const moveTaskByCheckbox = function (event) {
  const checkbox = event.currentTarget;
  const listItem = checkbox.closest('li');
  const targetList = checkbox.checked ? completedList : todoList;
  targetList.appendChild(listItem);
};

const bindTaskEvents = function (listItem) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.addEventListener('click', toggleEditMode);
  deleteButton.addEventListener('click', deleteTask);
  checkbox.addEventListener('change', moveTaskByCheckbox);
};

addButton.addEventListener('click', addTask);
[...todoList.children, ...completedList.children].forEach(bindTaskEvents);
