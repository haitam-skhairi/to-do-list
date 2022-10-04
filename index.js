let input = document.querySelector(".input");
let addTask = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let clearAll = document.querySelector(".clear");

// Input Focused
input.focus();
emptyTask();

// Empty Array Task
let tasksArray = [];

// Check
if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(window.localStorage.getItem("tasks"));
}

// Trigger the tasks from locale storage
getTaskstoLocalStorage();

// Delet tasks
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Delete Prompt
    let prompt = document.createElement("div");
    prompt.className = "del-prompt";
    // Create container prpmpt
    let promptContainer = document.createElement("div");
    promptContainer.className = "del-prompt-container";
    let promptContainerText = document.createElement("div");
    promptContainerText.className = "del-prompt-container-text";
    promptContainerText.appendChild(
      document.createTextNode("Are you sure to delete the task?")
    );
    // yes
    let yesDelete = document.createElement("span");
    yesDelete.appendChild(document.createTextNode("Yes"));
    yesDelete.className = "yes-delete";
    // Confirme Delete event
    yesDelete.addEventListener("click", () => {
      e.target.parentElement.remove();
      removeTaskfromLocalStorage(
        e.target.parentElement.getAttribute("data-id")
      );
      prompt.remove();
      if (tasksDiv.innerHTML == "") {
        location.reload();
        emptyTask();
      }
    });
    // not
    let notDelete = document.createElement("span");
    notDelete.appendChild(document.createTextNode("No"));
    notDelete.className = "not-delete";
    // Evite Delete event
    notDelete.addEventListener("click", () => {
      prompt.remove();
    });
    // Append Prompt
    promptContainer.appendChild(promptContainerText);
    promptContainer.appendChild(notDelete);
    promptContainer.appendChild(yesDelete);
    prompt.appendChild(promptContainer);
    document.body.appendChild(prompt);
  }

  // Task
  if (e.target.classList.contains("task")) {
    // Toggle taks status function
    toggleTaskStatusWith(e.target.getAttribute("data-id"));
    // Toggle classList
    e.target.classList.toggle("done");
  }
});

// Add Tasks to the Tasks div
addTask.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
    input.focus();
  }
};

function addTaskToArray(taskText) {
  const newTask = {
    id: Date.now(),
    text: taskText,
    complete: false,
  };
  tasksArray.push(newTask);

  // Add Tasks to Div Tasks from Array
  addTaskToPageFrom(tasksArray);

  // Add Tasks to Local Storage
  addTaskstoLocalStorage(tasksArray);
}

function addTaskToPageFrom(tasksArray) {
  tasksDiv.innerHTML = "";
  tasksArray.forEach((task) => {
    // Create main div task
    let div = document.createElement("div");
    div.className = "task";
    // Check if tast is done
    if (task.complete) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.text));
    // Create delete button span
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // Appende Main Task Div to Tasks Container
    tasksDiv.appendChild(div);
  });

  if (tasksDiv.innerHTML == "") {
    emptyTask();
  }
}

// Add Tasks to Local Storage

function addTaskstoLocalStorage(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// Get Task fron the Local Storage

function getTaskstoLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTaskToPageFrom(tasks);
  }
}

// localStorage.clear();
function removeTaskfromLocalStorage(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addTaskstoLocalStorage(tasksArray);
}

// Clear All Tasks
clearAll.addEventListener("click", (e) => {
  // Delete Prompt
  let prompt = document.createElement("div");
  prompt.className = "del-prompt";
  // Create container prpmpt
  let promptContainer = document.createElement("div");
  promptContainer.className = "del-prompt-container";
  let promptContainerText = document.createElement("div");
  promptContainerText.className = "del-prompt-container-text";
  promptContainerText.appendChild(
    document.createTextNode("Are you sure to delete all tasks?")
  );
  // yes
  let yesDelete = document.createElement("span");
  yesDelete.appendChild(document.createTextNode("Yes"));
  yesDelete.className = "yes-delete";
  // Confirme Delete event
  yesDelete.addEventListener("click", () => {
    tasksDiv.innerHTML = "";
    window.localStorage.clear();
    prompt.remove();
    input.focus();
    if (tasksDiv.innerHTML == "") {
      location.reload();
      emptyTask();
    }
  });
  // not
  let notDelete = document.createElement("span");
  notDelete.appendChild(document.createTextNode("No"));
  notDelete.className = "not-delete";
  // Evite Delete event
  notDelete.addEventListener("click", () => {
    prompt.remove();
  });
  // Append Prompt
  promptContainer.appendChild(promptContainerText);
  promptContainer.appendChild(notDelete);
  promptContainer.appendChild(yesDelete);
  prompt.appendChild(promptContainer);
  document.body.appendChild(prompt);
});

// Tasks div Empty
function emptyTask() {
  // if (tasksDiv.innerHTML === "") {
  let empty = document.createElement("div");
  empty.className = "empty";
  empty.appendChild(document.createTextNode("Empty"));
  tasksDiv.appendChild(empty);
  // }
}

function toggleTaskStatusWith(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].complete == false
        ? (tasksArray[i].complete = true)
        : (tasksArray[i].complete = false);
    }
  }
  addTaskstoLocalStorage(tasksArray);
}
