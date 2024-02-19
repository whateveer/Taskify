const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const continueBtn = document.getElementById('continue');
const pomodoroBtn = document.getElementById('pomodoro');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');
const addTaskBtn = document.getElementById('add-task');
const taskInput = document.querySelector('.task-input');
const tasksSection = document.querySelector('.tasks-section');

let isTimerRunning = false;
let timerDuration = 25 * 60; // 25 minutes by default for a pomodoro
let currentInterval;
let remainingTime = 0;
let tasks = [];

function startTimer(duration) {
    clearInterval(currentInterval);
    isTimerRunning = true;
    currentInterval = setInterval(() => {
        updateTimer(duration);
        if (--duration < 0) {
            clearInterval(currentInterval);
            alert('Timer is up!');
            isTimerRunning = false;
        }
    }, 1000);
}

function updateTimer(duration) {
    let minutes = parseInt(duration / 60, 10);
    let seconds = parseInt(duration % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerDisplay.textContent = minutes + ":" + seconds;
}

function pauseTimer() {
    clearInterval(currentInterval);
    isTimerRunning = false;
    remainingTime = timerDuration;
}

function continueTimer() {
    if (!isTimerRunning && remainingTime > 0) {
        startTimer(remainingTime);
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox">
            <label>${taskText}</label>
        `;
        tasksSection.appendChild(taskItem);
        tasks.push(taskText);
        taskInput.value = '';
    }
}

// Event listeners
startBtn.addEventListener('click', function() {
    if (!isTimerRunning) {
        startTimer(timerDuration);
    }
});

pauseBtn.addEventListener('click', function() {
    pauseTimer();
});

continueBtn.addEventListener('click', function() {
    continueTimer();
});

pomodoroBtn.addEventListener('click', function() {
    timerDuration = 25 * 60;
});

shortBreakBtn.addEventListener('click', function() {
    clearInterval(currentInterval); // Stop the timer
    isTimerRunning = false;
    timerDuration = 5 * 60; // Set timer duration to 5 minutes for short break
});

longBreakBtn.addEventListener('click', function() {
    clearInterval(currentInterval); // Stop the timer
    isTimerRunning = false;
    timerDuration = 15 * 60; // Set timer duration to 15 minutes for long break
});

addTaskBtn.addEventListener('click', function() {
    addTask();
});
