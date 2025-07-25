let todos = [];

function makeTodo() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;

    if (title === "" || date === "") {
        alert("Please fill in both fields.");
        return;
    } else {
        todos.push({
            title: title,
            date: date,
            completed: false
        });

        console.log("Todo added:", title, date);
        console.log(todos);

        saveTodos();
        renderTodos();
        document.getElementById("title").value = '';
        document.getElementById("date").value = '';
    }
}

function renderTodos() {
    const todoList = document.getElementById("task");
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = `${todo.title} - ${todo.date}`;
        li.className = todo.completed ? "completed" : "";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute('style', 'background-color: red; color: white; border: none; border-radius: 5px; padding: 5px;');
        deleteButton.setAttribute('id', 'buttonGroup');
        deleteButton.onclick = () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        };

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.setAttribute('style', 'background-color: green; color: white; border: none; border-radius: 5px; padding: 5px; gap: 5px;');
        completeButton.setAttribute('id', 'buttonGroup');
        completeButton.onclick = () => {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        };

        const container = document.createElement("div");
        container.setAttribute('style', 'display: flex; gap: 10px;');

        li.appendChild(container);
        container.appendChild(deleteButton);
        container.appendChild(completeButton);
        todoList.appendChild(li);
    });
}

function filterTodos(status) {
    const todoList = document.getElementById("task");
    todoList.innerHTML = '';

    let filteredTodos = [];
    if (status === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (status === "uncompleted") {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else {
        filteredTodos = todos;
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = `${todo.title} - ${todo.date}`;
        li.className = todo.completed ? "completed" : "";

        todoList.appendChild(li);
    });
}

function removeAllTodos() {
    todos = [];
    saveTodos();   
    renderTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

window.addEventListener('load', function() {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    renderTodos();
    const addTodo = document.querySelector('#form');
    if (addTodo) {
        addTodo.addEventListener('submit', function(event) {
            event.preventDefault();
            makeTodo();
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("filterButton");
    const dropdownMenu = filterButton.nextElementSibling;

    dropdownMenu.style.display = "none";

    filterButton.onclick = function(e) {
        e.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
    };

    document.addEventListener("click", function(e) {
        if (!filterButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});
    