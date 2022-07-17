async function getRandomQuote() {
    let response = await fetch("https://type.fit/api/quotes")
    let data = await response.json()
    return data
}

function displayQuote() {
    const quoteContainer = document.getElementById("quote-container")
    getRandomQuote().then(data => {
        const randomQuote = Math.floor(Math.random() * data.length)
        quoteContainer.innerHTML = `
        <blockquote>"${data[randomQuote].text}" – ${data[randomQuote].author}</blockquote>
        `
    })
}
displayQuote()

function getGreetingTime() {
    let greeting
    let timeNow = new Date().getHours()
    timeNow < 12
        ? (greeting = "Good morning")
        : timeNow < 17
        ? (greeting = "Good afternoon")
        : timeNow < 20
        ? (greeting = "Good evening")
        : (greeting = "Good night")
    return greeting
}

function getUsername() {
    const centralContainer = document.getElementById("central-container")
    const getUsernameContainer = document.getElementById("get-username")
    const userNameInput = document.getElementById("username")
    let userName
    const savedUsername = localStorage.getItem("username")

    if (savedUsername) {
        userName = savedUsername
        displayGreeting()
    } else {
        centralContainer.style.display = "none"
        getUsernameContainer.style.display = "flex"
    }

    userNameInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            userName = userNameInput.value
            userNameInput.value = ""
            localStorage.setItem("username", userName)
            displayGreeting()
        }
    })
}
getUsername()

function displayGreeting() {
    const centralContainer = document.getElementById("central-container")
    centralContainer.style.display = "block"
    document.getElementById("get-username").style.display = "none"
    const greetingContainer = document.getElementById("greeting")
    const savedUsername = localStorage.getItem("username")
    greetingContainer.innerHTML = `<h2>${getGreetingTime()}, ${savedUsername}</h2>`
    let currentTime = new Date().toLocaleTimeString("ko-KO", {
        timeStyle: "medium",
    })
    let currentDate = new Date().toLocaleDateString("ko-KO")
    document.getElementById("clock-info").innerHTML = `
    <h3>${currentDate}</h3>
    <h3>${currentTime}</h3>
    `
    setInterval(displayGreeting, 1000)
}


async function getCurrentWeather() {
    const locationInput = document.getElementById("location-input")
    let locationQuery
    const savedLocation = localStorage.getItem("location")

    if (savedLocation) {
        locationQuery = savedLocation
    } 

    locationInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            locationQuery = locationInput.value
            locationInput.value = ""
            localStorage.setItem("location", locationQuery)
            displayCurrentWeather()
        }
    })

    let response = await fetch(
        `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${locationQuery}&units=metric`
    )
    let data = await response.json()
    return data
}

function displayCurrentWeather() {
    getCurrentWeather().then(data => {
        const currentTempIcon = `${data.weather[0].icon}`
        const currentTemp = Math.trunc(data.main.temp)
        const currentTempLocation = `${data.name}, ${data.sys.country}`
        document.getElementById("temp-top").innerHTML = `
        <span class="temp-info animate__fadeIn">
            <img class="weather-icon" src="http://openweathermap.org/img/wn/${currentTempIcon}@2x.png"/>
            </span>
        <h3>${currentTemp}°</h3>
        <p class="temp-city-name">${currentTempLocation}</p>
        `
    })
}

displayCurrentWeather()

function toggleTasksVisibility() {
    const todoContainer = document.getElementById("todo-container-parent")
    const greetingContainer = document.getElementById("greeting")
    document.getElementById("open-tasks-btn").addEventListener("click", () => {
        if (todoContainer.classList.contains("hide")) {
            todoContainer.classList.remove("hide")
            greetingContainer.style.display = "none"
        } else {
            todoContainer.classList.add("hide")
            greetingContainer.style.display = "block"
        }
    })
}
toggleTasksVisibility()

function togglePomodoroVisibility() {
    const pomodoroButton = document.getElementById("open-pomodoro-btn")
    const pomodoroContainer = document.getElementById("pomodoro-container")
    const greetingContainer = document.getElementById("greeting")
    const clockContainer = document.getElementById("clock-info")
    pomodoroButton.addEventListener("click", () => {
        if (pomodoroContainer.classList.contains("hide")) {
            pomodoroContainer.classList.remove("hide")
            greetingContainer.style.display = "none"
            clockContainer.style.display = "none"
        } else {
            pomodoroContainer.classList.add("hide")
            greetingContainer.style.display = "block"
            clockContainer.style.display = "flex"
        }
    })
}
togglePomodoroVisibility()

let taskList = []
const savedTasks = JSON.parse(localStorage.getItem("tasks"))
displayTasks()

function addTask() {
    const taskInput = document.getElementById("task-input")
    let newTask

    taskInput.addEventListener("keypress", event => {
        if (event.key === "Enter" && taskInput.value.length > 0) {
            newTask = taskInput.value
            taskList.unshift(newTask)
            taskInput.value = ""
            localStorage.setItem("tasks", JSON.stringify(taskList))
            displayTasks()
        }
    })
}
addTask()

function displayTasks() {
    const taskContainer = document.getElementById("task-container")
    taskContainer.innerHTML = ""

    if (savedTasks) {
        taskList = savedTasks
    }

    for (let task of taskList) {
        taskContainer.innerHTML += `
        <div id="task-item" class="task-item">
          <input type="checkbox" value="${task}">
          <ul id="current-task">${task}</ul>
        </div>
        `
    }
    markAsDone()
}


function markAsDone() {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]')
    const currentTasks = document.querySelectorAll("#current-task")
    
    checkBoxes.forEach(box => {
        box.addEventListener("change", () => {
            for (let task of currentTasks) {
                if (task.innerHTML === box.value)
                task.classList.toggle("done-task")
            }
        })
    })
}

const pomodoroStats = document.getElementById("pomodoro-stats")
const minutesContainer = document.getElementById("pomodoro-minutes")
const secondsContainer = document.getElementById("pomodoro-seconds")
const startPomodoroBtn = document.getElementById("start-pomodoro")
const pausePomodoroBtn = document.getElementById("pause-pomodoro")

let completedIntervals = 0
let isClockRunning
let sessionMinutes = 0
let sessionSeconds = 5

startPomodoroBtn.addEventListener("click", () => {
    if (isClockRunning === undefined) {
        isClockRunning = setInterval(runTimer, 1000)
    }
})

pausePomodoroBtn.addEventListener("click", () => {
    clearInterval(isClockRunning)
    isClockRunning = undefined
    pomodoroMusic.tracks[1].pause()
})

function runTimer() {
    if (sessionSeconds > 0) {
        sessionSeconds--
    } else if (sessionSeconds === 0 && sessionMinutes > 0) {
        sessionSeconds = 59
        sessionMinutes--
    } else if (sessionSeconds === 0 && sessionMinutes === 0) {
        clearInterval(isClockRunning)
        addCompletedSession()
        pomodoroMusic.tracks[1].play()
        loadCompletedSessions()
    }
    minutesContainer.innerHTML = `${sessionMinutes}:`
    secondsContainer.innerHTML = `${sessionSeconds}`.padStart(2, "0")
}

const pomodoroMusic = {
    tracks: {
        1: new Audio("https://www.dl.dropboxusercontent.com/s/67usj6b8xott8ev/taskDone.mp3?dl=0"),
    },
}

function addCompletedSession() {
    completedIntervals++
    localStorage.setItem("pomodoro intervals", completedIntervals)
}

function resetTotalSessions() {
    const now = new Date()
    const expiration = new Date().setHours(0, 0)
    if (now.getTime() === expiration) {
        localStorage.removeItem("pomodoro intervals")
    }
}

function loadCompletedSessions() {
    resetTotalSessions()
    const savedData = localStorage.getItem("pomodoro intervals")
    savedData ? (completedIntervals = savedData) : (completedIntervals = 0)
    minutesContainer.innerHTML = `25:`
    secondsContainer.innerHTML = `00`
    pomodoroStats.innerHTML = `<div><i class="fa-solid fa-fire"></i> ${completedIntervals}`
}
loadCompletedSessions()


