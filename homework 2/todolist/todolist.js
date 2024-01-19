document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function displayTasks() {
      taskList.innerHTML = ''; 
  
      tasks.forEach(function(task, index) {
        const li = document.createElement('li');
        li.textContent = task;
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Șterge';
        deleteBtn.addEventListener('click', function() {
          deleteTask(index);
        });
  
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editează';
        editBtn.addEventListener('click', function() {
          editTask(index);
        });
  
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        taskList.appendChild(li);
      });
    }
  
    function addTask() {
      const input = document.getElementById('taskInput');
      const newTask = input.value.trim();
  
      if (newTask !== '') {
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        displayTasks();
      }
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
    }
  
    function editTask(index) {
      const updatedTask = prompt('Editează sarcina:', tasks[index]);
      if (updatedTask !== null) {
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      }
    }
  
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
  
    displayTasks();
  });
  