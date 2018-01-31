export type CookiesKeyName = string;

export interface ICookiesService extends ng.cookies.ICookiesService {
  get(key: CookiesKeyName): string;
  getObject(key: CookiesKeyName): any;
  getObject<T>(key: CookiesKeyName): T;
  getAll(): any;
  put(key: CookiesKeyName, value: string, options?: ng.cookies.ICookiesOptions): void;
  putObject(key: CookiesKeyName, value: any, options?: ng.cookies.ICookiesOptions): void;
  remove(key: CookiesKeyName, options?: ng.cookies.ICookiesOptions): void;
}
