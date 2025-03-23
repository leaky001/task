// Select elements
const taskInput = document.getElementById('task-input');
const saveTask = document.getElementById('save-task');
const taskList = document.getElementById('task-list');
const exportBtn = document.getElementById('export-task');
const toggleThemeBtn = document.getElementById('toggle-light-mode');
const body = document.body;

// Load tasks on startup
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadTheme();
});

// Add task functionality
saveTask.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task !== '') {
        createTask(task);
        taskInput.value = '';
        saveTasks();
    }
});

// Create task element
function createTask(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.innerText = text;
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const del = document.createElement('button');
    del.innerText = '❌';
    del.style.background = 'transparent';
    del.style.border = 'none';
    del.style.color = '#ff0000';
    del.style.cursor = 'pointer';
    del.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
}

// Save tasks to localStorage
function savetask() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('taskVault', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('taskVault')) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
}

// Export tasks
// exportBtn.addEventListener('click', () => {
//     const tasks = [];
//     taskList.querySelectorAll('li').forEach(li => {
//         const status = li.classList.contains('completed') ? '[Done]' : '[Pending]';
//         tasks.push(`${status} ${li.querySelector('span').innerText}`);
//     });
//     const blob = new Blob([tasks.join('\n')], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'TaskVault_Tasks.txt';
//     link.click();
// });

// Theme toggle logic with memory
togglelightmode.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        toggleThemeBtn.innerText = 'dark mode 🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        toggleThemeBtn.innerText = 'light mode 💡';
        localStorage.setItem('theme', 'dark');
    }
});

// Load theme from localStorage
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    body.classList.remove('dark', 'light');
    body.classList.add(theme);
    toggleThemeBtn.innerText = theme === 'dark' ? 'light mode 💡' : 'dark mode 🌙';


}



// const taskInput = document.getElementById('task-input');
// const savetask= document.getElementById('save-task');
// const exporttask = document.getElementById('export-task');
// const togglelightmode = document.getElementById('toggle-light-mode');
// const body = document.body;

// // Load tasks from localStorage on page load
// document.addEventListener('DOMContentLoaded', loadTasks);

// // Add new task
// addTaskBtn.addEventListener('click', () => {
//     const taskText = taskInput.value.trim();
//     if (taskText) {
//         addTask(taskText);
//         taskInput.value = '';
//         saveTasks();
//     }
// });

// // Add task to the UI
// function addTask(text, completed = false) {
//     const li = document.createElement('li');
//     if (completed) li.classList.add('completed');

//     const span = document.createElement('span');
//     span.textContent = text;
//     span.addEventListener('click', () => {
//         li.classList.toggle('completed');
//         saveTasks();
//     });

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = '❌';
//     deleteBtn.addEventListener('click', () => {
//         li.remove();
//         saveTasks();
//     });

//     li.appendChild(span);
//     li.appendChild(deleteBtn);
//     taskList.appendChild(li);
// }

// // Save tasks to localStorage
// function saveTasks() {
//     const tasks = [];
//     document.querySelectorAll('#task-list li').forEach(li => {
//         tasks.push({
//             text: li.querySelector('span').textContent,
//             completed: li.classList.contains('completed')
//         });
//     });
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// // Load tasks from localStorage
// function loadTasks() {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks.forEach(task => addTask(task.text, task.completed));
// }

// // Export tasks as text file
// exportBtn.addEventListener('click', () => {
//     const tasks = [];
//     document.querySelectorAll('#task-list li').forEach(li => {
//         const status = li.classList.contains('completed') ? '[Done]' : '[Pending]';
//         tasks.push(`${status} ${li.querySelector('span').textContent}`);
//     });

//     const blob = new Blob([tasks.join('\n')], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'TaskVault_Tasks.txt';
//     link.click();
// });

// // Toggle light/dark mode
// toggleThemeBtn.addEventListener('click', () => {
//     body.classList.toggle('light');
//     body.classList.toggle('dark');
//     toggleThemeBtn.textContent = body.classList.contains('light') ? 'Dark Mode' : 'Light Mode';
// });