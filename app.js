const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  // innerText, not innerHTML: the task text is typed by the user and must not be parsed as markup.
  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
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

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.addEventListener('click', toggleEditMode);
  deleteButton.addEventListener('click', deleteTask);
  checkbox.addEventListener('change', moveTaskByCheckbox);
};

[...todoList.children, ...completedList.children].forEach(bindTaskEvents);
