import { AurastampAuth } from './aurastamp-auth';
import { AurastampImage } from './aurastamp-image';

export class Aurastamp {
  private aurastampAuth: AurastampAuth;
  private aurastampImage: AurastampImage;

  constructor({ serverUrl }: { serverUrl?: string }) {
    this.aurastampAuth = new AurastampAuth();
    this.aurastampImage = new AurastampImage({ serverUrl });
  }

  get auth() {
    return this.aurastampAuth;
  }

  get image() {
    return this.aurastampImage;
  }
}
