const addBtn = document.getElementById("addBtn");
const newTask = document.getElementById("newTask");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filters button");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  let filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const checkIcon = document.createElement("img");
    checkIcon.src = "assets/icons/checkmark.png";
    checkIcon.title = "Toggle complete";
    checkIcon.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const editIcon = document.createElement("img");
    editIcon.src = "assets/icons/edit.png";
    editIcon.title = "Edit task";
    editIcon.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/icons/delete.png";
    deleteIcon.title = "Delete task";
    deleteIcon.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.append(checkIcon, editIcon, deleteIcon);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = newTask.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    newTask.value = "";
    saveTasks();
    renderTasks();
  }
};

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  };
});

clearCompleted.onclick = () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
};

renderTasks();
