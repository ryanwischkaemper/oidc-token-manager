(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.IdentityModel = global.IdentityModel || {})));
}(this, function (exports) { 'use strict';

  var _classCallCheck = (function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  })

  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };

  var FrameLoader = function () {
      function FrameLoader(url, configObj) {
          _classCallCheck(this, FrameLoader);

          this.url = url;
          this.config = configObj || {};
          this.config.cancelDelay = this.config.cancelDelay || 5000;
      }

      _createClass(FrameLoader, [{
          key: 'loadAsync',
          value: function loadAsync(url) {
              var _this = this;

              url = url || this.url;
              if (!url) return Promise.reject(new Error("no url provided"));
              return new Promise(function (resolve, reject) {
                  var frame = window.document.createElement('iframe');
                  frame.style.display = 'none';
                  var handle = window.setTimeout(cancel, _this.config.cancelDelay);
                  window.addEventListener("message", message, false);
                  window.document.body.appendChild(frame);
                  frame.src = url;
                  var cleanup = function cleanup() {
                      window.removeEventListener('message', message, false);
                      if (handle) window.clearTimeout(handle);
                      handle = null;
                      window.document.body.removeChild(frame);
                  };
                  var cancel = function cancel(e) {
                      cleanup();
                      reject();
                  };
                  var message = function message(e) {
                      if (handle && e.origin === location.protocol + "//" + location.host && e.source == frame.contentWindow) {
                          cleanup();
                          resolve(e.data);
                      }
                  };
              });
          }
      }]);

      return FrameLoader;
  }();

  var Utils = function () {
      function Utils() {
          _classCallCheck(this, Utils);
      }

      _createClass(Utils, null, [{
          key: "copy",
          value: function copy(obj, target) {
              target = target || {};
              for (var key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      target[key] = obj[key];
                  }
              }
              return target;
          }
      }]);

      return Utils;
  }();

  var OidcClient = function () {
      function OidcClient(settings) {
          _classCallCheck(this, OidcClient);
      }

      _createClass(OidcClient, [{
          key: "createTokenRequestAsync",
          value: function createTokenRequestAsync() {
              return Promise.resolve();
          }
      }, {
          key: "createLogoutRequestAsync",
          value: function createLogoutRequestAsync(idToken) {
              return Promise.resolve();
          }
      }, {
          key: "processResponseAsync",
          value: function processResponseAsync(queryString) {
              return Promise.resolve();
          }
      }], [{
          key: "parseOidcResult",
          value: function parseOidcResult(hash) {
              return hash;
          }
      }]);

      return OidcClient;
  }();

  var Token = function () {
      function Token(other) {
          _classCallCheck(this, Token);

          this.other = other;
          if (!this.other) this.expires_at = 0;
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

      _createClass(Token, [{
          key: 'toJSON',
          value: function toJSON() {
              return JSON.stringify({
                  profile: this.profile,
                  id_token: this.id_token,
                  access_token: this.access_token,
                  expires_at: this.expires_at,
                  scope: this.scopes.join(" "),
                  session_state: this.session_state
              });
          }
      }, {
          key: 'scopes',
          get: function get() {
              return (this.scope || '').split(' ');
          }
      }, {
          key: 'expired',
          get: function get() {
              var n = Date.now() / 1000;
              var now = parseInt(n.toString());
              return this.expires_at < now;
          }
      }, {
          key: 'expires_in',
          get: function get() {
              var n = Date.now() / 1000;
              var now = parseInt(n.toString());
              return this.expires_at - now;
          }
      }], [{
          key: 'fromResponse',
          value: function fromResponse(response) {
              if (response.access_token) {
                  var now = parseInt((Date.now() / 1000).toString());
                  response.expires_at = now + parseInt(response.expires_in);
              }
              return new Token(response);
          }
      }, {
          key: 'fromJSON',
          value: function fromJSON(json) {
              if (json) {
                  try {
                      var obj = JSON.parse(json);
                      return new Token(obj);
                  } catch (e) {}
              }
              return new Token(null);
          }
      }]);

      return Token;
  }();

  var OidcTokenManager = function () {
      function OidcTokenManager(settings) {
          var _this = this;

          _classCallCheck(this, OidcTokenManager);

          this._settings = settings || {};
          if (typeof this._settings.persist === 'undefined') {
              this._settings.persist = true;
          }
          this._settings.store = this._settings.store || window.localStorage;
          this._settings.persistKey = this._settings.persistKey || "TokenManager.token";
          this.oidcClient = new OidcClient(this._settings);
          this._callbacks = {
              tokenRemovedCallbacks: [],
              tokenExpiringCallbacks: [],
              tokenExpiredCallbacks: [],
              tokenObtainedCallbacks: [],
              silentTokenRenewFailedCallbacks: []
          };
          this.loadToken(this);
          if (this._settings.store instanceof window.localStorage.constructor) {
              window.addEventListener('storage', function (e) {
                  if (e.key === _this._settings.persistKey) {
                      _this.loadToken(_this);
                      if (_this._token) _this._callTokenObtained();else _this._callTokenRemoved();
                  }
              });
          }
          this.configureTokenExpired(this);
          this.configureAutoRenewToken(this);
          window.setTimeout(function () {
              _this.configureTokenExpiring(_this);
          }, 0);
      }

      _createClass(OidcTokenManager, [{
          key: 'configureTokenExpiring',
          value: function configureTokenExpiring(mgr) {
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
          }
      }, {
          key: 'configureAutoRenewToken',
          value: function configureAutoRenewToken(mgr) {
              if (mgr._settings.silent_redirect_uri && mgr._settings.silent_renew) {
                  mgr.addOnTokenExpiring(function () {
                      mgr.renewTokenSilentAsync().catch(function (e) {
                          mgr._callSilentTokenRenewFailed();
                          console.error(e && e.message || "Unknown error");
                      });
                  });
              }
          }
      }, {
          key: 'configureTokenExpired',
          value: function configureTokenExpired(mgr) {
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
                      // register 1 second beyond expiration so we don't get into edge conditions for expiration
                      setup(mgr.expires_in + 1);
                  }
              }
              configure();
              mgr.addOnTokenObtained(configure);
              mgr.addOnTokenRemoved(cancel);
          }
      }, {
          key: 'loadToken',
          value: function loadToken(mgr) {
              mgr._token = null;
              if (mgr._settings.persist) {
                  var tokenJson = mgr._settings.store.getItem(mgr._settings.persistKey);
                  if (tokenJson) {
                      var token = Token.fromJSON(tokenJson);
                      if (!token.expired) {
                          mgr._token = token;
                      }
                  }
              }
          }
      }, {
          key: '_callTokenRemoved',
          value: function _callTokenRemoved() {
              this._callbacks.tokenObtainedCallbacks.forEach(function (cb) {
                  return cb();
              });
          }
      }, {
          key: '_callTokenExpiring',
          value: function _callTokenExpiring() {
              this._callbacks.tokenExpiringCallbacks.forEach(function (cb) {
                  return cb();
              });
          }
      }, {
          key: '_callTokenExpired',
          value: function _callTokenExpired() {
              this._callbacks.tokenExpiredCallbacks.forEach(function (cb) {
                  return cb();
              });
          }
      }, {
          key: '_callTokenObtained',
          value: function _callTokenObtained() {
              this._callbacks.tokenObtainedCallbacks.forEach(function (cb) {
                  return cb();
              });
          }
      }, {
          key: '_callSilentTokenRenewFailed',
          value: function _callSilentTokenRenewFailed() {
              this._callbacks.silentTokenRenewFailedCallbacks.forEach(function (cb) {
                  return cb();
              });
          }
      }, {
          key: 'saveToken',
          value: function saveToken(token) {
              if (token && !(token instanceof Token)) token = Token.fromResponse(token);
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
          }
      }, {
          key: 'addOnTokenRemoved',
          value: function addOnTokenRemoved(cb) {
              this._callbacks.tokenRemovedCallbacks.push(cb);
          }
      }, {
          key: 'addOnTokenObtained',
          value: function addOnTokenObtained(cb) {
              this._callbacks.tokenObtainedCallbacks.push(cb);
          }
      }, {
          key: 'addOnTokenExpiring',
          value: function addOnTokenExpiring(cb) {
              this._callbacks.tokenRemovedCallbacks.push(cb);
          }
      }, {
          key: 'addOnTokenExpired',
          value: function addOnTokenExpired(cb) {
              this._callbacks.tokenExpiredCallbacks.push(cb);
          }
      }, {
          key: 'addOnSilentTokenRenewFailed',
          value: function addOnSilentTokenRenewFailed(cb) {
              this._callbacks.silentTokenRenewFailedCallbacks.push(cb);
          }
      }, {
          key: 'removeToken',
          value: function removeToken() {
              this.saveToken(null);
          }
      }, {
          key: 'redirectForToken',
          value: function redirectForToken() {
              return this.oidcClient.createTokenRequestAsync().then(function (request) {
                  window.location = request.url;
              }).catch(function (err) {
                  console.error("TokenManager.redirectForToken error: " + (err && err.message || "Unknown error"));
                  return Promise.reject(err);
              });
          }
      }, {
          key: 'redirectForLogout',
          value: function redirectForLogout() {
              var _this2 = this;

              return this.oidcClient.createLogoutRequestAsync(this.id_token).then(function (url) {
                  _this2.removeToken();
                  window.location = url;
              }).catch(function (err) {
                  console.error("TokenManager.redirectForLogout error: " + (err && err.message || "Unknown error"));
                  return Promise.reject(err);
              });
          }
      }, {
          key: 'processTokenCallbackAsync',
          value: function processTokenCallbackAsync(queryString) {
              var _this3 = this;

              return this.oidcClient.processResponseAsync(queryString).then(function (token) {
                  return _this3.saveToken(token);
              });
          }
      }, {
          key: 'renewTokenSilentAsync',
          value: function renewTokenSilentAsync() {
              var _this4 = this;

              if (!this._settings.silent_redirect_uri) return Promise.reject(new Error("silent_redirect_uri not configured"));
              var settings = Utils.copy(this._settings);
              settings.redirect_uri = settings.silent_redirect_uri;
              if (!settings.prompt) settings.prompt = 'none';
              var oidc = new OidcClient(settings);
              return oidc.createTokenRequestAsync().then(function (request) {
                  var frame = new FrameLoader(request.url, { cancelDelay: _this4._settings.silent_renew_timeout });
                  return frame.loadAsync().then(function (hash) {
                      return oidc.processResponseAsync(hash).then(function (token) {
                          return _this4.saveToken(token);
                      });
                  });
              });
          }
      }, {
          key: 'processTokenCallbackSilent',
          value: function processTokenCallbackSilent(hash) {
              if (window.parent && window !== window.parent) {
                  var hash = hash || window.location.hash;
                  if (hash) {
                      window.parent.postMessage(hash, location.protocol + "//" + location.host);
                  }
              }
          }
      }, {
          key: 'openPopupForTokenAsync',
          value: function openPopupForTokenAsync(popupSettings) {
              popupSettings = popupSettings || {};
              popupSettings.features = popupSettings.features || "location=no,toolbar=no";
              popupSettings.target = popupSettings.target || "_blank";
              var callback_prefix = "tokenmgr_callback_";
              // this is a shared callback
              if (!window['openPopupForTokenAsyncCallback']) {
                  window['openPopupForTokenAsyncCallback'] = function (hash) {
                      var result = OidcClient.parseOidcResult(hash);
                      if (result && result.state && window[callback_prefix + result.state]) {
                          window[callback_prefix + result.state](hash);
                      }
                  };
              }
              var mgr = this;
              var settings = Utils.copy(this._settings);
              settings.redirect_uri = settings.popup_redirect_uri || settings.redirect_uri;
              if (this._pendingPopup) {
                  return new Promise(function (resolve, reject) {
                      reject(Error("Already a pending popup token request."));
                  });
              }
              var popup = window.open(settings.redirect_uri, popupSettings.target, popupSettings.features);
              if (!popup) {
                  return new Promise(function (resolve, reject) {
                      reject(Error("Error opening popup."));
                  });
              }
              this._pendingPopup = true;
              var cleanup = function cleanup(name) {
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
              return new Promise(function (resolve, reject) {
                  reject_popup = reject;
                  var oidc = new OidcClient(settings);
                  oidc.createTokenRequestAsync().then(function (request) {
                      var callback_name = callback_prefix + request.request_state.state;
                      window[callback_name] = function (hash) {
                          cleanup(callback_name);
                          oidc.processResponseAsync(hash).then(function (token) {
                              mgr.saveToken(token);
                              resolve();
                          }).catch(function (err) {
                              return reject(err);
                          });
                      };
                      // give the popup 5 seconds to ready itself, otherwise fail
                      var seconds_to_wait = 5;
                      var interval = 500;
                      var total_times = seconds_to_wait * 1000 / interval;
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
                  }).catch(function (err) {
                      cleanup();
                      reject(err);
                  });
              });
          }
      }, {
          key: 'processTokenPopup',
          value: function processTokenPopup(hash) {
              hash = hash || window.location.hash;
              window['setUrl'] = function (url) {
                  window.location = url;
              };
              if (hash) {
                  window.opener['openPopupForTokenAsyncCallback'](hash);
              }
          }
      }, {
          key: 'profile',
          get: function get() {
              if (this._token) return this._token.profile;
          }
      }, {
          key: 'id_token',
          get: function get() {
              if (this._token) return this._token.id_token;
          }
      }, {
          key: 'access_token',
          get: function get() {
              if (this._token && !this._token.expired) return this._token.access_token;
          }
      }, {
          key: 'expired',
          get: function get() {
              return this._token ? this._token.expired : true;
          }
      }, {
          key: 'expires_in',
          get: function get() {
              return this._token ? this._token.expires_in : 0;
          }
      }, {
          key: 'expires_at',
          get: function get() {
              return this._token ? this._token.expires_at : 0;
          }
      }, {
          key: 'scope',
          get: function get() {
              return this._token && this._token.scope;
          }
      }, {
          key: 'scopes',
          get: function get() {
              return this._token ? [].concat(this._token.scopes) : [];
          }
      }, {
          key: 'session_state',
          get: function get() {
              if (this._token) return this._token.session_state;
          }
      }], [{
          key: 'setHttpRequest',
          value: function setHttpRequest(httpRequest) {
              if (typeof httpRequest !== 'object' || typeof httpRequest.getJSON !== 'function') {
                  throw Error('The provided value is not a valid http request.');
              }
              //TODO: _httpRequest was GLOBAL
              this._httpRequest = httpRequest;
          }
      }]);

      return OidcTokenManager;
  }();

  exports.OidcTokenManager = OidcTokenManager;

}));