!function(e){function r(e,r,t){e in i||(i[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return c[e]||(c[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,s=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var s=0;s<i.dependencies.length;++s)i.dependencies[s]===o&&i.setters[s](a)}return o.locked=!1,r},r.name);o.setters=s.setters,o.execute=s.execute;for(var l=0,d=r.normalizedDeps.length;d>l;l++){var f,p=r.normalizedDeps[l],v=i[p],m=c[p];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=u(p),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[l]&&o.setters[l](f)}}}function o(e){var r={};if("object"==typeof e||"function"==typeof e)if(l){var t;for(var n in e)(t=Object.getOwnPropertyDescriptor(e,n))&&f(r,n,t)}else{var o=e&&e.hasOwnProperty;for(var n in e)(!o||e.hasOwnProperty(n))&&(r[n]=e[n])}return r["default"]=e,f(r,"__useDefault",{value:!0}),r}function a(r,t){var n=i[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,l=n.normalizedDeps.length;l>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(i[d]?a(d,t):u(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function u(e){if(v[e])return v[e];if("@node/"==e.substr(0,6))return p(e.substr(6));var r=i[e];if(!r)throw"Module "+e+" not present.";return n(i[e]),a(e,[]),i[e]=void 0,r.declarative&&f(r.module.exports,"__esModule",{value:!0}),v[e]=r.declarative?r.module.exports:r.esModule}var i={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},l=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(d){l=!1}var f;!function(){try{Object.defineProperty({},"a",{})&&(f=Object.defineProperty)}catch(e){f=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var c={},p="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(e,t,n){return function(a){a(function(a){for(var i=0;i<t.length;i++)(function(e,r){r&&r.__esModule?v[e]=r:v[e]=o(r)})(t[i],arguments[i]);n({register:r});var s=u(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)u(e[i]);return s.__useDefault?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1","2","3","4","5","6"], [], function($__System) {

$__System.register("6", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      define(["require", "exports", 'es6-promise'], function(require, exports, es6_promise_1) {
        "use strict";
        var FrameLoader = (function() {
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
        exports.FrameLoader = FrameLoader;
      });
    }
  };
});

$__System.register("5", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      define(["require", "exports", 'es6-promise'], function(require, exports, es6_promise_1) {
        "use strict";
        var OidcClient = (function() {
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
        exports.OidcClient = OidcClient;
      });
    }
  };
});

$__System.register("4", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      define(["require", "exports"], function(require, exports) {
        "use strict";
        var Token = (function() {
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
        exports.Token = Token;
      });
    }
  };
});

$__System.register("3", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      define(["require", "exports", 'es6-promise', './FrameLoader', './Utils', './OidcClient', './Token'], function(require, exports, es6_promise_1, FrameLoader_1, Utils_1, OidcClient_1, Token_1) {
        "use strict";
        var TokenManager = (function() {
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
              return es6_promise_1.Promise.reject(err);
            });
          };
          TokenManager.prototype.redirectForLogout = function() {
            var _this = this;
            return this.oidcClient.createLogoutRequestAsync(this.id_token).then(function(url) {
              _this.removeToken();
              window.location = url;
            }).catch(function(err) {
              console.error("TokenManager.redirectForLogout error: " + (err && err.message || "Unknown error"));
              return es6_promise_1.Promise.reject(err);
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
              return es6_promise_1.Promise.reject(new Error("silent_redirect_uri not configured"));
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
              return new es6_promise_1.Promise(function(resolve, reject) {
                reject(Error("Already a pending popup token request."));
              });
            }
            var popup = window.open(settings.redirect_uri, popupSettings.target, popupSettings.features);
            if (!popup) {
              return new es6_promise_1.Promise(function(resolve, reject) {
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
            return new es6_promise_1.Promise(function(resolve, reject) {
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
        exports.TokenManager = TokenManager;
      });
    }
  };
});

$__System.register("2", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      define(["require", "exports"], function(require, exports) {
        "use strict";
        var Utils = (function() {
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
        exports.Utils = Utils;
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});