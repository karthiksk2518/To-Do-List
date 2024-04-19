const addTaskButton = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#task-input");
const countValue = document.querySelector(".count-value");
const taskList = document.querySelector(".task-list");

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();

    if(taskText === ''){
        alert ("Enter task");
        return;
    }

    const li = document.createElement('li');
    taskList.appendChild(li);

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContainer.appendChild(taskContent);

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add("material-symbols-outlined");
    editButton.id = "edit-btn";


    editButton.addEventListener('click', () => {
        const newText = prompt("Edit task:", taskContent.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskContent.textContent = newText.trim();
        }
    });
    taskContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("material-symbols-outlined");

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        taskCount--;
        displayCount(taskCount);
    });
    taskContainer.appendChild(deleteButton);

    li.appendChild(taskContainer);

    taskCount++;
    displayCount(taskCount);

    newTaskInput.value = '';
});