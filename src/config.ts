import { LogLevel } from '@anymind-ng/core';
import { VERSION } from '../generated_modules/version/version';
import { CommonConfig } from './common-config';

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

  // TODO delete this object name after removing AngularJS
  public static readonly inputsLength = {
    profileName: '150',
    profileDescription: '600',
    consultationName: '350',
    consultationMaxDescription: '600',
    consultationMinDescription: '16',
    profileNameMinlength: 3,
    profileNameMaxlength: 60
  };

  // TODO change this object name after removing AngularJS
  public static readonly inputsLengthNumbers = {
    profileNameMinLength: 3,
    profileNameMaxLength: 60,
    profileDescriptionMinLength: 15,
    profileDescriptionMaxLength: 600,
    consultationMinName: 3,
    consultationMaxName: 90,
    consultationMinDescription: 3,
    consultationMaxDescription: 600,

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
      environment: CommonConfig.getCommonConfig().environment,
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

  public static readonly imageSizeInBytes = {
    imageCropMaxSize: 3145728
  };

  public static readonly screenWidth = {
    mobile: 320,
    mobileLarge: 480,
    tablet: 768,
    desktop: 1024
  };

  public static readonly modalPreloaderDelay = {
    delayAfterRequest: 400
  };

  public static readonly keyboardCodes = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight:	39,
    arrowDown: 40,
    semicolon: 186,
    comma: 188,
    commaASCI: 44,
    dot: 190,
    dotASCI: 46,
    zero:	48,
    one: 49,
    two: 50,
    three: 51,
    four:	52,
    five:	53,
    six: 54,
    seven: 55,
    eight: 56,
    nine:	57
  };

  public static readonly polishVatTax = 0.23;

  public static readonly anyMindCommissions = {
    expert: 0.15,
    freelance: {
      expert: 0.2,
      company: 0.1
    }
  };

}
