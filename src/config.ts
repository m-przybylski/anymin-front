import { LogLevel } from '@anymind-ng/core';
import { VERSION } from '../generated_modules/version/version';
import { CommonConfig } from '../generated_modules/common-config/common-config';

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

  public static readonly sentry = {
    url: 'https://d5b6e4ad5fa6423e8df0e2225cb79fa3@sentry.io/286340',
    enabledEnvironments: [
      'prod', 'demo'
    ],
    options: {
      release: VERSION.hash,
      environment: CommonConfig.settings.environment,
      extra: VERSION.version
    }
  };

  public static readonly googlePlayProfile = {
    url: 'https://play.google.com/apps/testing/com.anymind.app'
  };

  public static readonly assetsUrl = {
    images: '/assets/images',
    imagesTablet: '/assets/images/tablet',
    imagesSmallDesktop: '/assets/images/small_desktop',
    imagesDesktop: '/assets/images/desktop',
    icons: '/assets/images/profitelo_icons',
    iconsTablet: '/assets/images/profitelo_icons/tablet',
    iconsSmallDesktop: '/assets/images/profitelo_icons/small_desktop',
    iconsDesktop: '/assets/images/profitelo_icons/desktop'
  };
}
