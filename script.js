// Stopwatch Logic
let timer;
let running = false;
let paused = false;
let minutes = 0, seconds = 0, milliseconds = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapList = document.getElementById("lap-list");

// Update display of time
const updateDisplay = () => {
    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
    millisecondsDisplay.textContent = String(milliseconds).padStart(2, "0");
};

// Start stopwatch
const startStopwatch = () => {
    if (running) return;
    running = true;
    document.getElementById("start").classList.add("hidden");
    document.getElementById("pause").classList.remove("hidden");
    document.getElementById("lap").classList.remove("hidden");
    document.getElementById("stop").classList.add("hidden");

    timer = setInterval(() => {
        milliseconds += 1;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds += 1;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes += 1;
        }
        updateDisplay();
    }, 10);
};

// Pause stopwatch
const pauseStopwatch = () => {
    clearInterval(timer);
    running = false;
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("stop").classList.remove("hidden");
    document.getElementById("lap").classList.add("hidden");
};

// Stop stopwatch and reset
const stopStopwatch = () => {
    clearInterval(timer);
    running = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapList.innerHTML = "";  // Clear laps
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("stop").classList.add("hidden");
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("lap").classList.add("hidden");
};

// Add lap time
const addLap = () => {
    const lapTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
    const lapElement = document.createElement("div");
    lapElement.classList.add("lap-time");
    lapElement.textContent = `Lap: ${lapTime}`;
    lapList.appendChild(lapElement);
};

// Reset stopwatch
const resetStopwatch = () => {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
};

// Day/Night Mode Switch Logic
const toggleMode = () => {
    const body = document.body;
    const modeIcon = document.getElementById("mode-icon");

    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        modeIcon.src = "https://img.icons8.com/?size=160&id=64194&format=png"; // Moon icon for dark mode
    } else {
        modeIcon.src = "https://img.icons8.com/?size=160&id=111603&format=png"; // Sun icon for light mode
    }
};
