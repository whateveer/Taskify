// workspace.js

$(document).ready(function() {
    // Function to load tasks
    function loadTasks() {
        axios.get('/tasks')
            .then(response => {
                const tasks = response.data;
                const tasksContainer = $('.tasks');
                tasksContainer.empty();
                tasks.forEach(task => {
                    tasksContainer.append(`
                        <div class="task" data-id="${task._id}">
                            <p>${task.name}</p>
                            <button class="delete-btn">Delete</button>
                            <button class="edit-btn">Edit</button>
                        </div>
                    `);
                });
            })
            .catch(error => console.error('Error loading tasks:', error));
    }

    // Load tasks when the page is loaded
    loadTasks();

    // Submit new task
    $('#taskForm').submit(function(event) {
        event.preventDefault();
        const taskName = $('#taskName').val();
        if (taskName) {
            axios.post('/tasks', { name: taskName })
                .then(() => {
                    loadTasks();
                    $('#taskName').val('');
                })
                .catch(error => console.error('Error creating task:', error));
        }
    });

    // Delete task
    $(document).on('click', '.delete-btn', function() {
        const taskId = $(this).closest('.task').data('id');
        axios.delete(`/tasks/${taskId}`)
            .then(() => {
                loadTasks();
            })
            .catch(error => console.error('Error deleting task:', error));
    });

    // Edit task (To be implemented)
});
