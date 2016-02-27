import {Promise} from 'es6-promise';
import {FrameLoader} from './FrameLoader';
import {Utils} from './Utils';
import {OidcClient} from './OidcClient';
import {Token} from './Token';


export class TokenManager {
  _settings: any;
  oidcClient: OidcClient;
  _callbacks: any;
  _token: Token;
  _pendingPopup: boolean;
  static _httpRequest: any;

  constructor(settings: any) {
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
      window.addEventListener('storage', (e) => {
        if (e.key === this._settings.persistKey) {
          this.loadToken(this);
          if (this._token) this._callTokenObtained();
          else this._callTokenRemoved();
        }
      })
    }

    this.configureTokenExpired(this);
    this.configureAutoRenewToken(this);
    window.setTimeout(() => {
      this.configureTokenExpiring(this);
    }, 0);

  }

  get profile(): any {
    if (this._token) return this._token.profile;
  }

  get id_token(): string {
    if (this._token) return this._token.id_token;
  }

  get access_token(): string {
    if (this._token && !this._token.expired)
      return this._token.access_token;
  }

  get expired(): boolean {
    return this._token ? this._token.expired : true;
  }

  get expires_in(): number {
    return this._token ? this._token.expires_in : 0;
  }

  get expires_at(): number {
    return this._token ? this._token.expires_at : 0;
  }

  get scope(): boolean {
    return this._token && this._token.scope;
  }

  get scopes(): Array<any> {
    return this._token ? [].concat(this._token.scopes) : [];
  }

  get session_state(): any {
    if (this._token) return this._token.session_state;
  }

  private configureTokenExpiring(mgr: TokenManager): void {
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
        }
        else {
          callback();
        }
      }
    }

    configure();

    mgr.addOnTokenObtained(configure);
    mgr.addOnTokenRemoved(cancel);
  }

  private configureAutoRenewToken(mgr: TokenManager): void {
    if (mgr._settings.silent_redirect_uri && mgr._settings.silent_renew) {

      mgr.addOnTokenExpiring(function() {
        mgr.renewTokenSilentAsync().catch(function(e) {
          mgr._callSilentTokenRenewFailed();
          console.error(e && e.message || "Unknown error");
        });
      });

    }
  }

  private configureTokenExpired(mgr: TokenManager): void {
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

  private loadToken(mgr: TokenManager): void {
    mgr._token = null;
    if (mgr._settings.persist) {
      let tokenJson = mgr._settings.store.getItem(mgr._settings.persistKey);
      if (tokenJson) {
        let token = Token.fromJSON(tokenJson);
        if (!token.expired) {
          mgr._token = token;
        }
      }
    }
  }

  static setHttpRequest(httpRequest: any): void {
    if ((typeof httpRequest !== 'object') || (typeof httpRequest.getJSON !== 'function')) {
      throw Error('The provided value is not a valid http request.');
    }

    //TODO: _httpRequest was GLOBAL
    this._httpRequest = httpRequest;
  }

  private _callTokenRemoved(): void {
    this._callbacks.tokenObtainedCallbacks.forEach(cb => cb());
  }

  private _callTokenExpiring(): void {
    this._callbacks.tokenExpiringCallbacks.forEach(cb => cb());
  }

  private _callTokenExpired(): void {
    this._callbacks.tokenExpiredCallbacks.forEach(cb => cb());
  }

  private _callTokenObtained(): void {
    this._callbacks.tokenObtainedCallbacks.forEach(cb => cb());
  }

  private _callSilentTokenRenewFailed(): void {
    this._callbacks.silentTokenRenewFailedCallbacks.forEach(cb => cb());
  }

  private saveToken(token: Token): void {
    if (token && !(token instanceof Token)) token = Token.fromResponse(token);

    this._token = token;
    if (this._settings.persist && !this.expired) {
      this._settings.store.setItem(this._settings.persistKey, token.toJSON());
    }
    else {
      this._settings.store.removeItem(this._settings.persistKey);
    }

    if (token) {
      this._callTokenObtained();
    }
    else {
      this._callTokenRemoved();
    }
  }

  private addOnTokenRemoved(cb: any): void {
    this._callbacks.tokenRemovedCallbacks.push(cb);
  }

  private addOnTokenObtained(cb: any): void {
    this._callbacks.tokenObtainedCallbacks.push(cb);
  }

  private addOnTokenExpiring(cb: any): void {
    this._callbacks.tokenRemovedCallbacks.push(cb);
  }

  private addOnTokenExpired(cb: any): void {
    this._callbacks.tokenExpiredCallbacks.push(cb);
  }

  private addOnSilentTokenRenewFailed(cb: any): void {
    this._callbacks.silentTokenRenewFailedCallbacks.push(cb);
  }

  private removeToken(): void { this.saveToken(null); }

  private redirectForToken(): Promise<any> {
    return this.oidcClient.createTokenRequestAsync().then((request) => {
      window.location = request.url;
    }).catch(err => {
      console.error("TokenManager.redirectForToken error: " + (err && err.message || "Unknown error"));
      return Promise.reject(err);
    });
  }

  private redirectForLogout(): Promise<any> {
    return this.oidcClient.createLogoutRequestAsync(this.id_token).then(url => {
      this.removeToken();
      window.location = url;
    }).catch(err => {
      console.error("TokenManager.redirectForLogout error: " + (err && err.message || "Unknown error"));
      return Promise.reject(err);
    });

  }

  private processTokenCallbackAsync(queryString: any): Promise<any> {
    return this.oidcClient.processResponseAsync(queryString).then(token => this.saveToken(token));
  }

  private renewTokenSilentAsync(): Promise<any> {
    if (!this._settings.silent_redirect_uri) return Promise.reject(new Error("silent_redirect_uri not configured"));

    let settings = Utils.copy(this._settings);
    settings.redirect_uri = settings.silent_redirect_uri;
    if (!settings.prompt) settings.prompt = 'none';

    let oidc = new OidcClient(settings);
    return oidc.createTokenRequestAsync().then(request => {
      let frame = new FrameLoader(request.url, { cancelDelay: this._settings.silent_renew_timeout });
      return frame.loadAsync().then(hash => {
        return oidc.processResponseAsync(hash).then(token => this.saveToken(token));
      });
    });
  }

  private processTokenCallbackSilent(hash: string): void {
    if (window.parent && window !== window.parent) {
      var hash = hash || window.location.hash;
      if (hash) {
        window.parent.postMessage(hash, location.protocol + "//" + location.host);
      }
    }
  }

  private openPopupForTokenAsync(popupSettings: any): Promise<any> {
    popupSettings = popupSettings || {};
    popupSettings.features = popupSettings.features || "location=no,toolbar=no";
    popupSettings.target = popupSettings.target || "_blank";

    const callback_prefix = "tokenmgr_callback_";

    // this is a shared callback
    if (!window['openPopupForTokenAsyncCallback']) {
      window['openPopupForTokenAsyncCallback'] = function(hash) {
        var result = OidcClient.parseOidcResult(hash);
        if (result && result.state && window[callback_prefix + result.state]) {
          window[callback_prefix + result.state](hash);
        }
      }
    }

    var mgr = this;
    var settings = Utils.copy(this._settings);
    settings.redirect_uri = settings.popup_redirect_uri || settings.redirect_uri;

    if (this._pendingPopup) {
      return new Promise((resolve, reject) => {
        reject(Error("Already a pending popup token request."));
      });
    }

    var popup = window.open(settings.redirect_uri, popupSettings.target, popupSettings.features);
    if (!popup) {
      return new Promise((resolve, reject) => {
        reject(Error("Error opening popup."));
      });
    }

    this._pendingPopup = true;

    let cleanup = (name?: any) => {
      if (handle) {
        window.clearInterval(handle);
      }
      popup.close();
      delete mgr._pendingPopup;
      if (name) {
        delete window[name];
      }
    }

    var reject_popup;

    function checkClosed() {
      if (!popup.window) {
        cleanup();
        reject_popup(Error("Popup closed"));
      }
    }
    var handle = window.setInterval(checkClosed, 1000);

    return new Promise((resolve, reject) => {
      reject_popup = reject;

      var oidc = new OidcClient(settings);
      oidc.createTokenRequestAsync().then(request => {

        var callback_name = callback_prefix + request.request_state.state;
        window[callback_name] = function(hash) {
          cleanup(callback_name);

          oidc.processResponseAsync(hash).then(token => {
            mgr.saveToken(token);
            resolve();
          }).catch(err => reject(err));
        };

        // give the popup 5 seconds to ready itself, otherwise fail
        var seconds_to_wait = 5;
        var interval = 500;
        var total_times = (seconds_to_wait * 1000) / interval;
        var count = 0;

        function redirectPopup() {
          if (popup['setUrl']) {
            popup['setUrl'](request.url);
          }
          else if (count < total_times) {
            count++;
            window.setTimeout(redirectPopup, interval);
          }
          else {
            cleanup(callback_name);
            reject(Error("Timeout error on popup"));
          }
        }
        redirectPopup();
      }).catch(err => {
        cleanup();
        reject(err);
      });


    });
  }

  private processTokenPopup(hash: any): void {
    hash = hash || window.location.hash;

    window['setUrl'] = function(url) {
      window.location = url;
    }

    if (hash) {
      window.opener['openPopupForTokenAsyncCallback'](hash);
    }
  }
}
