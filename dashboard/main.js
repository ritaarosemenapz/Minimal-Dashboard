// & WEATHER ICONS
const weatherIconsCollection = {
  thunderstorm: `<i class="fa-solid fa-cloud-bolt"></i>`,
  clouds: `<i class="fa-solid fa-cloud"></i>`,
  drizzle: `<i class="fa-solid fa-cloud-drizzle"></i>`,
  rain: `<i class="fa-solid fa-cloud-showers-heavy"></i>`,
  snow: `<i class="fa-solid fa-snowflakes"></i>`,
  mist: `<i class="fa-solid fa-raindrops"></i>`,
  smoke: `<i class="fa-solid fa-smoke"></i>`,
  haze: `<i class="fa-solid fa-sun-haze"></i>`,
  dust: `<i class="fa-solid fa-sun-dust"></i>`,
  fog: `<i class="fa-solid fa-cloud-fog"></i>`,
  sand: `<i class="fa-solid fa-wind-warning"></i>`,
  ash: `<i class="fa-solid fa-heat"></i>`,
  squall: `<i class="fa-solid fa-wind"></i>`,
  tornado: `<i class="fa-solid fa-tornado"></i>`,
  clear: `<i class="fa-solid fa-sun"></i>`,
};

// & GREETING FUNCTION
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
      console.error(err);
      document.body.style.backgroundColor = "#333";
    });
}
getBackground();

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
      console.log(data);
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

// & TODO LIST
let taskList = [];
let completedTasks = [];
const data = JSON.parse(localStorage.getItem("tasks"));
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
  <span value="${item}">
  <input type="checkbox" id="checkbox" value="${item}"></input>
  <input id="current-task" value="${item}" class="input-text" readonly/>
  </span>
  `;
}

function render() {
  const taskContainer = document.getElementById("task-container");
  const getTasks = JSON.parse(localStorage.getItem("tasks"));
  taskContainer.innerHTML = "";
  if (getTasks) {
    taskList = getTasks;
    for (let item of taskList) {
      taskContainer.innerHTML += buildTaskHtml(item);
    }
  }

  const currentTask = document.querySelectorAll("#current-task");
  const checkBox = document.querySelectorAll("#checkbox");

  for (let boxes of checkBox) {
    const boxesId = boxes.getAttribute("value");
    for (let item of currentTask) {
      const currentTaskId = item.getAttribute("value");
      boxes.addEventListener("change", () => {
        if (boxesId === currentTaskId) {
          markAsDone(item);
        }
      });
    }
  }
}

function markAsDone(item) {
  item.classList.toggle("done");
  const itemContainer = item.parentElement;
  const newData = data.filter(task => task !== item.value);
  localStorage.setItem("tasks", JSON.stringify(newData));
  itemContainer.remove(item);
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
const pomodoroMinutesHtml = document.getElementById("pomodoro-minutes");
const pomodoroSecondsHtml = document.getElementById("pomodoro-seconds");
const pomodoroStats = document.getElementById("pomodoro-stats");

let completedIntervals = 0;

for (let mode of modeButtons) {
  mode.addEventListener("click", () => {
    if (mode.id === "start-pomodoro") {
      startTimer();
    }
  });
}

function startTimer() {
  let minutes = 0;
  let seconds = 5;
  const startTimer = setInterval(() => {
    pomodoroMinutesHtml.innerHTML = `${minutes}:`;
    pomodoroSecondsHtml.innerHTML = `${seconds}`.padStart(2, "0");
    seconds--;
    if (seconds < 0 && minutes > 0) {
      minutes--;
      seconds = 5;
    } else if (seconds < 0 && minutes <= 0) {
      addInterval();
      loadInterval();
      clearInterval(startTimer);
    }
  }, 1000);
}

function addInterval() {
  completedIntervals++;
  localStorage.setItem("pomodoro intervals", completedIntervals);
}

function loadInterval() {
  const now = new Date();
  const expiration = new Date().setHours(0, 0, 0, 0);
  const savedData = localStorage.getItem("pomodoro intervals");
  if (now.getTime() === expiration) {
    localStorage.removeItem("pomodoro intervals");
  } else if (savedData) {
    completedIntervals = savedData;
  } else {
    completedIntervals = 0;
  }
  pomodoroStats.innerHTML = `
    Karma ${completedIntervals} <i class="fa-solid fa-heart"></i>
    `;
}

loadInterval();
