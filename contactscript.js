document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("contact-form");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var message = document.getElementById("message").value;
  
      // Here, you can add code to send the form data to a server or perform any other desired action
      console.log("Name: " + name);
      console.log("Email: " + email);
      console.log("Message: " + message);
  
      // Optionally, you can reset the form after submission
      form.reset();
    });

    const taskInput = document.querySelector(".t-input input"),                            // displaying funtions
filters = document.querySelectorAll(".fil span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".tbox");

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

    function showTodo(filter) {
        let liTag = "";
        if(todos) {
            todos.forEach((todo, id) => {
                let completed = todo.status == "com" ? "checked" : "";
                if(filter == todo.status || filter == "all") {
                    liTag += `<li class="task">
                                <label for="${id}">
                                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${com}>
                                    <p class="${com}">${todo.name}</p>
                                </label>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                    <ul class="task-menu">
                                        <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                        <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                    </ul>
                                </div>
                            </li>`;
                }
            });
        }
        taskBox.innerHTML = liTag || `<span>You don't have any feedback here</span>`;
        let checkTask = taskBox.querySelectorAll(".task");
        !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
        taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
    }
    showTodo("all");
    
    function showMenu(selectedTask) {                                              //select your task
        let menuDiv = selectedTask.parentElement.lastElementChild;
        menuDiv.classList.add("show");
        document.addEventListener("click", e => {
            if(e.target.tagName != "I" || e.target != selectedTask) {
                menuDiv.classList.remove("show");
            }
        });
    }
    
    function updateStatus(selectedTask) {
        let taskName = selectedTask.parentElement.lastElementChild;
        if(selectedTask.checked) {
            taskName.classList.add("checked");
            todos[selectedTask.id].status = "com";
        } else {
            taskName.classList.remove("checked");
            todos[selectedTask.id].status = "pen";
        }
        localStorage.setItem("todo-list", JSON.stringify(todos))
    }
    
    function editTask(taskId, textName) {                         
        editId = taskId;
        isEditTask = true;
        taskInput.value = textName;
        taskInput.focus();
        taskInput.classList.add("active");
    }
    
    function deleteTask(deleteId, filter) {
        isEditTask = false;
        todos.splice(deleteId, 1);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(filter);
    }
    
    clearAll.addEventListener("click", () => {
        isEditTask = false;
        todos.splice(0, todos.length);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo()
    });
    
    taskInput.addEventListener("keyup", e => {
        let userTask = taskInput.value.trim();
        if(e.key == "Enter" && userTask) {
            if(!isEditTask) {
                todos = !todos ? [] : todos;
                let taskInfo = {name: userTask, status: "pen"};
                todos.push(taskInfo);
            } else {
                isEditTask = false;
                todos[editId].name = userTask;
            }
            taskInput.value = "";
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showTodo(document.querySelector("span.active").id);
        }
    });
});
  