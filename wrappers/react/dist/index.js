(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("uppload-react", [], factory);
	else if(typeof exports === 'object')
		exports["uppload-react"] = factory();
	else
		root["uppload-react"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const globalEvents = {};
let scope;

/**
 * Add a event for user's listener
 * @param {String} upploadEvent - Name of event
 * @param {Function} upploadFunction - Callback function
 * @param {Object} scopeElement - Parent Uppload object
 */
const addGlobalEvent = (upploadEvent, upploadFunction, scopeElement) => {
	if (!scope) scope = scopeElement;
	globalEvents[scope.meta.uniqueId] = globalEvents[scope.meta.uniqueId] || {};
	globalEvents[scope.meta.uniqueId][upploadEvent] = upploadFunction;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = addGlobalEvent;


/**
 * Initialization function for Instagram service
 * @param {Function} event - User's callback function
 * @param {String} value - Param value
 */
/* harmony default export */ __webpack_exports__["b"] = ((event, value) => {
	if (!scope) return;
	if (typeof globalEvents[scope.meta.uniqueId][event] === "function") {
		globalEvents[scope.meta.uniqueId][event](value);
	}
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(3);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);


/**
 * Upload selected or new file
 * @param {File} file - File object to upload
 * @param {Object} scope - Parent Uppload object
 * @returns {Promise}
 */
/* harmony default export */ __webpack_exports__["a"] = ((file, scope) => {
	if (!file) file = scope.meta.file;
	return new Promise((resolve, reject) => {
		const throwFileUploadError = error => {
			scope.showError(error);
			reject(error);
		};
		if (!file) {
			throwFileUploadError(scope.i18n.errors.no_file_selected);
			return;
		}
		if (!scope.isFileTypeAllowed(file)) {
			throwFileUploadError(scope.i18n.errors.file_type_not_allowed);
			return;
		}
		if (!scope.isFileSizeAllowed(file)) {
			throwFileUploadError(scope.i18n.errors.file_too_large.replace(/_FILESIZE_/g, bytesToSize(scope.settings.maxFileSize)));
			return;
		}
		scope.isUploading = true;
		scope.changePage("uploading");
		Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadStarted", file);
		setTimeout(() => {
			if (typeof scope.settings.uploadFunction === "function") {
				const fileType = file.type.split("/")[1] || null;
				scope.settings
					.uploadFunction(file, {
						name:
							(scope.meta.originalFileName ? scope.meta.originalFileName.split(".")[0] : "").toLowerCase() +
							"-" +
							[...Array(10)].map(() => Math.random().toString(36)[3]).join("") +
							"." +
							fileType,
						mime: file.type || null,
						type: fileType
					})
					.then(url => {
						scope.updateValue(url);
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", url);
						resolve(url);
					})
					.catch(error => {
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadError", error);
						reject(error);
					})
					.then(() => {
						scope.isUploading = false;
						scope.changePage("uploaded");
					});
			} else if (scope.settings.endpoint) {
				if (typeof scope.settings.endpoint === "string") {
					scope.settings.endpoint = {
						url: scope.settings.endpoint
					};
				}
				fetch(scope.settings.endpoint.url, {
					method: scope.settings.endpoint.method || "POST",
					body: file,
					headers: scope.settings.headers || null
				})
					.then(response => response.json())
					.then(url => {
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", url);
						resolve(url);
					})
					.catch(error => {
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileUploaded", error);
						reject(error);
					})
					.then(() => {
						scope.isUploading = false;
						scope.changePage("uploaded");
					});
			} else {
				const error = scope.i18n.errors.no_endpoint;
				scope.showError(error);
				reject(error);
			}
		}, scope.settings.minimumDelay || 0);
	});
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (dataURI => {
	const byteString = atob(dataURI.split(",")[1]);
	const mimeString = dataURI
		.split(",")[0]
		.split(":")[1]
		.split(";")[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ab], { type: mimeString });
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(10));

var _uppload = _interopRequireDefault(__webpack_require__(15));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

var UpploadReact =
/*#__PURE__*/
function (_React$Component) {
  function UpploadReact(props) {
    var _this;

    _classCallCheck(this, UpploadReact);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpploadReact).call(this, props));
    _this.Uppload = new _uppload.default(props.settings || {});

    _this.Uppload.on("fileUploaded", function (url) {
      if (typeof _this.props.onUpload === "function") {
        _this.props.onUpload(url);
      }
    });

    return _this;
  }

  _createClass(UpploadReact, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        onClick: function onClick(event) {
          _this2.Uppload.openModal();

          event.preventDefault();
        }
      }, this.props.children);
    }
  }]);

  _inherits(UpploadReact, _React$Component);

  return UpploadReact;
}(_react.default.Component);

window.UpploadReact = UpploadReact;
var _default = UpploadReact;
exports.default = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(11);
} else {
  module.exports = __webpack_require__(12);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.3.2
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var m=__webpack_require__(4),n=__webpack_require__(2),p=__webpack_require__(5),q=__webpack_require__(3),r="function"===typeof Symbol&&Symbol["for"],t=r?Symbol["for"]("react.element"):60103,u=r?Symbol["for"]("react.portal"):60106,v=r?Symbol["for"]("react.fragment"):60107,w=r?Symbol["for"]("react.strict_mode"):60108,x=r?Symbol["for"]("react.provider"):60109,y=r?Symbol["for"]("react.context"):60110,z=r?Symbol["for"]("react.async_mode"):60111,A=r?Symbol["for"]("react.forward_ref"):
60112,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b=arguments.length-1,e="http://reactjs.org/docs/error-decoder.html?invariant\x3d"+a,c=0;c<b;c++)e+="\x26args[]\x3d"+encodeURIComponent(arguments[c+1]);n(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};
function E(a,b,e){this.props=a;this.context=b;this.refs=p;this.updater=e||D}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?C("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=p;this.updater=e||D}var H=G.prototype=new F;
H.constructor=G;m(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J=Object.prototype.hasOwnProperty,K={key:!0,ref:!0,__self:!0,__source:!0};
function L(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)J.call(b,c)&&!K.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var k=Array(f),l=0;l<f;l++)k[l]=arguments[l+2];d.children=k}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:t,type:a,key:g,ref:h,props:d,_owner:I.current}}
function M(a){return"object"===typeof a&&null!==a&&a.$$typeof===t}function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var N=/\/+/g,O=[];function P(a,b,e,c){if(O.length){var d=O.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}function Q(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>O.length&&O.push(a)}
function R(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case t:case u:g=!0}}if(g)return e(c,a,""===b?"."+S(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+S(d,h);g+=R(d,f,e,c)}else if(null===a||"undefined"===typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),
h=0;!(d=a.next()).done;)d=d.value,f=b+S(d,h++),g+=R(d,f,e,c);else"object"===d&&(e=""+a,C("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function S(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function T(a,b){a.func.call(a.context,b,a.count++)}
function U(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,c,e,q.thatReturnsArgument):null!=a&&(M(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(N,"$\x26/")+"/")+e,a={$$typeof:t,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a))}function V(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(N,"$\x26/")+"/");b=P(b,g,c,d);null==a||R(a,"",U,b);Q(b)}
var W={Children:{map:function(a,b,e){if(null==a)return a;var c=[];V(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=P(null,null,b,e);null==a||R(a,"",T,b);Q(b)},count:function(a){return null==a?0:R(a,"",q.thatReturnsNull,null)},toArray:function(a){var b=[];V(a,b,null,q.thatReturnsArgument);return b},only:function(a){M(a)?void 0:C("143");return a}},createRef:function(){return{current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:y,
_calculateChangedBits:b,_defaultValue:a,_currentValue:a,_changedBits:0,Provider:null,Consumer:null};a.Provider={$$typeof:x,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:A,render:a}},Fragment:v,StrictMode:w,unstable_AsyncMode:z,createElement:L,cloneElement:function(a,b,e){null===a||void 0===a?C("267",a):void 0;var c=void 0,d=m({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=I.current);void 0!==b.key&&(g=""+b.key);var k=void 0;a.type&&a.type.defaultProps&&
(k=a.type.defaultProps);for(c in b)J.call(b,c)&&!K.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==k?k[c]:b[c])}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){k=Array(c);for(var l=0;l<c;l++)k[l]=arguments[l+2];d.children=k}return{$$typeof:t,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=L.bind(null,a);b.type=a;return b},isValidElement:M,version:"16.3.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:I,assign:m}},X=Object.freeze({default:W}),
Y=X&&W||X;module.exports=Y["default"]?Y["default"]:Y;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.3.2
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = __webpack_require__(4);
var invariant = __webpack_require__(2);
var emptyObject = __webpack_require__(5);
var warning = __webpack_require__(6);
var emptyFunction = __webpack_require__(3);
var checkPropTypes = __webpack_require__(13);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.3.2';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol['for']('react.strict_mode') : 0xeacc;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol['for']('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol['for']('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol['for']('react.async_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol['for']('react.forward_ref') : 0xead0;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

// Relying on the `invariant()` implementation lets us
// have preserve the format and params in the www builds.

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _defaultValue: defaultValue,
    _currentValue: defaultValue,
    _changedBits: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  context.Consumer = context;

  {
    context._currentRenderer = null;
  }

  return context;
}

function forwardRef(render) {
  {
    !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render) : void 0;
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'ReactFragment';
    case REACT_PORTAL_TYPE:
      return 'ReactPortal';
    case REACT_CALL_TYPE:
      return 'ReactCall';
    case REACT_RETURN_TYPE:
      return 'ReactReturn';
  }
  if (typeof type === 'object' && type !== null) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        var functionName = type.render.displayName || type.render.name || '';
        return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
    }
  }
  return null;
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var currentlyValidatingElement = void 0;
var propTypesMisspellWarningShown = void 0;

var getDisplayName = function () {};
var getStackAddendum = function () {};

{
  currentlyValidatingElement = null;

  propTypesMisspellWarningShown = false;

  getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (element.type === REACT_FRAGMENT_TYPE) {
      return 'React.Fragment';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  getStackAddendum = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame.getStackAddendum() || '';
    return stack;
  };
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
  }
  currentlyValidatingElement = null;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;
  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
    currentlyValidatingElement = null;
  } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    !componentClass.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  currentlyValidatingElement = fragment;

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
      break;
    }
  }

  if (fragment.ref !== null) {
    warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
  }

  currentlyValidatingElement = null;
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    info += getStackAddendum() || '';

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else {
      typeString = typeof type;
    }

    warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  }
};

{
  _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3['default'] ? React$3['default'] : React$3;

module.exports = react;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(14);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_dispatch__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_i18n_en__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_services__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uppload_scss__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uppload_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__uppload_scss__);






/*
 * Converts number of bytes to readable string
 * 10000 => "10 KB"
 * Source: https://stackoverflow.com/a/18650828
 */
const bytesToSize = (bytes, decimals) => {
	if (bytes == 0) return "0 bytes";
	let k = 1000,
		dm = decimals || 2,
		sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
		i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/*
 * Checks whether browsers supports video
 * without actually asking permission for it
 */
let webcamAvailable = false;
navigator.getMedia =
	navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
if (typeof navigator.getMedia === "function") {
	webcamAvailable = true;
}

/**
 * Returns whether current file type is allowed or not
 * @constructor
 * @param {string} author - The author of the book.
 */
class Uppload {
	constructor(settings) {
		/*
		 * Metadata containing unique ID (multiple instances)
		 * Also includes globals like files
		 */
		this.meta = {
			uniqueId: Math.random()
				.toString(36)
				.slice(2),
			file: null
		};

		// Set user preferences as `settings`
		this.settings = settings || {};

		// Internationalization of text
		this.i18n = this.settings.i18n || __WEBPACK_IMPORTED_MODULE_1__modules_i18n_en__["a" /* default */];

		// Stores boolean values if modal is open/uploading
		this.isOpen = false;
		this.isUploading = false;

		// Stores current image URL value
		this.value = null;

		// Current page you're on, fallback to default service or "upload"
		this.currentPage = this.settings.defaultService || "upload";

		// Array of services plugin should have, fallback default
		this.settings.services = this.settings.services || ["upload", "camera", "link", "instagram"];
		// Remove `camera` from the array if browser doesn't support it
		if (!webcamAvailable) {
			const index = this.settings.services.indexOf("camera");
			if (index > -1) {
				this.settings.services.splice(index, 1);
			}
		}

		// Array or string contains allowed file types, default "*" => all
		this.settings.allowedTypes = this.settings.allowedTypes || "*";

		// Object contains configuration for image cropping
		this.settings.crop = this.settings.crop || {};

		// Integer containing maximum file size, fallback to 100 MB
		this.settings.maxFileSize = parseInt(this.settings.maxFileSize) || "infinite";

		/**
		 * Returns whether current file type is allowed or not
		 * @param {File} file - File object containing selected file
		 * @returns {boolean}
		 */
		this.isFileTypeAllowed =
			this.settings.isFileTypeAllowed ||
			((file = this.meta.file) => {
				if (typeof this.settings.allowedTypes === "object" && this.settings.allowedTypes.length > 0) {
					if (this.settings.allowedTypes.includes(file.type)) {
						return true;
					}
				} else if (this.settings.allowedTypes === file.type) {
					return true;
				} else if (this.settings.allowedTypes === "*") {
					return true;
				} else {
					if (file.type.includes(`${this.settings.allowedTypes}/`)) {
						return true;
					}
				}
				return false;
			});

		/**
		 * Returns whether file size is in allowed range
		 * @param {File} file - File object containing selected file
		 * @returns {boolean}
		 */
		this.isFileSizeAllowed =
			this.settings.isFileSizeAllowed ||
			((file = this.meta.file) => {
				if (this.settings.maxFileSize === "infinite") {
					return true;
				} else if (this.settings.maxFileSize > file.size) {
					return true;
				}
				return false;
			});

		// Get all services
		this.services = Object(__WEBPACK_IMPORTED_MODULE_2__modules_services__["a" /* default */])(this);

		// Append modal to body
		this.backgroundElement = document.createElement("div");
		this.backgroundElement.classList.add("uppload-bg");
		document.body.appendChild(this.backgroundElement);

		this.modalElement = document.createElement("div");
		this.modalElement.classList.add("uppload-modal");
		this.modalElement.setAttribute("id", `uppload_${this.meta.uniqueId}`);
		this.modalElement.innerHTML = `
		<div>
			${this.services.navbar.html}
			<section>
				<div class="errorMessage"></div>
				<div class="currentPage"></div>
			</section>
		</div>
		`;
		document.body.appendChild(this.modalElement);
		const navbarChildren = document.querySelectorAll(`#uppload_${this.meta.uniqueId} .button_service`);
		for (let i = 0; i < navbarChildren.length; i++) {
			let currentChild = navbarChildren[i];
			currentChild.addEventListener("click", () => {
				this.changePage(currentChild.className.replace("button_service button_service_", ""));
			});
		}

		// Add keyboard and click events to close modal
		this.backgroundElement.addEventListener("click", this.closeModal.bind(this));
		window.addEventListener("keyup", event => {
			if (event.keyCode === 27 || event.which === 27 || event.key === "Escape" || event.code === "Escape") {
				this.backgroundElement.click();
			}
		});

		// Update default value of image
		if (this.settings.value) {
			this.updateValue(this.settings.value, 1);
		}

		// Add click event to button
		this.settings.call = this.settings.call || ["[data-uppload-button]"];
		for (let i = 0; i < this.settings.call.length; i++) {
			let $button = document.querySelectorAll(this.settings.call[i]);
			for (let j = 0; j < $button.length; j++) {
				$button[j].addEventListener("click", this.openModal.bind(this));
			}
		}
	}

	/**
	 * Shows error after selecting file
	 * @param {string} error - String for error text
	 */
	showError(error) {
		Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("fileError", error);
		const errorDiv = document.querySelector(`#uppload_${this.meta.uniqueId} .errorMessage`);
		errorDiv.style.display = "block";
		errorDiv.innerHTML = `<strong>${this.i18n.error}: </strong>${error}.`;
		setTimeout(() => {
			errorDiv.classList.add("visible");
		}, 1);
		setTimeout(() => {
			errorDiv.classList.remove("visible");
			const hideMe = () => {
				errorDiv.style.display = "none";
				errorDiv.removeEventListener("transitionend", hideMe);
			};
			errorDiv.addEventListener("transitionend", hideMe);
		}, this.settings.errorDelay || 3000);
	}

	/**
	 * Binds dispatch to user's callbacks
	 * @param {String} upploadEvent - Name of event listener
	 * @param {Function} upploadFunction - Function that receives callback
	 */
	on(upploadEvent, upploadFunction) {
		Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["a" /* addGlobalEvent */])(upploadEvent, upploadFunction, this);
	}

	/**
	 * Binds dispatch to user's callbacks
	 * @param {String} newValue - New URL value to update to
	 * @param {Number} initial - 1 or 0 to say whether it's the initial URL update
	 */
	updateValue(newValue, initial = 0) {
		const elements = this.settings.bind || ["[data-uppload-value]"];
		for (let i = 0; i < elements.length; i++) {
			let $element = document.querySelector(elements[i]);
			if ($element) {
				if ($element.tagName === "IMG") {
					$element.setAttribute("src", newValue);
				} else {
					$element.setAttribute("value", newValue);
				}
				$element.classList.add(`uppload-${initial === 0 ? "updated" : "initialized"}`);
			}
		}
		this.value = newValue;
		if (initial === 0) {
			setTimeout(() => {
				this.closeModal();
			}, this.settings.successDelay || 1500);
		}
	}

	/**
	 * Opens the modal
	 */
	openModal() {
		if (this.isOpen === true) return;
		this.changePage(this.currentPage);
		this.isOpen = true;
		Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("modalOpened");
		this.modalElement.classList.add("visible");
		this.backgroundElement.classList.add("visible");
		this.modalElement.classList.add("fadeIn");
		this.backgroundElement.classList.add("fadeIn");
		setTimeout(() => {
			this.modalElement.classList.remove("fadeIn");
			this.backgroundElement.classList.remove("fadeIn");
		}, 399);
	}

	/**
	 * Closes the modal
	 */
	closeModal() {
		if (this.isOpen === false) return;
		this.isOpen = false;
		Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("modalClosed");
		this.modalElement.classList.add("fadeOut");
		this.backgroundElement.classList.add("fadeOut");
		setTimeout(() => {
			this.modalElement.classList.remove("fadeOut");
			this.modalElement.classList.remove("visible");
			this.backgroundElement.classList.remove("fadeOut");
			this.backgroundElement.classList.remove("visible");
		}, 399);
	}

	/**
	 * Navigates to a new service/page
	 * @param {String} newPage - Name of the service to go to
	 */
	changePage(newPage) {
		if (window.globalStream && typeof window.globalStream.getTracks === "function") window.globalStream.getTracks()[0].stop();
		if (!this.services[newPage]) return;
		document.querySelector(`#uppload_${this.meta.uniqueId} .currentPage`).innerHTML = this.services[newPage].html;
		if (typeof this.services[newPage].init === "function") this.services[newPage].init();
		Object(__WEBPACK_IMPORTED_MODULE_0__modules_dispatch__["b" /* default */])("pageChanged", newPage);
		const navbarChildren = document.querySelectorAll(`#uppload_${this.meta.uniqueId} .button_service`);
		for (let i = 0; i < navbarChildren.length; i++) {
			navbarChildren[i].classList.remove("active");
		}
		const currentChild = document.querySelector(`#uppload_${this.meta.uniqueId} .button_service_${newPage}`);
		if (currentChild) {
			currentChild.classList.add("active");
		}
		const navbar = document.querySelector(`#uppload_${this.meta.uniqueId} aside`);
		if (newPage === "uploading" || newPage === "uploaded") {
			navbar.classList.add("hidden");
		} else {
			navbar.classList.remove("hidden");
		}
	}
}

window.Uppload = Uppload; // for CDN
/* harmony default export */ __webpack_exports__["default"] = (Uppload); // for ES6/CJS


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	uploading: "Uploading...",
	uploaded: "Uploaded",
	select_file: {
		drag_here: "Drag and drop here to upload",
		choose_file: "Choose a file",
		or: "or"
	},
	instagram: {
		post_url: "Instagram post URL",
		import: "Import from Instagram"
	},
	link: {
		post_url: "Link to file",
		import: "Import from URL"
	},
	preview: {
		back: "Back",
		continue: "Continue"
	},
	crop: {
		upload: "Crop &amp; upload"
	},
	camera: {
		click: "Click photo",
		permission: "Waiting for camera permission..."
	},
	error: "Error",
	errors: {
		no_endpoint: "No endpoint or upload function found",
		no_file_selected: "You have not selected a file",
		file_type_not_allowed: "This file type is not allowed",
		file_too_large: "File should be smaller than _FILESIZE_",
		instagram_no_fetch: "Unable to fetch this image from Instagram",
		video_unavailable: "Video stream not available",
		camera_error: "Unable to access camera"
	}
});
		

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_crop__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_preview__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_select_file__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_camera__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_microLinkFetch__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icons__ = __webpack_require__(24);







/**
 * Returns layouts for different services
 * @param {Object} scope - Parent Uppload object
 */
/* harmony default export */ __webpack_exports__["a"] = (scope => {
	const services = scope.settings.services;
	const i18n = scope.i18n;
	const serviceMetas = {
		preview: {
			html: `
				<div class="preview-container">
					<div class="preview">
						<img id="previewImage">
					</div>
					<div class="bottom-buttons">
						<div class="cta">
							<button class="primary-button secondary" id="backBtn">${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].back} &nbsp;${i18n.preview.back}</button>
							<button class="primary-button" id="continueBtn">${i18n.preview.continue} &nbsp;${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].forward}</button>
						</div>
					</div>
				</div>
            `,
			init() {
				Object(__WEBPACK_IMPORTED_MODULE_1__services_preview__["a" /* default */])(scope);
			}
		},
		crop: {
			html: `
				<div class="crop-container">
					<div class="preview">
						<div>
							<img id="previewImage" draggable="false">
						</div>
					</div>
					<div class="bottom-buttons">
						<div class="cta"><button class="primary-button" id="cropAndUploadBtn">${i18n.crop.upload}</button></div>
					</div>
				</div>
            `,
			init() {
				Object(__WEBPACK_IMPORTED_MODULE_0__services_crop__["a" /* default */])(scope);
			}
		},
		uploading: {
			html: `
                <div class="center-middle">
                    <div>${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].uploading}</div>
                    <div>${i18n.uploading}</div>
                </div>
            `
		},
		uploaded: {
			html: `
                <div class="center-middle">
                    <div>${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].uploaded}</div>
                    <div>${i18n.uploaded}</div>
                </div>
            `
		},
		upload: {
			title: "Upload file",
			icon: __WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].upload,
			html: `
                <div class="center-middle">
                    <div id="dragDropElement" class="mb-full">${i18n.select_file.drag_here}</div>
                    <p class="mb-full"><em>${i18n.select_file.or}</em></p>
                    <button id="selectFileBtn" class="primary-button">${i18n.select_file.choose_file}</button>
                    <input type="file" id="dragDropFileElt">
                </div>
            `,
			init() {
				Object(__WEBPACK_IMPORTED_MODULE_2__services_select_file__["a" /* default */])(scope);
			}
		},
		camera: {
			icon: `${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].camera}`,
			title: "Camera",
			html: `
				<div class="camera-container">
					<div class="preview">
						<div id="cameraPermission"><div>${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].error}</div><div>${i18n.camera.permission}</div></div>
						<div id="cameraError"><div>${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].error}</div><div>${i18n.errors.camera_error}</div></div>
						<video id="cameraVideo">${i18n.errors.video_unavailable}</video>
						<canvas id="cameraCanvas"></canvas>
					</div>
					<div class="bottom-buttons">
						<div class="cta"><button class="primary-button" id="clickButton">${__WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].camera} &nbsp;${i18n.camera.click}</button></div>
					</div>
				</div>
			`,
			init() {
				Object(__WEBPACK_IMPORTED_MODULE_3__services_camera__["a" /* default */])(scope);
			}
		},
		link: {
			icon: __WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].import,
			title: "Import from URL",
			html: `
                <div class="center-middle">
                    <label>
                        <div>${i18n.link.post_url}</div>
                        <input id="microLinkInput" type="text" value="https://www.w3schools.com/howto/img_paris.jpg" placeholder="https://www.w3schools.com/howto/img_paris.jpg">
                    </label>
                    <button id="microLinkButton" class="primary-button">${i18n.link.import}</button>
                </div>
            `,
			init() {
				Object(__WEBPACK_IMPORTED_MODULE_4__services_microLinkFetch__["a" /* default */])(scope, "link");
			}
		},
		instagram: {
			icon: __WEBPACK_IMPORTED_MODULE_5__icons__["a" /* default */].instagram,
			title: "Instagram",
			html: `
                <div class="center-middle">
                    <label>
                        <div>${i18n.instagram.post_url}</div>
                        <input id="microLinkInput" type="text" value="https://www.instagram.com/p/BeV6tOhFUor" placeholder="https://www.instagram.com/p/BeV6tOhFUor">
                    </label>
                    <button id="microLinkButton" class="primary-button instagram">${i18n.instagram.import}</button>
                </div>
            `,
			init() {
				Object(__WEBPACK_IMPORTED_MODULE_4__services_microLinkFetch__["a" /* default */])(scope, "instagram", true);
			}
		}
	};
	let navItems = ``;
	for (let i = 0; i < services.length; i++) {
		let currentService = serviceMetas[services[i]];
		if (currentService) {
			navItems += `
                <li class="button_service button_service_${services[i]}"><button>${currentService.icon || ""}${
				currentService.title
			}</button></li>
            `;
		}
	}
	serviceMetas.navbar = {
		html: `
            <aside>
                <nav>
                    <ul>
                        ${navItems}
                    </ul>
                </nav>
                <a class="uppload-branding" href="https://github.com/elninotech/uppload" target="_blank" rel="noopener noreferrer">Get Uppload</a>
            </aside>
        `
	};
	return serviceMetas;
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadFile__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dispatch__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dataUriToBlob__ = __webpack_require__(8);





const getImagePortion = (imgObj, newWidth, newHeight, startX, startY, ratio) => {
	const tnCanvas = document.createElement("canvas");
	const tnCanvasContext = tnCanvas.getContext("2d");
	tnCanvas.width = newWidth;
	tnCanvas.height = newHeight;
	const bufferCanvas = document.createElement("canvas");
	const bufferContext = bufferCanvas.getContext("2d");
	bufferCanvas.width = imgObj.width;
	bufferCanvas.height = imgObj.height;
	bufferContext.drawImage(imgObj, 0, 0);
	tnCanvasContext.drawImage(bufferCanvas, startX, startY, newWidth * ratio, newHeight * ratio, 0, 0, newWidth, newHeight);
	return tnCanvas.toDataURL();
};

let loaded = false;
/* harmony default export */ __webpack_exports__["a"] = (scope => {
	if (!loaded) {
		scope.changePage("uploading");
		Object(__WEBPACK_IMPORTED_MODULE_0__loadFile__["a" /* default */])("https://cdn.jsdelivr.net/npm/croppr@2.3.0/dist/croppr.min.js")
			.then(() => {
				loaded = true;
				scope.changePage("crop");
			})
			.catch(() => {
				Object(__WEBPACK_IMPORTED_MODULE_1__upload__["a" /* default */])(null, scope)
					.then(() => {})
					.catch(() => {});
			});
	} else {
		const file = scope.meta.file;
		if (!["image/png", "image/jpeg", "image/gif", "image/jpeg"].includes(file.type)) {
			scope.changePage("upload");
			scope.meta.file = file;
			Object(__WEBPACK_IMPORTED_MODULE_1__upload__["a" /* default */])(null, scope)
				.then(() => {})
				.catch(() => {});
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		scope.meta.originalFileName = file.name;
		reader.addEventListener("load", event => {
			const imageDataUri = event.target.result;
			if (imageDataUri) {
				const image = scope.modalElement.querySelector("#previewImage");
				image.setAttribute("src", imageDataUri);
				image.addEventListener("load", () => {
					image.style.display = "block";
					const cropInstance = new Croppr(scope.modalElement.querySelector("#previewImage"), {
						aspectRatio: scope.settings.crop.aspectRatio || null,
						maxSize: scope.settings.crop.maxSize || null,
						minSize: scope.settings.crop.minSize || null,
						onCropStart: data => {
							Object(__WEBPACK_IMPORTED_MODULE_2__dispatch__["b" /* default */])("cropStart", data);
						},
						onCropMove: data => {
							Object(__WEBPACK_IMPORTED_MODULE_2__dispatch__["b" /* default */])("cropMove", data);
						},
						onCropEnd: data => {
							Object(__WEBPACK_IMPORTED_MODULE_2__dispatch__["b" /* default */])("cropEnd", data);
						}
					});
					const cropperDiv = scope.modalElement.querySelector("#imageCropper");
					const button = scope.modalElement.querySelector("#cropAndUploadBtn");
					button.addEventListener("click", () => {
						const cropValues = cropInstance.getValue();
						const newImage = getImagePortion(image, cropValues.width, cropValues.height, cropValues.x, cropValues.y, 1);
						scope.meta.file = Object(__WEBPACK_IMPORTED_MODULE_3__dataUriToBlob__["a" /* default */])(newImage);
						Object(__WEBPACK_IMPORTED_MODULE_1__upload__["a" /* default */])(null, scope)
							.then(() => {})
							.catch(() => {});
					});
				});
			}
		});
	}
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (url => {
	return new Promise((resolve, reject) => {
		const file = document.createElement("script");
		file.src = url;
		file.addEventListener("load", () => {
			resolve();
		});
		file.addEventListener("error", () => {
			resolve();
		});
		(document.head || document.body).appendChild(file);
	});
});


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dataUriToBlob__ = __webpack_require__(8);


/* harmony default export */ __webpack_exports__["a"] = (scope => {
	const imageUrl = scope.imagePreview.image;
	const previousService = scope.imagePreview.previous;
	const imageElement = scope.modalElement.querySelector("#previewImage");
	imageElement.setAttribute("src", imageUrl);
	imageElement.addEventListener("load", () => {
		imageElement.style.display = "block";
	});
	const backBtn = scope.modalElement.querySelector("#backBtn");
	if (!previousService) {
		backBtn.style.display = "none";
	}
	backBtn.addEventListener("click", () => {
		scope.changePage(previousService);
	});
	scope.modalElement.querySelector("#continueBtn").addEventListener("click", () => {
		scope.meta.file = Object(__WEBPACK_IMPORTED_MODULE_0__dataUriToBlob__["a" /* default */])(imageUrl);
		scope.changePage("crop");
	});
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);


/**
 * Initialization function for select/drag-drop file service
 * @param {Object} scope - Parent Uppload object
 */
/* harmony default export */ __webpack_exports__["a"] = (scope => {
	const dropper = document.querySelector(`#uppload_${scope.meta.uniqueId} #dragDropElement`);
	const inputFile = document.querySelector(`#uppload_${scope.meta.uniqueId} #dragDropFileElt`);
	dropper.addEventListener("drop", event => {
		if (event.dataTransfer.items) {
			if (event.dataTransfer.items[0].kind === "file") {
				scope.meta.file = event.dataTransfer.items[0].getAsFile();
				Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileDropped", scope.meta.file);
				Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
				scope.changePage("crop");
			}
		} else {
			scope.meta.file = event.dataTransfer.files[0];
			Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileDropped", scope.meta.file);
			Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
			scope.changePage("crop");
		}
		event.preventDefault();
	});
	dropper.addEventListener("dragenter", event => {
		dropper.classList.add("active");
		Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("dragEnter");
		event.preventDefault();
	});
	dropper.addEventListener("dragleave", event => {
		dropper.classList.remove("active");
		Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("dragLeave");
		event.preventDefault();
	});
	dropper.addEventListener("dragover", event => {
		Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("dragOver");
		event.preventDefault();
	});
	dropper.addEventListener("click", event => {
		inputFile.click();
		event.preventDefault();
	});
	document.querySelector(`#uppload_${scope.meta.uniqueId} #selectFileBtn`).addEventListener("click", event => {
		inputFile.click();
		event.preventDefault();
	});
	inputFile.addEventListener("change", event => {
		scope.meta.file = inputFile.files[0];
		Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
		scope.changePage("crop");
	});
});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);


const stopStream = () => {
	setTimeout(() => {
		if (window.globalStream && typeof window.globalStream.getTracks === "function") window.globalStream.getTracks()[0].stop();
	}, 100);
}

/**
 * Initialization function for select/drag-drop file service
 * @param {Object} scope - Parent Uppload object
 */
/* harmony default export */ __webpack_exports__["a"] = (scope => {
	const previewWindow = scope.modalElement.querySelector(".camera-container .preview");
	let video = null;
	let canvas = null;
	let startbutton = null;
	let width = 0;
	let height = 0;
	video = scope.modalElement.querySelector("#cameraVideo");
	canvas = scope.modalElement.querySelector("#cameraCanvas");
	startbutton = scope.modalElement.querySelector("#clickButton");
	function startup() {
		let streaming = false;
		navigator.getMedia(
			{
				video: true,
				audio: false
			},
			function(stream) {
				window.globalStream = stream;
				video.style.display = "";
				canvas.style.display = "";
				scope.modalElement.querySelector("#cameraError").style.display = "none";
				scope.modalElement.querySelector("#cameraPermission").style.display = "none";
				if (navigator.mozGetUserMedia) {
					video.mozSrcObject = stream;
				} else {
					let vendorURL = window.URL || window.webkitURL;
					try {
						video.srcObject = stream;
					} catch (error) {
						video.src = vendorURL.createObjectURL(stream);
					}
				}
				video.play();
			},
			function(err) {
				video.style.display = "none";
				canvas.style.display = "none";
				scope.modalElement.querySelector("#cameraPermission").style.display = "none";
				scope.modalElement.querySelector("#cameraError").style.display = "block";
			}
		);
		video.addEventListener(
			"canplay",
			function(ev) {
				if (!streaming) {
					height = video.videoHeight / (video.videoWidth / width);
					if (isNaN(height)) {
						height = width / (4 / 3);
					}
					video.setAttribute("width", width);
					video.setAttribute("height", height);
					canvas.setAttribute("width", width);
					canvas.setAttribute("height", height);
					streaming = true;
				}
			},
			false
		);
		startbutton.addEventListener(
			"click",
			event => {
				clickImage();
				event.preventDefault();
			},
			false
		);
	}
	function clickImage() {
		const context = canvas.getContext("2d");
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
			context.drawImage(video, 0, 0, width, height);
			let data = canvas.toDataURL("image/png");
			scope.imagePreview = {
				previous: "camera",
				image: data
			};
			scope.changePage("preview");
		}
	}
	setTimeout(() => {
		width = previewWindow.offsetWidth;
		startup();
	}, 1);
});


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatch__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload__ = __webpack_require__(7);



/**
 * Initialization function for Microlink fetch service
 * Used for Instagram and others
 * @param {Object} scope - Parent Uppload object
 */
/* harmony default export */ __webpack_exports__["a"] = ((scope, serviceName, isMicroLink = false) => {
	const safeUploadFile = () => {
		Object(__WEBPACK_IMPORTED_MODULE_1__upload__["a" /* default */])(null, scope).catch(() => {});
	};
	const err = () => {
		scope.changePage(serviceName);
		const error = scope.i18n.errors[`${serviceName}_no_fetch`];
		scope.showError(error);
		Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("uploadError", error);
		scope.isUploading = false;
	};
	const buttonElt = document.querySelector(`#uppload_${scope.meta.uniqueId} #microLinkButton`);
	const inputElt = document.querySelector(`#uppload_${scope.meta.uniqueId} #microLinkInput`);
	buttonElt.addEventListener("click", event => {
		scope.changePage("uploading");
		scope.isUploading = true;
		setTimeout(() => {
			if (isMicroLink) {
				fetch(`https://api.microlink.io/?url=${encodeURIComponent(inputElt.value)}`)
					.then(response => response.json())
					.then(json => {
						if (json.status === "success") {
							if (json.data && json.data.image && json.data.image.url) {
								fetch(
									`${scope.settings.fileFetchEndpoint || "https://images.weserv.nl/"}?url=${encodeURIComponent(
										json.data.image.url.replace(/^https?\:\/\//i, "")
									)}`
								)
									.then(response => response.blob())
									.then(blob => {
										scope.meta.file = blob;
										Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
										scope.changePage("crop");
									})
									.catch(() => {
										err();
									});
							} else {
								err();
							}
						} else {
							err();
						}
					})
					.catch(error => {
						err();
					});
			} else {
				fetch(
					`${scope.settings.fileFetchEndpoint || "https://images.weserv.nl/"}?url=${encodeURIComponent(
						inputElt.value.replace(/^https?\:\/\//i, "")
					)}`
				)
					.then(response => response.blob())
					.then(blob => {
						scope.meta.file = blob;
						Object(__WEBPACK_IMPORTED_MODULE_0__dispatch__["b" /* default */])("fileSelected", scope.meta.file);
						scope.changePage("crop");
					})
					.catch(() => {
						err();
					});
			}
		}, scope.settings.minimumDelay || 0);
	});
	inputElt.addEventListener("keyup", event => {
		event.preventDefault();
		if (event.keyCode === 13) {
			buttonElt.click();
		}
	});
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	camera: `<svg class="svg-inline--fa fa-camera fa-w-16 fa-fw" aria-hidden="true" data-prefix="fas" data-icon="camera" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path></svg>`,
	upload: `<svg class="svg-inline--fa fa-upload fa-w-16 fa-fw" aria-hidden="true" data-prefix="fas" data-icon="upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>`,
	import: `<svg class="svg-inline--fa fa-link fa-w-16 fa-fw" aria-hidden="true" data-prefix="fas" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>`,
	instagram: `<svg class="svg-inline--fa fa-instagram fa-w-14 fa-fw" aria-hidden="true" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>`,
	back: `<svg class="svg-inline--fa fa-arrow-left fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>`,
	forward: `<svg class="svg-inline--fa fa-arrow-right fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>`,
	uploading: `<svg class="svg-inline--fa fa-spinner fa-w-16 fa-spin loading-spinner" aria-hidden="true" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>`,
	uploaded: `<svg class="svg-inline--fa fa-check fa-w-16 uploaded-icon" aria-hidden="true" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>`,
	error: `<svg aria-hidden="true" data-prefix="fas" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-exclamation-triangle fa-w-18 fa-2x"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" class=""></path></svg>`
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(26);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(28)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../css-loader/index.js!../sass-loader/lib/loader.js!./uppload.scss", function() {
		var newContent = require("!!../css-loader/index.js!../sass-loader/lib/loader.js!./uppload.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)(false);
// imports


// module
exports.push([module.i, ".uppload-bg {\n  position: fixed;\n  z-index: 10000;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background: rgba(150, 150, 150, 0.3); }\n\n.uppload-modal {\n  position: fixed;\n  color: #333;\n  background: #fff;\n  z-index: 11000;\n  box-sizing: border-box;\n  overflow: hidden;\n  border-radius: 0.25rem;\n  box-shadow: 0 30px 150px rgba(0, 0, 0, 0.2); }\n\n.uppload-modal,\n.uppload-bg {\n  display: none;\n  opacity: 0; }\n  .uppload-modal.visible,\n  .uppload-bg.visible {\n    opacity: 1;\n    display: block; }\n  .uppload-modal.fadeIn,\n  .uppload-bg.fadeIn {\n    animation: fadeIn 0.4s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards; }\n  .uppload-modal.fadeOut,\n  .uppload-bg.fadeOut {\n    animation: fadeOut 0.4s;\n    animation-iteration-count: 1;\n    animation-fill-mode: forwards; }\n  .uppload-modal.hidden,\n  .uppload-bg.hidden {\n    display: none; }\n\n@keyframes fadeOut {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n.uppload-bg::after {\n  z-index: 1;\n  cursor: pointer;\n  content: \"\\D7\";\n  font-family: sans-serif;\n  position: fixed;\n  font-size: 32px;\n  line-height: 0.5;\n  right: 2vw;\n  top: 2vw;\n  color: rgba(0, 0, 0, 0.5); }\n\n@media (min-width: 860px) {\n  .uppload-modal {\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 720px;\n    height: 500px; } }\n\n@media (min-width: 960px) {\n  .uppload-modal {\n    width: 800px; } }\n\n@media (max-height: 600px) {\n  .uppload-modal {\n    top: 10%;\n    transform: translate(-50%, 0%);\n    height: auto;\n    bottom: 10%; } }\n\n@media (max-width: 860px) {\n  .uppload-modal {\n    left: 0;\n    right: 0;\n    top: 10vh;\n    bottom: 0; }\n    .uppload-modal > div {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      display: flex;\n      flex-direction: column; }\n    .uppload-modal section {\n      flex: 1 0 0; } }\n\n.uppload-modal aside {\n  background-color: #dfe6e9;\n  transition: 1s; }\n  .uppload-modal aside.hidden {\n    opacity: 0.333; }\n  .uppload-modal aside nav ul {\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n    .uppload-modal aside nav ul li svg {\n      margin-right: 0.5rem;\n      opacity: 0.5;\n      transition: 0.3s; }\n    .uppload-modal aside nav ul li button {\n      text-align: left;\n      transition: 0.3s;\n      font: inherit;\n      background: none;\n      appearance: none;\n      border: none;\n      padding: 1rem;\n      border-radius: 0;\n      color: inherit; }\n      .uppload-modal aside nav ul li button:focus {\n        outline: none;\n        background-color: rgba(0, 0, 0, 0.075); }\n        .uppload-modal aside nav ul li button:focus svg {\n          opacity: 1; }\n    .uppload-modal aside nav ul li.active button {\n      background-color: #fff; }\n      .uppload-modal aside nav ul li.active button svg {\n        opacity: 1; }\n\n.uppload-modal section {\n  display: flex; }\n\n@media (min-width: 860px) {\n  .uppload-modal aside {\n    width: 200px;\n    position: absolute;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    overflow-y: auto;\n    padding-bottom: 2rem; }\n    .uppload-modal aside nav li button {\n      display: block;\n      width: 100%;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.075); }\n      .uppload-modal aside nav li button:hover {\n        background-color: rgba(0, 0, 0, 0.05); }\n  .uppload-modal section {\n    position: absolute;\n    right: 0;\n    left: 200px;\n    top: 0;\n    bottom: 0;\n    overflow-y: auto; } }\n\n.uppload-branding {\n  font-size: 80%;\n  color: rgba(0, 0, 0, 0.3);\n  text-decoration: none;\n  position: fixed;\n  bottom: 1rem;\n  left: 1rem; }\n  .uppload-branding:hover {\n    color: rgba(0, 0, 0, 0.5); }\n\n@media (max-width: 860px) {\n  .uppload-modal aside nav ul {\n    white-space: nowrap;\n    overflow-x: auto; }\n  .uppload-modal aside nav li {\n    display: inline-block; } }\n\nsvg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em; }\n\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em; }\n\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em; }\n\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em; }\n\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em; }\n\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em; }\n\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em; }\n\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em; }\n\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em; }\n\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em; }\n\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em; }\n\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em; }\n\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em; }\n\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em; }\n\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em; }\n\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em; }\n\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em; }\n\n.svg-inline--fa.fa-w-16 {\n  width: 1em; }\n\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em; }\n\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em; }\n\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em; }\n\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em; }\n\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto; }\n\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto; }\n\n.svg-inline--fa.fa-border {\n  height: 1.5em; }\n\n.svg-inline--fa.fa-li {\n  width: 2em; }\n\n.svg-inline--fa.fa-fw {\n  width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em; }\n\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n  transform-origin: center center; }\n\n.fa-layers-counter,\n.fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n  transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n  transform: scale(0.25);\n  -webkit-transform-origin: top right;\n  transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n  transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n  transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n  transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n  transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n  transform: scale(0.25);\n  -webkit-transform-origin: top right;\n  transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n  transform: scale(0.25);\n  -webkit-transform-origin: top left;\n  transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em; }\n\n.fa-xs {\n  font-size: 0.75em; }\n\n.fa-sm {\n  font-size: 0.875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n\n.fa-ul > li {\n  position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fab.fa-pull-left,\n.fal.fa-pull-left,\n.far.fa-pull-left,\n.fas.fa-pull-left {\n  margin-right: 0.3em; }\n\n.fa.fa-pull-right,\n.fab.fa-pull-right,\n.fal.fa-pull-right,\n.far.fa-pull-right,\n.fas.fa-pull-right {\n  margin-left: 0.3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n  transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n  transform: scale(1, -1); }\n\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n  transform: scale(-1, -1); }\n\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-rotate-90 {\n  -webkit-filter: none;\n  filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n\n.uppload-modal .primary-button.instagram {\n  background-color: #b53471; }\n  .uppload-modal .primary-button.instagram:hover {\n    background-color: #833471; }\n\n.uppload-modal .crop-container {\n  width: 100%;\n  display: flex;\n  flex-direction: column; }\n  .uppload-modal .crop-container #imageCropper {\n    position: absolute;\n    background-color: rgba(255, 0, 0, 0.25);\n    width: 300px;\n    height: 200px;\n    left: 100px;\n    top: 100px;\n    cursor: move; }\n  .uppload-modal .crop-container .preview {\n    flex: 1 0 0;\n    padding: 1rem;\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    overflow: auto; }\n    .uppload-modal .crop-container .preview > div > img {\n      margin: auto; }\n    .uppload-modal .crop-container .preview .croppr-container {\n      text-align: center;\n      margin: auto; }\n  .uppload-modal .crop-container .bottom-buttons {\n    text-align: center; }\n    .uppload-modal .crop-container .bottom-buttons .toolbar {\n      background: #2c3e50; }\n      .uppload-modal .crop-container .bottom-buttons .toolbar button {\n        background: none;\n        color: #fff;\n        border-radius: none;\n        padding: 1rem; }\n    .uppload-modal .crop-container .bottom-buttons .cta {\n      padding: 0.5rem 0; }\n\n.uppload-modal img {\n  max-width: 100%; }\n\n.uppload-modal #previewImage {\n  display: none;\n  max-height: 500px; }\n\n.croppr-container * {\n  user-select: none;\n  box-sizing: border-box; }\n\n.croppr-container img {\n  vertical-align: middle;\n  max-width: 100%; }\n\n.croppr {\n  position: relative;\n  display: inline-block; }\n\n.croppr-overlay {\n  background: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  cursor: crosshair; }\n\n.croppr-region {\n  border: 1px dashed rgba(0, 0, 0, 0.5);\n  position: absolute;\n  z-index: 3;\n  cursor: move;\n  top: 0; }\n\n.croppr-imageClipped {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2;\n  pointer-events: none; }\n\n.croppr-handle {\n  border: 1px solid black;\n  background-color: white;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  z-index: 4;\n  top: 0; }\n\n.preview-container {\n  width: 100%;\n  display: flex;\n  flex-direction: column; }\n  .preview-container .preview {\n    flex: 1 0 0;\n    overflow-y: auto;\n    display: flex;\n    justify-content: center;\n    flex-direction: column; }\n    .preview-container .preview img {\n      margin: 0 auto; }\n  .preview-container .bottom-buttons {\n    padding: 0.5rem;\n    text-align: center; }\n\n.camera-container {\n  width: 100%;\n  display: flex;\n  flex-direction: column; }\n  .camera-container .preview {\n    flex: 1 0 0;\n    overflow-y: auto;\n    display: flex;\n    justify-content: center;\n    flex-direction: column; }\n    .camera-container .preview video {\n      margin: 0 auto; }\n  .camera-container .bottom-buttons {\n    padding: 0.5rem;\n    text-align: center; }\n  .camera-container #cameraCanvas,\n  .camera-container #cameraError {\n    display: none; }\n  .camera-container #cameraError,\n  .camera-container #cameraPermission {\n    text-align: center;\n    font-size: 125%; }\n    .camera-container #cameraError svg,\n    .camera-container #cameraPermission svg {\n      margin-bottom: 1rem; }\n      .camera-container #cameraError svg path,\n      .camera-container #cameraPermission svg path {\n        fill: #aaa; }\n\n.uppload-modal #dragDropElement {\n  border: 3px dashed #ddd;\n  padding: 5rem 0;\n  transition: 0.5s;\n  font-size: 125%; }\n  .uppload-modal #dragDropElement.active {\n    transform: scale(1.05);\n    background-color: whitesmoke; }\n\n.uppload-modal #dragDropFileElt {\n  display: none !important; }\n\n.uppload-modal .currentPage {\n  display: flex;\n  flex: 1 0 0; }\n\n.uppload-modal .center-middle {\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 5rem;\n  right: 5rem; }\n\n.uppload-modal .primary-button {\n  background-color: #00a8ff;\n  color: #fff;\n  border: none;\n  transition: 0.3s;\n  font: inherit;\n  font-size: 115%;\n  padding: 0.75rem 1.25rem;\n  border-radius: 0.25rem; }\n  .uppload-modal .primary-button:hover {\n    background-color: #0097e6; }\n  .uppload-modal .primary-button.secondary {\n    background-color: #95a5a6; }\n    .uppload-modal .primary-button.secondary:hover {\n      background-color: #7f8c8d; }\n\n.uppload-modal .uppload-modal p {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n  .uppload-modal .uppload-modal p:last-child {\n    margin-bottom: 0; }\n\n.uppload-modal .mb-full {\n  margin-bottom: 1.5rem !important; }\n\n.uppload-modal .loading-spinner,\n.uppload-modal .uploaded-icon {\n  color: #aaa;\n  font-size: 300%;\n  margin-bottom: 1.5rem; }\n\n.uppload-modal .uploaded-icon {\n  background-color: #2ed573;\n  color: #fff;\n  padding: 1rem;\n  border-radius: 100%; }\n\n.uppload-modal .errorMessage {\n  display: none;\n  color: rgba(255, 255, 255, 0.9);\n  background-color: #ff4757;\n  padding: 1rem;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  opacity: 0;\n  transition: 0.5s; }\n  .uppload-modal .errorMessage.visible {\n    opacity: 1; }\n\n.uppload-modal label {\n  font-size: 110%;\n  margin-bottom: 1.5rem; }\n  .uppload-modal label div {\n    margin-bottom: 1rem; }\n\n@media (max-width: 860px) {\n  .uppload-modal .errorMessage {\n    top: auto;\n    bottom: 0; }\n  .uppload-modal .center-middle {\n    left: 1.5rem;\n    right: 1.5rem; } }\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(29);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});