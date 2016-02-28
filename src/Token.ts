export class Token
{
  profile: any;
  id_token: any;
  access_token: any;
  expires_at: number;
  scope: any;
  session_state: any;

  constructor(private other: any) {
    if (!this.other) this.expires_at = 0;

    this.profile = other.profile;
    this.id_token = other.id_token;
      this.access_token = other.access_token;
      if (other.access_token) {
          this.expires_at = parseInt(other.expires_at);
      }
      else if (other.id_token) {
          this.expires_at = other.profile.exp;
      }
      else {
          throw Error("Either access_token or id_token required.");
      }
      this.scope = other.scope;
      this.session_state = other.session_state;
  }

  get scopes():any{
    return (this.scope || '').split(' ');
  }

  get expired(): boolean{
    let n = Date.now() / 1000;
    let now = parseInt(n.toString());
    return this.expires_at < now;
  }

  get expires_in(): number {
            let n = Date.now() / 1000;
    let now = parseInt(n.toString());
            return this.expires_at - now;
  }

  static fromResponse(response:any): Token {
    if (response.access_token) {
      let now = parseInt((Date.now() / 1000).toString());
      response.expires_at = now + parseInt(response.expires_in);
    }

    return new Token(response);
  }

  static fromJSON(json: any): Token {
    if (json) {
        try {
            var obj = JSON.parse(json);
            return new Token(obj);
        }
        catch (e) {
        }
    }
    return new Token(null);
  }

  toJSON(): string {
    return JSON.stringify({
        profile: this.profile,
        id_token: this.id_token,
        access_token: this.access_token,
        expires_at: this.expires_at,
        scope: this.scopes.join(" "),
        session_state: this.session_state
    });
  }
}
