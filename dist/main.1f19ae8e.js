// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// & GREETING FUNCTION
function getGreeting() {
  var user = "Rita";
  var timeNow = new Date().getHours();
  var greeting;
  timeNow < 12 ? greeting = "Good morning" : timeNow < 17 ? greeting = "Good afternoon" : timeNow < 20 ? greeting = "Good evening" : greeting = "Good night";
  document.getElementById("greeting").innerHTML = "".concat(greeting, ", ").concat(user);
}

getGreeting();
var backgroundQueryInput = document.getElementById("background-query-input");
var backgroundQuery;
backgroundQueryInput.addEventListener("keypress", function (event) {
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

  fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=".concat(backgroundQuery)).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.location.position && data.location.name) {
      document.body.style.backgroundImage = "url(".concat(data.urls.full, ")");
      document.getElementById("author-info").innerHTML = "Photo by: ".concat(data.user.name);
      document.getElementById("geo-info").innerHTML = "\n        ".concat(data.location.name, "\n        ");
    }
  }).catch(function (err) {
    console.error(err);
    document.body.style.backgroundColor = "#333";
  });
}

getBackground();

function getCurrentTime() {
  var currentTime = new Date().toLocaleTimeString("ko-KR", {
    timeStyle: "medium"
  });
  var currentDate = new Date().toLocaleDateString("ko-KR");
  document.getElementById("clock-info").innerHTML = "\n   <span>".concat(currentDate, "</span>\n   <span>").concat(currentTime, "</span>\n   ");
}

setInterval(getCurrentTime, 1000); // * Fetching weather info

var locationInput = document.getElementById("location-input");
var locationQuery;
locationInput.addEventListener("keypress", function (e) {
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

  fetch("https://apis.scrimba.com/openweathermap/data/2.5/weather?q=".concat(location, "&units=metric")).then(function (response) {
    if (!response.ok) {
      throw Error("Weather data not available");
    }

    return response.json();
  }).then(function (data) {
    console.log(data);
    var currentTemp = Math.round(data.main.temp);
    var currentTempLocation = "".concat(data.name, ", ").concat(data.sys.country);
    var currentTempIcon = "".concat(data.weather[0].icon);
    document.getElementById("temp-top").innerHTML = "\n        <span class=\"temp-info\">\n        <img class=\"weather-icon\" src=\"http://openweathermap.org/img/wn/".concat(currentTempIcon, "@2x.png\"/>\n        ").concat(currentTemp, "\xB0</span>");
    document.getElementById("temp-secondary").innerHTML = "<div class=\"temp-secondary\">\n        <p class=\"current-temp-location\">".concat(currentTempLocation, "</p>\n        </div>    \n        ");
  }).catch(function (err) {
    return console.error(err);
  });
}

getCurrentWeather(locationQuery); // & TODO LIST

var taskList = [];
var completedTasks = [];
var data = JSON.parse(localStorage.getItem("tasks"));
render();

function showHideTasks() {
  var todoContainer = document.getElementById("todo-container-parent");
  document.getElementById("open-tasks-btn").addEventListener("click", function () {
    if (todoContainer.classList.contains("hide")) {
      todoContainer.classList.remove("hide");
    } else {
      todoContainer.classList.add("hide");
    }
  });
}

showHideTasks();

function showHidePomodoro() {
  var pomodoroButton = document.getElementById("open-pomodoro-btn");
  var pomodoroContainer = document.getElementById("pomodoro-container");
  pomodoroButton.addEventListener("click", function () {
    if (pomodoroContainer.classList.contains("hide")) {
      pomodoroContainer.classList.remove("hide");
    } else {
      pomodoroContainer.classList.add("hide");
    }
  });
}

showHidePomodoro();

function addTask() {
  var taskInput = document.getElementById("task-input");
  var newTask = taskInput.value;
  taskList.unshift(newTask);
  taskInput.value = "";
  saveTasks(taskList);
}

function buildTaskHtml(item) {
  return "\n  <span value=\"".concat(item, "\">\n  <input type=\"checkbox\" id=\"checkbox\" value=\"").concat(item, "\"></input>\n  <input id=\"current-task\" value=\"").concat(item, "\" class=\"input-text\" readonly/>\n  </span>\n  ");
}

function render() {
  var taskContainer = document.getElementById("task-container");
  var getTasks = JSON.parse(localStorage.getItem("tasks"));
  taskContainer.innerHTML = "";

  if (getTasks) {
    taskList = getTasks;

    var _iterator = _createForOfIteratorHelper(taskList),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        taskContainer.innerHTML += buildTaskHtml(item);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  var currentTask = document.querySelectorAll("#current-task");
  var checkBox = document.querySelectorAll("#checkbox");

  var _iterator2 = _createForOfIteratorHelper(checkBox),
      _step2;

  try {
    var _loop = function _loop() {
      var boxes = _step2.value;
      var boxesId = boxes.getAttribute("value");

      var _iterator3 = _createForOfIteratorHelper(currentTask),
          _step3;

      try {
        var _loop2 = function _loop2() {
          var item = _step3.value;
          var currentTaskId = item.getAttribute("value");
          boxes.addEventListener("change", function () {
            if (boxesId === currentTaskId) {
              markAsDone(item);
            }
          });
        };

        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function markAsDone(item) {
  item.classList.toggle("done");
  var itemContainer = item.parentElement;
  var newData = data.filter(function (task) {
    return task !== item.value;
  });
  localStorage.setItem("tasks", JSON.stringify(newData));
  itemContainer.remove(item);
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
  render();
});

function saveTasks(listOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(listOfTasks));
} // * POMODORO


var modeButtons = document.querySelectorAll("button");
var pomodoroMinutesHtml = document.getElementById("pomodoro-minutes");
var pomodoroSecondsHtml = document.getElementById("pomodoro-seconds");
var pomodoroStats = document.getElementById("pomodoro-stats");
var completedIntervals = 0;

var _iterator4 = _createForOfIteratorHelper(modeButtons),
    _step4;

try {
  var _loop3 = function _loop3() {
    var mode = _step4.value;
    mode.addEventListener("click", function () {
      if (mode.id === "start-pomodoro") {
        startTimer();
      }
    });
  };

  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
    _loop3();
  }
} catch (err) {
  _iterator4.e(err);
} finally {
  _iterator4.f();
}

function startTimer() {
  var minutes = 0;
  var seconds = 5;
  var startTimer = setInterval(function () {
    pomodoroMinutesHtml.innerHTML = "".concat(minutes, ":");
    pomodoroSecondsHtml.innerHTML = "".concat(seconds).padStart(2, "0");
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
  var now = new Date();
  var expiration = new Date().setHours(0, 0, 0, 0);
  var savedData = localStorage.getItem("pomodoro intervals");

  if (now.getTime() === expiration) {
    localStorage.removeItem("pomodoro intervals");
  } else if (savedData) {
    completedIntervals = savedData;
  } else {
    completedIntervals = 0;
  }

  pomodoroStats.innerHTML = "\n    Karma ".concat(completedIntervals, " <i class=\"fa-solid fa-heart\"></i>\n    ");
}

loadInterval();
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50337" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map