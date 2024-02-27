// app.js
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value;

        // Send task to the server
        fetch('/api/v1/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText }),
        })
        .then(response => response.json())
        .then(data => {
            // Add the new task to the top of the list
            const li = createTaskElement(data);
            taskList.insertBefore(li, taskList.firstChild);

            // Clear the input field
            taskInput.value = '';
        });
    });

    // Fetch tasks from the server and display them
    fetch('/api/v1/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const li = createTaskElement(task);
                taskList.appendChild(li);
            });
        });
});

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        ${task.text}
        <button class="btn btn-danger btn-sm float-right" onclick="deleteTask('${task._id}')">Delete</button>
        <button class="btn btn-warning btn-sm float-right mr-2" onclick="completeTask('${task._id}', ${task.completed})">
            ${task.completed ? 'Uncomplete' : 'Complete'}
        </button>
        <button class="btn btn-info btn-sm float-right mr-2" data-toggle="modal" data-target="#editTaskModal" onclick="openEditModal('${task._id}', '${task.text}')">Edit</button>
    `;
    return li;
}

function deleteTask(taskId) {
    // Implement deletion logic
    fetch(`/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete task');
        }
    });
}

function completeTask(taskId, isCompleted) {
    // Implement completion logic
    fetch(`/api/v1/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !isCompleted }),
    })
    .then(response => response.json())
    .then(updatedTask => {
        // Update the button text
        const completeButton = document.querySelector(`[onclick="completeTask('${taskId}', ${isCompleted})"]`);
        completeButton.textContent = updatedTask.completed ? 'Uncomplete' : 'Complete';
        window.location.reload();
    });
}

function openEditModal(taskId, taskText) {
    // Implement logic to open the modal and populate it with task data
    const modalTaskIdInput = document.getElementById('modalTaskId');
    const modalTaskTextInput = document.getElementById('modalTaskText');

    modalTaskIdInput.value = taskId;
    modalTaskTextInput.value = taskText;

    $('#editTaskModal').modal('show'); // Use Bootstrap's modal method to show the modal
}

function saveEditedTask() {
    // Implement logic to save the edited task
    const modalTaskIdInput = document.getElementById('modalTaskId');
    const modalTaskTextInput = document.getElementById('modalTaskText');
    const taskId = modalTaskIdInput.value;
    const newTaskText = modalTaskTextInput.value;

    fetch(`/api/v1/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTaskText }),
    })
    .then(response => response.json())
    .then(updatedTask => {
        window.location.reload();
    });
}

document.getElementById('logoutLink').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevents the default action of navigating to "#"
    try {
      const response = await fetch('/logout', {
        method: 'POST'
      });
      if (response.ok) {
        // Handle successful logout (e.g., redirect to login page)
        window.location.href = '/';
      } else {
        // Handle errors
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  });