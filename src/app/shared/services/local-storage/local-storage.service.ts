// tslint:disable:no-empty
import { Injectable } from '@angular/core';

export type LocalStorageKeyName = 'invitation' | 'accepted-consultations';

@Injectable()
export class LocalStorageWrapperService {
  constructor() {}

  public setItem(key: LocalStorageKeyName, value: string): void {
    return localStorage.setItem(key, value);
  }

  public removeItem(key: LocalStorageKeyName): void {
    return localStorage.removeItem(key);
  }

  public getItem(key: LocalStorageKeyName): string | null {
    return localStorage.getItem(key);
  }
}
