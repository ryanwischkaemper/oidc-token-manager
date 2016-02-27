import {Promise} from 'es6-promise';

export class FrameLoader
{
  config: any;

  constructor(private url: string, configObj: any) {
    this.config = configObj || {};
    this.config.cancelDelay = this.config.cancelDelay || 5000;
  }

  loadAsync(url?: string): Promise<any> {
    url = url || this.url;
    if (!url) return Promise.reject(new Error("no url provided"));

    return new Promise<any>((resolve, reject) => {
      let frame = window.document.createElement('iframe');
      frame.style.display = 'none';

      let handle = window.setTimeout(cancel, this.config.cancelDelay);
      window.addEventListener("message", message, false);
      window.document.body.appendChild(frame);
      frame.src = url;

      let cleanup = () => {
        window.removeEventListener('message', message, false);
        if (handle) window.clearTimeout(handle);
        handle = null;
        window.document.body.removeChild(frame);
      };

      var cancel = (e: any) => {
        cleanup();
        reject();
      };

      var message = (e: any) => {
        if (handle && e.origin === location.protocol + "//" + location.host && e.source == frame.contentWindow) {
          cleanup();
          resolve(e.data);
        }
      };
    });
  }
}
