import {Promise} from 'es6-promise';

export class OidcClient
{
  constructor(settings: any) { }

  createTokenRequestAsync(): Promise<any> {
    return Promise.resolve();
  }

  createLogoutRequestAsync(idToken: string): Promise<any> {
    return Promise.resolve();
  }

processResponseAsync(queryString:string): Promise<any> {
    return Promise.resolve();
  }
  static parseOidcResult(hash: any): any {
    return hash;
}
}

export interface IOidcClient {
  createTokenRequestAsync(): Promise<any>;
  createLogoutRequestAsync(idToken: string): Promise<any>;
  processResponseAsync(queryString: string): Promise<any>;
  parseOidcResult(hash: any): any;
}
