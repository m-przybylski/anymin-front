// tslint:disable

const mock = () => {
  let storage = new Map<string, any>();

  return {
    getItem: (key: string) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key: string, value: any) => storage.set(key, value) || '',
    removeItem: (key: string) => storage.delete(key),
    clear: () => (storage = new Map<string, any>()),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: (): ReadonlyArray<string> => ['-webkit-appearance'],
});
