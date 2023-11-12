type Credential = { accessToken: string } | undefined;

export class AurastampAuth {
  private _credentials: Credential;

  constructor() {}

  get credentials() {
    return this._credentials;
  }

  async login(): Promise<void> {
    throw new Error('not implemented');
  }

  async revokeAccessToken(): Promise<void> {
    throw new Error('not implemented');
  }

  async refreshAccessToken(): Promise<string> {
    throw new Error('not implemented');
  }
}
