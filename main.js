function getBackground() {
  if (localStorage.getItem("background query")) {
    backgroundQuery = localStorage.getItem("background query");
  }
  fetch(
    `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${backgroundQuery}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.location.position && data.location.name) {
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        document.getElementById(
          "author-info"
        ).innerHTML = `Photo by: ${data.user.name}`;
        document.getElementById("geo-info").innerHTML = `
        ${data.location.name}
        `;
      }
    })

    .catch(err => {
      document.body.style.backgroundImage = url(
        "https://images.unsplash.com/photo-1656643950245-ea965f500549?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
      );
    });
}
getBackground();

function getGreeting() {
  let user = "Rita";
  let timeNow = new Date().getHours();
  let greeting;
  timeNow < 12
    ? (greeting = "Good morning")
    : timeNow < 17
    ? (greeting = "Good afternoon")
    : timeNow < 20
    ? (greeting = "Good evening")
    : (greeting = "Good night");
  document.getElementById("greeting").innerHTML = `${greeting}, ${user}`;
}
getGreeting();

const backgroundQueryInput = document.getElementById("background-query-input");
let backgroundQuery;
backgroundQueryInput.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    backgroundQuery = backgroundQueryInput.value;
    localStorage.setItem("background query", backgroundQuery);
    backgroundQueryInput.value = "";
    getBackground();
  }
});

function getCurrentTime() {
  let currentTime = new Date().toLocaleTimeString("ko-KR", {
    timeStyle: "medium",
  });
  let currentDate = new Date().toLocaleDateString("ko-KR");
  document.getElementById("clock-info").innerHTML = `
   <span>${currentDate}</span>
   <span>${currentTime}</span>
   `;
}

setInterval(getCurrentTime, 1000);

// * Fetching weather info

const locationInput = document.getElementById("location-input");
let locationQuery;
locationInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    locationQuery = locationInput.value;
    localStorage.setItem("location", locationQuery);
    locationInput.value = "";
    getCurrentWeather(locationQuery);
  }
});

function getCurrentWeather(location) {
  if (localStorage.getItem("location")) {
    location = localStorage.getItem("location");
  }
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${location}&units=metric`
  )
    .then(response => {
      if (!response.ok) {
        throw Error("Weather data not available");
      }
      return response.json();
    })
    .then(data => {
      const currentTemp = Math.round(data.main.temp);
      const currentTempLocation = `${data.name}, ${data.sys.country}`;
      const currentTempIcon = `${data.weather[0].icon}`;
      document.getElementById("temp-top").innerHTML = `
        <span class="temp-info">
        <img class="weather-icon" src="http://openweathermap.org/img/wn/${currentTempIcon}@2x.png"/>
        ${currentTemp}°</span>`;
      document.getElementById(
        "temp-secondary"
      ).innerHTML = `<div class="temp-secondary">
        <p class="current-temp-location">${currentTempLocation}</p>
        </div>    
        `;
    })
    .catch(err => console.error(err));
}
getCurrentWeather(locationQuery);

let taskList = [];
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
render();

function showHideTasks() {
  const todoContainer = document.getElementById("todo-container-parent");
  document.getElementById("open-tasks-btn").addEventListener("click", () => {
    if (todoContainer.classList.contains("hide")) {
      todoContainer.classList.remove("hide");
    } else {
      todoContainer.classList.add("hide");
    }
  });
}
showHideTasks();

function showHidePomodoro() {
  const pomodoroButton = document.getElementById("open-pomodoro-btn");
  const pomodoroContainer = document.getElementById("pomodoro-container");
  pomodoroButton.addEventListener("click", () => {
    if (pomodoroContainer.classList.contains("hide")) {
      pomodoroContainer.classList.remove("hide");
    } else {
      pomodoroContainer.classList.add("hide");
    }
  });
}
showHidePomodoro();

function addTask() {
  const taskInput = document.getElementById("task-input");
  const newTask = taskInput.value;
  taskList.unshift(newTask);
  taskInput.value = "";
  saveTasks(taskList);
}

function buildTaskHtml(item) {
  return `
  <div class="task-item">
    <input type="checkbox" id="checkbox" value="${item}">
    </input>
    <ul id="current-task" class="input-text">${item}</ul>
  </div>
  `;
}

function render() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";
  if (savedTasks) {
    taskList = savedTasks;
    for (let tasks of taskList) {
      taskContainer.innerHTML += buildTaskHtml(tasks);
    }
  }
  const currentTasks = document.querySelectorAll("#current-task");
  const checkBoxes = document.querySelectorAll("#checkbox");
  for (let box of checkBoxes) {
    const boxesId = box.getAttribute("value");
    for (let task of currentTasks) {
      const currentTaskId = task.innerHTML;
      box.addEventListener("change", () => {
        if (boxesId === currentTaskId) {
          markAsDone(task);
        }
      });
    }
  }
}

function markAsDone(task) {
  const taskContainer = task.parentElement;
  const newData = savedTasks.filter(data => data !== task.innerHTML);
  localStorage.setItem("tasks", JSON.stringify(newData));
  taskContainer.remove(task);
}

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  addTask();
  render();
});

function saveTasks(listOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(listOfTasks));
}

// * POMODORO
const modeButtons = document.querySelectorAll("button");
const pomodoroStats = document.getElementById("pomodoro-stats");
const minutesContainer = document.getElementById("pomodoro-minutes");
const secondsContainer = document.getElementById("pomodoro-seconds");
const startPomodoroBtn = document.getElementById("start-pomodoro");
const pausePomodoroBtn = document.getElementById("pause-pomodoro");

let completedIntervals = 0;
let sessionMinutes = 24;
let sessionSeconds = 60;
let isClockRunning;

startPomodoroBtn.addEventListener("click", () => {
  if (isClockRunning === undefined) {
    isClockRunning = setInterval(runTimer, 1000);
    pomodoroMusic.tracks[1].play();
  }
});

pausePomodoroBtn.addEventListener("click", () => {
  clearInterval(isClockRunning);
  isClockRunning = undefined;
  pomodoroMusic.tracks[1].pause();
});

function runTimer() {
  if (sessionSeconds > 0) {
    sessionSeconds--;
  } else if (sessionSeconds === 0 && sessionSeconds > 0) {
    sessionMinutes--;
    sessionSeconds = 59;
  }
  minutesContainer.innerHTML = `${sessionMinutes}:`;
  secondsContainer.innerHTML = `${sessionSeconds}`.padStart(2, "0");
}

const pomodoroMusic = {
  tracks: {
    1: new Audio(
      "https://dl.dropboxusercontent.com/s/u7x2g2ss708nwcp/lofi-study-112191.mp3?dl=0"
    ),
  },
};

function addIntervals() {
  completedIntervals++;
  localStorage.setItem("pomodoro intervals", completedIntervals);
}

function resetIntervals() {
  const now = new Date();
  const expiration = new Date().setHours(0, 0);
  if (now.getTime() === expiration) {
    localStorage.removeItem("pomodoro intervals");
  }
}

function loadIntervals() {
  const savedData = localStorage.getItem("pomodoro intervals");
  savedData ? (completedIntervals = savedData) : (completedIntervals = 0);
  return (pomodoroStats.innerHTML = `
    Karma ${completedIntervals} <i class="fa-solid fa-heart"></i>
    `);
}
loadIntervals();
