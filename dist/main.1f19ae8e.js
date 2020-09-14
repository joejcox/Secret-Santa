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
var stepOne = document.getElementById('step-one');
var stepTwo = document.getElementById('step-two');
var stepThree = document.getElementById('step-three');
var resultInfo = document.getElementById('result-info');
var peopleNum = document.getElementById('num-of-people');
var input = document.getElementById('input');
var list = document.getElementById('names-list');
var namesInDraw = document.getElementById('names-in-draw');
var select = document.getElementById('selection');
var clearAll = document.getElementById('clear');
var proceed = document.getElementById('continue');
var error = document.getElementById('error');
var add = document.getElementById('add');
var goBack = document.getElementById('go-back');
var roll = document.getElementById('roll');
var confirm = document.getElementById('confirm');
var result = document.querySelector('.result');
var err = document.getElementById('choice-error');
var names = [];
var namesCopy = []; // Add items to list when enter is pressed

window.addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});
select.addEventListener('change', function () {
  console.log("hi");

  if (select.selectedIndex !== 0) {
    err.classList.add('hide');
  }
}); // Add item to list when add button is clicked

add.addEventListener('click', addItem); // Clear all items in list

clearAll.addEventListener('click', clearList); // Continue on to the next step

proceed.addEventListener('click', function () {
  if (names.length < 3) {
    error.innerHTML = "Please add at least three names to the list before continuing!";
    error.classList.remove('hide');
  } else {
    stepOne.classList.add('hide');
    stepTwo.classList.remove('hide'); // Print out the names array

    namesInDraw.innerHTML = "<strong>The people in this draw are:</strong> <span class=\"names-span\">".concat(names.join(', '), ".</span>If these are incorrect, press the \"go back\" button to change your items.");
    var html = "<option>Choose your name</option>";

    for (var i = 0; i < names.length; i++) {
      html += "<option data-person=".concat(names[i], ">");
      html += names[i];
      html += "</option>";
      select.innerHTML = html;
    }

    namesCopy = names.slice();
    shuffle(names);
    shuffle(namesCopy);
    check(names, namesCopy); // console.log(`names: ${names.join(', ')}`);
    // console.log(`copy: ${namesCopy.join(', ')}`)
  }
});
goBack.addEventListener('click', function () {
  stepOne.classList.remove('hide');
  stepTwo.classList.add('hide');
});
var counter = 0;
roll.addEventListener('click', function () {
  counter++; // copy names array, shuffle both and check they are not the same values in each index

  var person = select.value;

  if (person !== "Choose your name") {
    var copyIndex = namesCopy.indexOf(person);
    var theName = names[copyIndex];
    result.innerHTML = theName;
    resultInfo.innerHTML = "Hi secret santa ".concat(person, ". Below is the person you have been assigned to buy for. Please press confirm once you are done so that nobody else sees who you have!");
    stepTwo.classList.add('hide');
    stepThree.classList.remove('hide');
    goBack.classList.add('hide');
    err.classList.add('hide');
  } else {
    err.classList.remove('hide');
    err.innerHTML = "<h2>Error: please pick a name</h2>";
    return;
  }
});
confirm.addEventListener('click', function () {
  if (counter === names.length) {
    stepThree.classList.add('hide');
    final.classList.remove('hide');
    confetti.start();
    return;
  }

  stepThree.classList.add('hide');
  stepTwo.classList.remove('hide');
  select[select.selectedIndex].classList.add('hide');
  select.selectedIndex = 0;
}); // Functions

function addItem() {
  if (input.value !== "") {
    names.push(input.value);
    clear();
    updateList();
  } else {
    error.classList.remove('hide');
    error.innerHTML = "Please enter a valid item. Field should not be blank.";
  }
}

function updateList() {
  var html = "";

  for (var i = 0; i < names.length; i++) {
    html += '<div class="column flex is-full"><div class="name">';
    html += names[i];
    html += '</div><div class="delete remove"><button class="danger">Delete</button></div></div>';
    list.innerHTML = html;
  }

  if (names.length > 0) {
    var remove = document.querySelectorAll('.remove');
    clearAll.classList.remove('hide');
    remove.forEach(function (item, i) {
      item.addEventListener('click', function () {
        if (names.length > 1) {
          names.splice(i, 1);
          updateList();
        } else {
          clearList();
        }
      }); // end event listener
    }); // end foreach
  }

  error.classList.add('hide');

  if (names.length === 1) {
    peopleNum.innerHTML = "<i class=\"fa fa-user\"></i>".concat(names.length);
  } else {
    peopleNum.innerHTML = "<i class=\"fa fa-user\"></i>".concat(names.length);
  }
} // end update list function


function clear() {
  input.value = "";
}

function clearList() {
  names = [];
  list.innerHTML = "";
  clearAll.classList.add('hide');
  updateList();
  namesInDraw.innerHTML = "";
} // Shuffle the names array


function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }

  return a;
} // Check that each index value is not equal in names array and names copy array


function check(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      shuffle(a);
      check(a, b);
    }
  }

  return names;
  return namesCopy;
} // function getRandomName() {
//     if (names.length === 1) {
//         return names[0];
//     }
//     let random;
//     let person = select.value;
//     do {
//         random = Math.floor(Math.random() * names.length);
//     } while (random === getRandomName.last || names[random] === person);
//     getRandomName.last = random;
//     return names[random];
// };
},{}],"C:/Users/Joe/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52672" + '/');

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
},{}]},{},["C:/Users/Joe/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map