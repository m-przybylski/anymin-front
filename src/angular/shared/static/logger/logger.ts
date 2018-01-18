export class Logger {

  constructor() {
  }

  public static debug = (msg: any, ...args: any[]): void =>
    Logger.print(console.debug, msg, args);

  public static error = (msg: any, ...args: any[]): void =>
    Logger.print(console.error, msg, args);

  public static info = (msg: any, ...args: any[]): void =>
    Logger.print(console.info, msg, args);

  public static log = (msg: any, ...args: any[]): void =>
    Logger.print(console.log, msg, args);

  public static trace = (msg: any, ...args: any[]): void =>
    Logger.print(console.trace, msg, args);

  public static warn = (msg: any, ...args: any[]): void =>
    Logger.print(console.warn, msg, args);

  private static print = (fn: (msg: any, args?: any[]) => void, msg: any, args: any): void => {
    if (args && args.length > 0) {
      fn(msg, args);
    }
    else {
      fn(msg);
    }

  }
}
