import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  private GENTLY_KEY_PREFIX: string;
  private gentlyStorage: Storage;
  constructor() {
    this.GENTLY_KEY_PREFIX = '@Gently:';
    this.gentlyStorage = window.sessionStorage;
  }
}
