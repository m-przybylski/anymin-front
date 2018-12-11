import { LogLevel } from '@anymind-ng/core';
import { VERSION } from '../generated_modules/version/version';
import { Environment, EnvironmentService } from './app/core/services/environment/environment.service';

export class Config {
  public static readonly logLevel = LogLevel.DEBUG;

  public static readonly http = {
    apiHeader: 'X-Api-Key',
  };

  public static readonly communicator = {
    reconnectTimeout: 1000,
  };

  public static readonly backend = {
    websocketReconnectTimeout: 1000,
  };

  public static readonly cookies = {
    cookieNotification: {
      key: 'cookie-notification',
      yearDelta: 99,
      month: 12,
    },
  };

  public static readonly localSettings = {
    countryCodes: ['+48'],
  };

  public static readonly links = {
    imageUrl: `${window.location.origin}/files/%s/download`,
    zendesk: 'https://anymind.zendesk.com/hc/pl/categories/115000117831-PANEL-KONSULTANTA',
    zendeskAllowMediaUrl:
      'https://anymind.zendesk.com/hc/pl/articles/115002692852-' +
      '-Moja-przegl%C4%85darka-nie-ma-dost%C4%99pu-do-kamery-i-mikrofonu-jak-to-naprawi%C4%87-',
    widgetSdk: `${window.location.origin}/sdk/widget-sdk.js`,
    widget: `${window.location.origin}/widget`,
    assignForClosedBeta: 'https://anymind.com/?modal=experts-form-T-PL',
  };

  // TODO delete this object name after removing AngularJS
  public static readonly inputsLength = {
    profileName: '150',
    profileDescription: '600',
    consultationName: '350',
    consultationMaxDescription: '600',
    consultationMinDescription: '16',
    profileNameMinlength: 3,
    profileNameMaxlength: 60,
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
    commentMaxLength: 600,
    commentMinLength: 3,
    callSummaryCommentMaxLength: 600,
    callSummaryCommentMinLength: 15,
    consultationInvitationsMaxCount: 100,
  };

  public static readonly styles = {
    NAVBAR_HEIGHT: 80,
    DESKTOP_WINDOW_WIDTH: 1200,
  };

  public static readonly isPlatformForExpert = true;

  public static readonly oneSignal = {
    appId:
      EnvironmentService.get() === Environment.PRODUCTION
        ? '028739eb-5e0d-41d6-8bd7-cb39a442dae3'
        : '90ce371c-12f1-4b4e-a0b2-01c8870eaf25',
    autoRegister: false,
    persistNotification: true,
    notifyButtonEnabled: true,
    notificationClickHandlerMatch: 'origin',
    notificationClickHandlerAction: 'focus',
    prenotify: true /* Show an icon with 1 unread message for first-time site visitors */,
    showOneSignalCredits: false /* Show the OneSignal logo */,
  };

  public static readonly sentry = {
    url: 'https://d5b6e4ad5fa6423e8df0e2225cb79fa3@sentry.io/286340',
    enabledEnvironments: [Environment.PRODUCTION],
    options: {
      release: VERSION.hash,
      environment: EnvironmentService.get(),
      extra: VERSION.version,
    },
  };

  public static readonly googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.anymind.app';
  public static readonly appStoreUrl = 'https://itunes.apple.com/us/app/anymind-konsultant/id1423610480?ls=1&mt=8';

  public static readonly assetsUrl = {
    images: '/assets/images',
    imagesTablet: '/assets/images/tablet',
    imagesSmallDesktop: '/assets/images/small_desktop',
    imagesDesktop: '/assets/images/desktop',
    icons: '/assets/images/profitelo_icons',
    iconsTablet: '/assets/images/profitelo_icons/tablet',
    iconsSmallDesktop: '/assets/images/profitelo_icons/small_desktop',
    iconsDesktop: '/assets/images/profitelo_icons/desktop',
    brokenImage: './assets/images/broken-image.svg',
  };

  public static readonly patterns = {
    emailPattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+([\.]{1}[a-zA-Z]{2,6})+([\.]{1}[a-zA-Z]{2,6})?$/,
    smsCodePattern: /^[0-9]{4}$/,
    phonePattern: /^\+?\d+(\s\d+)*$/,
    passwordPattern: new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[ !"#$%&\'()*+,-./:;<=>?@[\\\\]^_`{|}~])).{8,64}$'.replace(
        /\\\\/g,
        '\\',
      ),
    ),
  };

  public static readonly imageSizeInBytes = {
    imageCropMaxSize: 3145728,
  };

  public static readonly screenWidth = {
    mobile: 320,
    mobileLarge: 480,
    tablet: 768,
    desktop: 1024,
  };

  public static readonly modalPreloaderDelay = {
    delayAfterRequest: 600,
  };

  public static readonly keyboardCodes = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40,
    semicolon: 186,
    comma: 188,
    commaASCI: 44,
    dot: 190,
    dotASCI: 46,
    zero: 48,
    one: 49,
    two: 50,
    three: 51,
    four: 52,
    five: 53,
    six: 54,
    seven: 55,
    eight: 56,
    nine: 57,
    plus: 187,
    minus: 189,
    numericPlus: 107,
    numericMinus: 109,
  };

  public static readonly moneyDivider = 100;
  public static readonly contentLoaderDelayMilliseconds = 350;

  public static readonly consultationPriceValidationValues = {
    min: 50,
    max: 9900,
  };
}
