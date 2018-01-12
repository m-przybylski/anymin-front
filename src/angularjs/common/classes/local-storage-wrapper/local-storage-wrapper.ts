export type LocalStorageKeyName = 'invitation' | 'accepted-consultations'

export class LocalStorageWrapper {

  static $inject = [];

  constructor() {}

  public static setItem = (key: LocalStorageKeyName, value: string): void => localStorage.setItem(key, value)

  public static removeItem = (key: LocalStorageKeyName): void => localStorage.removeItem(key)

  public static getItem = (key: LocalStorageKeyName): string | null => localStorage.getItem(key)
}
