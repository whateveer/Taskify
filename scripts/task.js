// task.js

$(document).ready(function() {
    // Load task details
    function loadTaskDetails(taskId) {
        axios.get(`/tasks/${taskId}`)
            .then(response => {
                const task = response.data;
                $('#taskTitle').text(task.name);
                $('#taskDescription').text(task.description);
            })
            .catch(error => console.error('Error loading task details:', error));
    }

    // Load task details when the page is loaded
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('id');
    if (taskId) {
        loadTaskDetails(taskId);
    }

    // Submit edited task (To be implemented)

    // Delete task
    $('#deleteTaskBtn').click(function() {
        axios.delete(`/tasks/${taskId}`)
            .then(() => {
                // Redirect to workspace after deleting task
                window.location.href = '/workspace.html';
            })
            .catch(error => console.error('Error deleting task:', error));
    });
});
