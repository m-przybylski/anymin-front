import { LogLevel } from '@anymind-ng/core';

export class Config {

  public static readonly logLevel = LogLevel.DEBUG;

  public static readonly http = {
    apiHeader: 'X-Api-Key'
  };

  public static readonly communicator = {
    reconnectTimeout: 1000,
    maxSimultaneousCallsCount: 1
  };

  public static readonly backend = {
    websocketReconnectTimeout: 1000
  };

  public static readonly cookies = {
    cookieNotification: {
      key: 'cookie-notification',
      yearDelta: 99,
      month: 12
    }
  };

  public static readonly inputsMaxLength = {
    profileName: '150',
    profileDescription: '600',
    consultationName: '350',
    consultationDescription: '600'
  };

  public static readonly styles = {
    NAVBAR_HEIGHT: 80,
    DESKTOP_WINDOW_WIDTH: 1200
  };

  public static readonly isPlatformForExpert = true;

  public static readonly sentryUrl = 'https://d5b6e4ad5fa6423e8df0e2225cb79fa3@sentry.io/286340';
}
