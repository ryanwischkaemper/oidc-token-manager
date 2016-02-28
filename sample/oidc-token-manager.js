System.register("src/FrameLoader.ts", ["es6-promise"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var es6_promise_1;
  var FrameLoader;
  return {
    setters: [function(es6_promise_1_1) {
      es6_promise_1 = es6_promise_1_1;
    }],
    execute: function() {
      FrameLoader = (function() {
        function FrameLoader(url, configObj) {
          this.url = url;
          this.config = configObj || {};
          this.config.cancelDelay = this.config.cancelDelay || 5000;
        }
        FrameLoader.prototype.loadAsync = function(url) {
          var _this = this;
          url = url || this.url;
          if (!url)
            return es6_promise_1.Promise.reject(new Error("no url provided"));
          return new es6_promise_1.Promise(function(resolve, reject) {
            var frame = window.document.createElement('iframe');
            frame.style.display = 'none';
            var handle = window.setTimeout(cancel, _this.config.cancelDelay);
            window.addEventListener("message", message, false);
            window.document.body.appendChild(frame);
            frame.src = url;
            var cleanup = function() {
              window.removeEventListener('message', message, false);
              if (handle)
                window.clearTimeout(handle);
              handle = null;
              window.document.body.removeChild(frame);
            };
            var cancel = function(e) {
              cleanup();
              reject();
            };
            var message = function(e) {
              if (handle && e.origin === location.protocol + "//" + location.host && e.source == frame.contentWindow) {
                cleanup();
                resolve(e.data);
              }
            };
          });
        };
        return FrameLoader;
      }());
      exports_1("FrameLoader", FrameLoader);
    }
  };
});

System.register("src/Utils.ts", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Utils;
  return {
    setters: [],
    execute: function() {
      Utils = (function() {
        function Utils() {}
        Utils.copy = function(obj, target) {
          target = target || {};
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              target[key] = obj[key];
            }
          }
          return target;
        };
        return Utils;
      }());
      exports_1("Utils", Utils);
    }
  };
});

System.registerDynamic("npm:process@0.11.2/browser.js", [], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
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
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2.js", ["npm:process@0.11.2/browser.js"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = $__require('npm:process@0.11.2/browser.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index.js", ["process"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = System._nodeRequire ? process : $__require('process');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index');
  return module.exports;
});

System.registerDynamic("npm:es6-promise@3.1.2/dist/es6-promise.js", ["process"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  "format cjs";
  (function(process) {
    (function() {
      "use strict";
      function lib$es6$promise$utils$$objectOrFunction(x) {
        return typeof x === 'function' || (typeof x === 'object' && x !== null);
      }
      function lib$es6$promise$utils$$isFunction(x) {
        return typeof x === 'function';
      }
      function lib$es6$promise$utils$$isMaybeThenable(x) {
        return typeof x === 'object' && x !== null;
      }
      var lib$es6$promise$utils$$_isArray;
      if (!Array.isArray) {
        lib$es6$promise$utils$$_isArray = function(x) {
          return Object.prototype.toString.call(x) === '[object Array]';
        };
      } else {
        lib$es6$promise$utils$$_isArray = Array.isArray;
      }
      var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
      var lib$es6$promise$asap$$len = 0;
      var lib$es6$promise$asap$$vertxNext;
      var lib$es6$promise$asap$$customSchedulerFn;
      var lib$es6$promise$asap$$asap = function asap(callback, arg) {
        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
        lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
        lib$es6$promise$asap$$len += 2;
        if (lib$es6$promise$asap$$len === 2) {
          if (lib$es6$promise$asap$$customSchedulerFn) {
            lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
          } else {
            lib$es6$promise$asap$$scheduleFlush();
          }
        }
      };
      function lib$es6$promise$asap$$setScheduler(scheduleFn) {
        lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
      }
      function lib$es6$promise$asap$$setAsap(asapFn) {
        lib$es6$promise$asap$$asap = asapFn;
      }
      var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
      var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
      var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
      var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
      var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
      function lib$es6$promise$asap$$useNextTick() {
        return function() {
          process.nextTick(lib$es6$promise$asap$$flush);
        };
      }
      function lib$es6$promise$asap$$useVertxTimer() {
        return function() {
          lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
        };
      }
      function lib$es6$promise$asap$$useMutationObserver() {
        var iterations = 0;
        var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
        var node = document.createTextNode('');
        observer.observe(node, {characterData: true});
        return function() {
          node.data = (iterations = ++iterations % 2);
        };
      }
      function lib$es6$promise$asap$$useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = lib$es6$promise$asap$$flush;
        return function() {
          channel.port2.postMessage(0);
        };
      }
      function lib$es6$promise$asap$$useSetTimeout() {
        return function() {
          setTimeout(lib$es6$promise$asap$$flush, 1);
        };
      }
      var lib$es6$promise$asap$$queue = new Array(1000);
      function lib$es6$promise$asap$$flush() {
        for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) {
          var callback = lib$es6$promise$asap$$queue[i];
          var arg = lib$es6$promise$asap$$queue[i + 1];
          callback(arg);
          lib$es6$promise$asap$$queue[i] = undefined;
          lib$es6$promise$asap$$queue[i + 1] = undefined;
        }
        lib$es6$promise$asap$$len = 0;
      }
      function lib$es6$promise$asap$$attemptVertx() {
        try {
          var r = $__require;
          var vertx = r('vertx');
          lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
          return lib$es6$promise$asap$$useVertxTimer();
        } catch (e) {
          return lib$es6$promise$asap$$useSetTimeout();
        }
      }
      var lib$es6$promise$asap$$scheduleFlush;
      if (lib$es6$promise$asap$$isNode) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
      } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
      } else if (lib$es6$promise$asap$$isWorker) {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
      } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof $__require === 'function') {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
      } else {
        lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
      }
      function lib$es6$promise$then$$then(onFulfillment, onRejection) {
        var parent = this;
        var state = parent._state;
        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
          return this;
        }
        var child = new this.constructor(lib$es6$promise$$internal$$noop);
        var result = parent._result;
        if (state) {
          var callback = arguments[state - 1];
          lib$es6$promise$asap$$asap(function() {
            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }
        return child;
      }
      var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
      function lib$es6$promise$promise$resolve$$resolve(object) {
        var Constructor = this;
        if (object && typeof object === 'object' && object.constructor === Constructor) {
          return object;
        }
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        lib$es6$promise$$internal$$resolve(promise, object);
        return promise;
      }
      var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
      function lib$es6$promise$$internal$$noop() {}
      var lib$es6$promise$$internal$$PENDING = void 0;
      var lib$es6$promise$$internal$$FULFILLED = 1;
      var lib$es6$promise$$internal$$REJECTED = 2;
      var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
      function lib$es6$promise$$internal$$selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
      }
      function lib$es6$promise$$internal$$cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
      }
      function lib$es6$promise$$internal$$getThen(promise) {
        try {
          return promise.then;
        } catch (error) {
          lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
          return lib$es6$promise$$internal$$GET_THEN_ERROR;
        }
      }
      function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
        try {
          then.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
          return e;
        }
      }
      function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
        lib$es6$promise$asap$$asap(function(promise) {
          var sealed = false;
          var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
            if (sealed) {
              return;
            }
            sealed = true;
            if (thenable !== value) {
              lib$es6$promise$$internal$$resolve(promise, value);
            } else {
              lib$es6$promise$$internal$$fulfill(promise, value);
            }
          }, function(reason) {
            if (sealed) {
              return;
            }
            sealed = true;
            lib$es6$promise$$internal$$reject(promise, reason);
          }, 'Settle: ' + (promise._label || ' unknown promise'));
          if (!sealed && error) {
            sealed = true;
            lib$es6$promise$$internal$$reject(promise, error);
          }
        }, promise);
      }
      function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
        if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
          lib$es6$promise$$internal$$fulfill(promise, thenable._result);
        } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
          lib$es6$promise$$internal$$reject(promise, thenable._result);
        } else {
          lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
            lib$es6$promise$$internal$$resolve(promise, value);
          }, function(reason) {
            lib$es6$promise$$internal$$reject(promise, reason);
          });
        }
      }
      function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
        if (maybeThenable.constructor === promise.constructor && then === lib$es6$promise$then$$default && constructor.resolve === lib$es6$promise$promise$resolve$$default) {
          lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
        } else {
          if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
          } else if (then === undefined) {
            lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
          } else if (lib$es6$promise$utils$$isFunction(then)) {
            lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
          } else {
            lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
          }
        }
      }
      function lib$es6$promise$$internal$$resolve(promise, value) {
        if (promise === value) {
          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
        } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
          lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
        } else {
          lib$es6$promise$$internal$$fulfill(promise, value);
        }
      }
      function lib$es6$promise$$internal$$publishRejection(promise) {
        if (promise._onerror) {
          promise._onerror(promise._result);
        }
        lib$es6$promise$$internal$$publish(promise);
      }
      function lib$es6$promise$$internal$$fulfill(promise, value) {
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
          return;
        }
        promise._result = value;
        promise._state = lib$es6$promise$$internal$$FULFILLED;
        if (promise._subscribers.length !== 0) {
          lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
        }
      }
      function lib$es6$promise$$internal$$reject(promise, reason) {
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {
          return;
        }
        promise._state = lib$es6$promise$$internal$$REJECTED;
        promise._result = reason;
        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
      }
      function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
        var subscribers = parent._subscribers;
        var length = subscribers.length;
        parent._onerror = null;
        subscribers[length] = child;
        subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
        subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection;
        if (length === 0 && parent._state) {
          lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
        }
      }
      function lib$es6$promise$$internal$$publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;
        if (subscribers.length === 0) {
          return;
        }
        var child,
            callback,
            detail = promise._result;
        for (var i = 0; i < subscribers.length; i += 3) {
          child = subscribers[i];
          callback = subscribers[i + settled];
          if (child) {
            lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
          } else {
            callback(detail);
          }
        }
        promise._subscribers.length = 0;
      }
      function lib$es6$promise$$internal$$ErrorObject() {
        this.error = null;
      }
      var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
      function lib$es6$promise$$internal$$tryCatch(callback, detail) {
        try {
          return callback(detail);
        } catch (e) {
          lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
          return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
        }
      }
      function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
        var hasCallback = lib$es6$promise$utils$$isFunction(callback),
            value,
            error,
            succeeded,
            failed;
        if (hasCallback) {
          value = lib$es6$promise$$internal$$tryCatch(callback, detail);
          if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
            failed = true;
            error = value.error;
            value = null;
          } else {
            succeeded = true;
          }
          if (promise === value) {
            lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
            return;
          }
        } else {
          value = detail;
          succeeded = true;
        }
        if (promise._state !== lib$es6$promise$$internal$$PENDING) {} else if (hasCallback && succeeded) {
          lib$es6$promise$$internal$$resolve(promise, value);
        } else if (failed) {
          lib$es6$promise$$internal$$reject(promise, error);
        } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
          lib$es6$promise$$internal$$fulfill(promise, value);
        } else if (settled === lib$es6$promise$$internal$$REJECTED) {
          lib$es6$promise$$internal$$reject(promise, value);
        }
      }
      function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
        try {
          resolver(function resolvePromise(value) {
            lib$es6$promise$$internal$$resolve(promise, value);
          }, function rejectPromise(reason) {
            lib$es6$promise$$internal$$reject(promise, reason);
          });
        } catch (e) {
          lib$es6$promise$$internal$$reject(promise, e);
        }
      }
      function lib$es6$promise$promise$all$$all(entries) {
        return new lib$es6$promise$enumerator$$default(this, entries).promise;
      }
      var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
      function lib$es6$promise$promise$race$$race(entries) {
        var Constructor = this;
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        if (!lib$es6$promise$utils$$isArray(entries)) {
          lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
          return promise;
        }
        var length = entries.length;
        function onFulfillment(value) {
          lib$es6$promise$$internal$$resolve(promise, value);
        }
        function onRejection(reason) {
          lib$es6$promise$$internal$$reject(promise, reason);
        }
        for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
          lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
        }
        return promise;
      }
      var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
      function lib$es6$promise$promise$reject$$reject(reason) {
        var Constructor = this;
        var promise = new Constructor(lib$es6$promise$$internal$$noop);
        lib$es6$promise$$internal$$reject(promise, reason);
        return promise;
      }
      var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
      var lib$es6$promise$promise$$counter = 0;
      function lib$es6$promise$promise$$needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
      }
      function lib$es6$promise$promise$$needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }
      var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
      function lib$es6$promise$promise$$Promise(resolver) {
        this._id = lib$es6$promise$promise$$counter++;
        this._state = undefined;
        this._result = undefined;
        this._subscribers = [];
        if (lib$es6$promise$$internal$$noop !== resolver) {
          typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
          this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
        }
      }
      lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
      lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
      lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
      lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
      lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
      lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
      lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
      lib$es6$promise$promise$$Promise.prototype = {
        constructor: lib$es6$promise$promise$$Promise,
        then: lib$es6$promise$then$$default,
        'catch': function(onRejection) {
          return this.then(null, onRejection);
        }
      };
      var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
      function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor(lib$es6$promise$$internal$$noop);
        if (Array.isArray(input)) {
          this._input = input;
          this.length = input.length;
          this._remaining = input.length;
          this._result = new Array(this.length);
          if (this.length === 0) {
            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
          } else {
            this.length = this.length || 0;
            this._enumerate();
            if (this._remaining === 0) {
              lib$es6$promise$$internal$$fulfill(this.promise, this._result);
            }
          }
        } else {
          lib$es6$promise$$internal$$reject(this.promise, this._validationError());
        }
      }
      lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
        return new Error('Array Methods must be provided an Array');
      };
      lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
        var length = this.length;
        var input = this._input;
        for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
          this._eachEntry(input[i], i);
        }
      };
      lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
        var c = this._instanceConstructor;
        var resolve = c.resolve;
        if (resolve === lib$es6$promise$promise$resolve$$default) {
          var then = lib$es6$promise$$internal$$getThen(entry);
          if (then === lib$es6$promise$then$$default && entry._state !== lib$es6$promise$$internal$$PENDING) {
            this._settledAt(entry._state, i, entry._result);
          } else if (typeof then !== 'function') {
            this._remaining--;
            this._result[i] = entry;
          } else if (c === lib$es6$promise$promise$$default) {
            var promise = new c(lib$es6$promise$$internal$$noop);
            lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
            this._willSettleAt(promise, i);
          } else {
            this._willSettleAt(new c(function(resolve) {
              resolve(entry);
            }), i);
          }
        } else {
          this._willSettleAt(resolve(entry), i);
        }
      };
      lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
        var promise = this.promise;
        if (promise._state === lib$es6$promise$$internal$$PENDING) {
          this._remaining--;
          if (state === lib$es6$promise$$internal$$REJECTED) {
            lib$es6$promise$$internal$$reject(promise, value);
          } else {
            this._result[i] = value;
          }
        }
        if (this._remaining === 0) {
          lib$es6$promise$$internal$$fulfill(promise, this._result);
        }
      };
      lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
        var enumerator = this;
        lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
          enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
        }, function(reason) {
          enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
        });
      };
      function lib$es6$promise$polyfill$$polyfill() {
        var local;
        if (typeof global !== 'undefined') {
          local = global;
        } else if (typeof self !== 'undefined') {
          local = self;
        } else {
          try {
            local = Function('return this')();
          } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
          }
        }
        var P = local.Promise;
        if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
          return;
        }
        local.Promise = lib$es6$promise$promise$$default;
      }
      var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
      var lib$es6$promise$umd$$ES6Promise = {
        'Promise': lib$es6$promise$promise$$default,
        'polyfill': lib$es6$promise$polyfill$$default
      };
      if (typeof define === 'function' && define['amd']) {
        define(function() {
          return lib$es6$promise$umd$$ES6Promise;
        });
      } else if (typeof module !== 'undefined' && module['exports']) {
        module['exports'] = lib$es6$promise$umd$$ES6Promise;
      } else if (typeof this !== 'undefined') {
        this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
      }
      lib$es6$promise$polyfill$$default();
    }).call(this);
  })($__require('process'));
  return module.exports;
});

System.registerDynamic("npm:es6-promise@3.1.2.js", ["npm:es6-promise@3.1.2/dist/es6-promise.js"], true, function($__require, exports, module) {
  ;
  var define;
  var global = this;
  var GLOBAL = this;
  module.exports = $__require('npm:es6-promise@3.1.2/dist/es6-promise.js');
  return module.exports;
});

System.register("src/OidcClient.ts", ["es6-promise"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var es6_promise_1;
  var OidcClient;
  return {
    setters: [function(es6_promise_1_1) {
      es6_promise_1 = es6_promise_1_1;
    }],
    execute: function() {
      OidcClient = (function() {
        function OidcClient(settings) {}
        OidcClient.prototype.createTokenRequestAsync = function() {
          return es6_promise_1.Promise.resolve();
        };
        OidcClient.prototype.createLogoutRequestAsync = function(idToken) {
          return es6_promise_1.Promise.resolve();
        };
        OidcClient.prototype.processResponseAsync = function(queryString) {
          return es6_promise_1.Promise.resolve();
        };
        OidcClient.parseOidcResult = function(hash) {
          return hash;
        };
        return OidcClient;
      }());
      exports_1("OidcClient", OidcClient);
    }
  };
});

System.register("src/Token.ts", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Token;
  return {
    setters: [],
    execute: function() {
      Token = (function() {
        function Token(other) {
          this.other = other;
          if (!this.other)
            this.expires_at = 0;
          this.profile = other.profile;
          this.id_token = other.id_token;
          this.access_token = other.access_token;
          if (other.access_token) {
            this.expires_at = parseInt(other.expires_at);
          } else if (other.id_token) {
            this.expires_at = other.profile.exp;
          } else {
            throw Error("Either access_token or id_token required.");
          }
          this.scope = other.scope;
          this.session_state = other.session_state;
        }
        Object.defineProperty(Token.prototype, "scopes", {
          get: function() {
            return (this.scope || '').split(' ');
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Token.prototype, "expired", {
          get: function() {
            var n = Date.now() / 1000;
            var now = parseInt(n.toString());
            return this.expires_at < now;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Token.prototype, "expires_in", {
          get: function() {
            var n = Date.now() / 1000;
            var now = parseInt(n.toString());
            return this.expires_at - now;
          },
          enumerable: true,
          configurable: true
        });
        Token.fromResponse = function(response) {
          if (response.access_token) {
            var now = parseInt((Date.now() / 1000).toString());
            response.expires_at = now + parseInt(response.expires_in);
          }
          return new Token(response);
        };
        Token.fromJSON = function(json) {
          if (json) {
            try {
              var obj = JSON.parse(json);
              return new Token(obj);
            } catch (e) {}
          }
          return new Token(null);
        };
        Token.prototype.toJSON = function() {
          return JSON.stringify({
            profile: this.profile,
            id_token: this.id_token,
            access_token: this.access_token,
            expires_at: this.expires_at,
            scope: this.scopes.join(" "),
            session_state: this.session_state
          });
        };
        return Token;
      }());
      exports_1("Token", Token);
    }
  };
});

System.register("src/TokenManager.ts", ["es6-promise", "./FrameLoader", "./Utils", "./OidcClient", "./Token"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Promise,
      FrameLoader_1,
      Utils_1,
      OidcClient_1,
      Token_1;
  var TokenManager;
  return {
    setters: [function(Promise_1) {
      Promise = Promise_1;
    }, function(FrameLoader_1_1) {
      FrameLoader_1 = FrameLoader_1_1;
    }, function(Utils_1_1) {
      Utils_1 = Utils_1_1;
    }, function(OidcClient_1_1) {
      OidcClient_1 = OidcClient_1_1;
    }, function(Token_1_1) {
      Token_1 = Token_1_1;
    }],
    execute: function() {
      TokenManager = (function() {
        function TokenManager(settings) {
          var _this = this;
          this._settings = settings || {};
          if (typeof this._settings.persist === 'undefined') {
            this._settings.persist = true;
          }
          this._settings.store = this._settings.store || window.localStorage;
          this._settings.persistKey = this._settings.persistKey || "TokenManager.token";
          this.oidcClient = new OidcClient_1.OidcClient(this._settings);
          this._callbacks = {
            tokenRemovedCallbacks: [],
            tokenExpiringCallbacks: [],
            tokenExpiredCallbacks: [],
            tokenObtainedCallbacks: [],
            silentTokenRenewFailedCallbacks: []
          };
          this.loadToken(this);
          if (this._settings.store instanceof window.localStorage.constructor) {
            window.addEventListener('storage', function(e) {
              if (e.key === _this._settings.persistKey) {
                _this.loadToken(_this);
                if (_this._token)
                  _this._callTokenObtained();
                else
                  _this._callTokenRemoved();
              }
            });
          }
          this.configureTokenExpired(this);
          this.configureAutoRenewToken(this);
          window.setTimeout(function() {
            _this.configureTokenExpiring(_this);
          }, 0);
        }
        Object.defineProperty(TokenManager.prototype, "profile", {
          get: function() {
            if (this._token)
              return this._token.profile;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "id_token", {
          get: function() {
            if (this._token)
              return this._token.id_token;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "access_token", {
          get: function() {
            if (this._token && !this._token.expired)
              return this._token.access_token;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "expired", {
          get: function() {
            return this._token ? this._token.expired : true;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "expires_in", {
          get: function() {
            return this._token ? this._token.expires_in : 0;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "expires_at", {
          get: function() {
            return this._token ? this._token.expires_at : 0;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "scope", {
          get: function() {
            return this._token && this._token.scope;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "scopes", {
          get: function() {
            return this._token ? [].concat(this._token.scopes) : [];
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(TokenManager.prototype, "session_state", {
          get: function() {
            if (this._token)
              return this._token.session_state;
          },
          enumerable: true,
          configurable: true
        });
        TokenManager.prototype.configureTokenExpiring = function(mgr) {
          function callback() {
            handle = null;
            mgr._callTokenExpiring();
          }
          var handle = null;
          function cancel() {
            if (handle) {
              window.clearTimeout(handle);
              handle = null;
            }
          }
          function setup(duration) {
            handle = window.setTimeout(callback, duration * 1000);
          }
          function configure() {
            cancel();
            if (!mgr.expired) {
              var duration = mgr.expires_in;
              if (duration > 60) {
                setup(duration - 60);
              } else {
                callback();
              }
            }
          }
          configure();
          mgr.addOnTokenObtained(configure);
          mgr.addOnTokenRemoved(cancel);
        };
        TokenManager.prototype.configureAutoRenewToken = function(mgr) {
          if (mgr._settings.silent_redirect_uri && mgr._settings.silent_renew) {
            mgr.addOnTokenExpiring(function() {
              mgr.renewTokenSilentAsync().catch(function(e) {
                mgr._callSilentTokenRenewFailed();
                console.error(e && e.message || "Unknown error");
              });
            });
          }
        };
        TokenManager.prototype.configureTokenExpired = function(mgr) {
          function callback() {
            handle = null;
            if (mgr._token) {
              mgr.saveToken(null);
            }
            mgr._callTokenExpired();
          }
          var handle = null;
          function cancel() {
            if (handle) {
              window.clearTimeout(handle);
              handle = null;
            }
          }
          function setup(duration) {
            handle = window.setTimeout(callback, duration * 1000);
          }
          function configure() {
            cancel();
            if (mgr.expires_in > 0) {
              setup(mgr.expires_in + 1);
            }
          }
          configure();
          mgr.addOnTokenObtained(configure);
          mgr.addOnTokenRemoved(cancel);
        };
        TokenManager.prototype.loadToken = function(mgr) {
          mgr._token = null;
          if (mgr._settings.persist) {
            var tokenJson = mgr._settings.store.getItem(mgr._settings.persistKey);
            if (tokenJson) {
              var token = Token_1.Token.fromJSON(tokenJson);
              if (!token.expired) {
                mgr._token = token;
              }
            }
          }
        };
        TokenManager.setHttpRequest = function(httpRequest) {
          if ((typeof httpRequest !== 'object') || (typeof httpRequest.getJSON !== 'function')) {
            throw Error('The provided value is not a valid http request.');
          }
          this._httpRequest = httpRequest;
        };
        TokenManager.prototype._callTokenRemoved = function() {
          this._callbacks.tokenObtainedCallbacks.forEach(function(cb) {
            return cb();
          });
        };
        TokenManager.prototype._callTokenExpiring = function() {
          this._callbacks.tokenExpiringCallbacks.forEach(function(cb) {
            return cb();
          });
        };
        TokenManager.prototype._callTokenExpired = function() {
          this._callbacks.tokenExpiredCallbacks.forEach(function(cb) {
            return cb();
          });
        };
        TokenManager.prototype._callTokenObtained = function() {
          this._callbacks.tokenObtainedCallbacks.forEach(function(cb) {
            return cb();
          });
        };
        TokenManager.prototype._callSilentTokenRenewFailed = function() {
          this._callbacks.silentTokenRenewFailedCallbacks.forEach(function(cb) {
            return cb();
          });
        };
        TokenManager.prototype.saveToken = function(token) {
          if (token && !(token instanceof Token_1.Token))
            token = Token_1.Token.fromResponse(token);
          this._token = token;
          if (this._settings.persist && !this.expired) {
            this._settings.store.setItem(this._settings.persistKey, token.toJSON());
          } else {
            this._settings.store.removeItem(this._settings.persistKey);
          }
          if (token) {
            this._callTokenObtained();
          } else {
            this._callTokenRemoved();
          }
        };
        TokenManager.prototype.addOnTokenRemoved = function(cb) {
          this._callbacks.tokenRemovedCallbacks.push(cb);
        };
        TokenManager.prototype.addOnTokenObtained = function(cb) {
          this._callbacks.tokenObtainedCallbacks.push(cb);
        };
        TokenManager.prototype.addOnTokenExpiring = function(cb) {
          this._callbacks.tokenRemovedCallbacks.push(cb);
        };
        TokenManager.prototype.addOnTokenExpired = function(cb) {
          this._callbacks.tokenExpiredCallbacks.push(cb);
        };
        TokenManager.prototype.addOnSilentTokenRenewFailed = function(cb) {
          this._callbacks.silentTokenRenewFailedCallbacks.push(cb);
        };
        TokenManager.prototype.removeToken = function() {
          this.saveToken(null);
        };
        TokenManager.prototype.redirectForToken = function() {
          return this.oidcClient.createTokenRequestAsync().then(function(request) {
            window.location = request.url;
          }).catch(function(err) {
            console.error("TokenManager.redirectForToken error: " + (err && err.message || "Unknown error"));
            return Promise.reject(err);
          });
        };
        TokenManager.prototype.redirectForLogout = function() {
          var _this = this;
          return this.oidcClient.createLogoutRequestAsync(this.id_token).then(function(url) {
            _this.removeToken();
            window.location = url;
          }).catch(function(err) {
            console.error("TokenManager.redirectForLogout error: " + (err && err.message || "Unknown error"));
            return Promise.reject(err);
          });
        };
        TokenManager.prototype.processTokenCallbackAsync = function(queryString) {
          var _this = this;
          return this.oidcClient.processResponseAsync(queryString).then(function(token) {
            return _this.saveToken(token);
          });
        };
        TokenManager.prototype.renewTokenSilentAsync = function() {
          var _this = this;
          if (!this._settings.silent_redirect_uri)
            return Promise.reject(new Error("silent_redirect_uri not configured"));
          var settings = Utils_1.Utils.copy(this._settings);
          settings.redirect_uri = settings.silent_redirect_uri;
          if (!settings.prompt)
            settings.prompt = 'none';
          var oidc = new OidcClient_1.OidcClient(settings);
          return oidc.createTokenRequestAsync().then(function(request) {
            var frame = new FrameLoader_1.FrameLoader(request.url, {cancelDelay: _this._settings.silent_renew_timeout});
            return frame.loadAsync().then(function(hash) {
              return oidc.processResponseAsync(hash).then(function(token) {
                return _this.saveToken(token);
              });
            });
          });
        };
        TokenManager.prototype.processTokenCallbackSilent = function(hash) {
          if (window.parent && window !== window.parent) {
            var hash = hash || window.location.hash;
            if (hash) {
              window.parent.postMessage(hash, location.protocol + "//" + location.host);
            }
          }
        };
        TokenManager.prototype.openPopupForTokenAsync = function(popupSettings) {
          popupSettings = popupSettings || {};
          popupSettings.features = popupSettings.features || "location=no,toolbar=no";
          popupSettings.target = popupSettings.target || "_blank";
          var callback_prefix = "tokenmgr_callback_";
          if (!window['openPopupForTokenAsyncCallback']) {
            window['openPopupForTokenAsyncCallback'] = function(hash) {
              var result = OidcClient_1.OidcClient.parseOidcResult(hash);
              if (result && result.state && window[callback_prefix + result.state]) {
                window[callback_prefix + result.state](hash);
              }
            };
          }
          var mgr = this;
          var settings = Utils_1.Utils.copy(this._settings);
          settings.redirect_uri = settings.popup_redirect_uri || settings.redirect_uri;
          if (this._pendingPopup) {
            return new Promise(function(resolve, reject) {
              reject(Error("Already a pending popup token request."));
            });
          }
          var popup = window.open(settings.redirect_uri, popupSettings.target, popupSettings.features);
          if (!popup) {
            return new Promise(function(resolve, reject) {
              reject(Error("Error opening popup."));
            });
          }
          this._pendingPopup = true;
          var cleanup = function(name) {
            if (handle) {
              window.clearInterval(handle);
            }
            popup.close();
            delete mgr._pendingPopup;
            if (name) {
              delete window[name];
            }
          };
          var reject_popup;
          function checkClosed() {
            if (!popup.window) {
              cleanup();
              reject_popup(Error("Popup closed"));
            }
          }
          var handle = window.setInterval(checkClosed, 1000);
          return new Promise(function(resolve, reject) {
            reject_popup = reject;
            var oidc = new OidcClient_1.OidcClient(settings);
            oidc.createTokenRequestAsync().then(function(request) {
              var callback_name = callback_prefix + request.request_state.state;
              window[callback_name] = function(hash) {
                cleanup(callback_name);
                oidc.processResponseAsync(hash).then(function(token) {
                  mgr.saveToken(token);
                  resolve();
                }).catch(function(err) {
                  return reject(err);
                });
              };
              var seconds_to_wait = 5;
              var interval = 500;
              var total_times = (seconds_to_wait * 1000) / interval;
              var count = 0;
              function redirectPopup() {
                if (popup['setUrl']) {
                  popup['setUrl'](request.url);
                } else if (count < total_times) {
                  count++;
                  window.setTimeout(redirectPopup, interval);
                } else {
                  cleanup(callback_name);
                  reject(Error("Timeout error on popup"));
                }
              }
              redirectPopup();
            }).catch(function(err) {
              cleanup();
              reject(err);
            });
          });
        };
        TokenManager.prototype.processTokenPopup = function(hash) {
          hash = hash || window.location.hash;
          window['setUrl'] = function(url) {
            window.location = url;
          };
          if (hash) {
            window.opener['openPopupForTokenAsyncCallback'](hash);
          }
        };
        return TokenManager;
      }());
      exports_1("TokenManager", TokenManager);
    }
  };
});

System.register("src/index.ts", ["./TokenManager"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var TokenManager_1;
  return {
    setters: [function(TokenManager_1_1) {
      TokenManager_1 = TokenManager_1_1;
    }],
    execute: function() {
      exports_1("TokenManager", TokenManager_1.TokenManager);
    }
  };
});
