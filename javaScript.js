const addTaskButton = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#task-input");
const countValue = document.querySelector(".count-value");
const taskList = document.querySelector(".task-list");

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

window.addEventListener('load', () => {
    taskCount = 0;
    taskList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task-')) {
            const taskId = parseInt(key.split('-'[1]));
            const taskText = localStorage.getItem(key);
            createTaskItem(taskText, taskId);
            taskCount++;
        }
    }
    displayCount(taskCount);
});

newTaskInput.setAttribute("autocomplete", "off");   //Disable Autocomplete for task input field

const createTaskItem = (taskText, taskId) => {
    const li = document.createElement('li');
    taskList.appendChild(li);

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContainer.appendChild(taskContent);

    // Edit Task in List

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add("material-symbols-outlined");
    editButton.id = "edit-btn";

    editButton.addEventListener('click', () => {
        const newText = prompt("Edit task:", taskContent.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskContent.textContent = newText.trim();
            localStorage.setItem(`task-${taskId}`, newText.trim());      //Update task in localStorage
        }
    });
    taskContainer.appendChild(editButton);

    // Delete Task from List

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("material-symbols-outlined");

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        localStorage.removeItem(`task-${taskId}`);   //Remove task from localStorage
        taskCount--;
        displayCount(taskCount);
    });
    taskContainer.appendChild(deleteButton);

    li.appendChild(taskContainer);
};

addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();

    if(taskText === ''){
        alert ("Enter task");
        return;
    }

    const taskId = taskCount;
    createTaskItem(taskText, taskId);
    localStorage.setItem(`task-${taskId}`, taskText);  //Store task in localStorage

    taskCount++;
    displayCount(taskCount);

    newTaskInput.value = '';
});