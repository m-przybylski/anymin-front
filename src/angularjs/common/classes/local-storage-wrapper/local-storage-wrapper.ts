// tslint:disable:no-empty
export type LocalStorageKeyName = 'invitation' | 'accepted-consultations';

// tslint:disable:member-ordering
export class LocalStorageWrapper {

  public static $inject = [];

  constructor() {}

  public static setItem = (key: LocalStorageKeyName, value: string): void => localStorage.setItem(key, value);

  public static removeItem = (key: LocalStorageKeyName): void => localStorage.removeItem(key);

  public static getItem = (key: LocalStorageKeyName): string | null => localStorage.getItem(key);
}
