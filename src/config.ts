// tslint:disable:max-file-line-count

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
    zendeskAboutConsultation:
      'https://anymind.zendesk.com/hc/pl/articles/360002462272--Jaka-jest-r%C3%B3%C5%BCnica' +
      '-mi%C4%99dzy-konsultacj%C4%85-niezale%C5%BCn%C4%85-a-pracownicz%C4%85-',
    zendeskAllowMediaUrl:
      'https://anymind.zendesk.com/hc/pl/articles/115002692852-' +
      '-Moja-przegl%C4%85darka-nie-ma-dost%C4%99pu-do-kamery-i-mikrofonu-jak-to-naprawi%C4%87-',
    widgetSdk: `${window.location.origin}/sdk/widget-sdk.js`,
    widget: `${window.location.origin}/widget`,
    assignForClosedBeta: 'https://anymind.com/?modal=experts-form-T-PL',
    rendertronProduction: 'https://app.anymind.com/rendertron/render/',
    rendertronStage: 'https://stage.anymind.com/rendertron/render/',
    facebookShare: 'https://www.facebook.com/sharer/sharer.php?u=',
    linkedinShare: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.anymind.app',
    appStore: 'https://itunes.apple.com/us/app/anymind-konsultant/id1423610480?ls=1&mt=8',
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
    notifyButtonEnabled: false,
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
    url: new RegExp(
      '^(http://www.|https://www.|http://|https://)?[a-zA-Z0-9]' +
        '+([-.]{1}[a-zA-Z0-9]{1,63})*.[a-zA-Z]{2,5}(:[0-9]{1,5})?(/.*)?$',
    ),
    emailPattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+([\.]{1}[a-zA-Z]{2,6})+([\.]{1}[a-zA-Z]{2,6})?$/,
    smsCodePattern: /^[0-9]{4}$/,
    phonePattern: /^\+?\d+(\s\d+)*$/,
    passwordPattern: new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[ !"#$%&\'()*+,-./:;<=>?@[\\\\]^_`{|}~])).{8,64}$'.replace(
        /\\\\/g,
        '\\',
      ),
    ),
    expireDate: '^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$',
    postalCode: '^[0-9]{5}$',
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
  public static readonly animationContentHeightTimeDuration = 300;

  public static readonly avatarDimensions = {
    minHeight: 312,
    minWidth: 312,
  };

  public static readonly uploadFilesProperties = {
    maxSize: 30000000,
    minSize: 1,
  };

  public static readonly errorCodes = {
    badAuthCreds: 101,
    badLoginRequest: 200,
    msisdnVerificationTokenIncorrect: 343,
    cannotFindMsisdnToken: 322,
    tooManyPinCodeAttempts: 344,
    notAllowedToLogin: 108,
    invalidPassword: 101,
    invalidPasswordValidation: 200,
    tooManyPasswordChangeAttempts: 345,
    cannotFindToken: 331,
    smsSentTooRecently: 333,
    invalidMsisdn: 340,
    incorrectToken: 343,
    tokenAttemptsExceeded: 344,
    loginAttemptsExceeded: 345,
    notEnoughMoney: 400,
    onGoingCall: 405,
    unavailableExpert: 419,
    callYourself: 404,
    callPending: 401,
    ratelRestError: 406,
    recipientUnavailable: 418,
    creditCardUncharged: 471,
    pincodeSentTooRecently: 333,
    creditCardWrongDate: 467,
    creditCardExpired: 466,
    creditCardCVV: 468,
    creditCardUnknown: 472,
    noSuchPromoCode: 473,
    promoCodeExpired: 474,
    promoCodeRedeemed: 475,
  };

  public static readonly paymentCardDetails = {
    minMaxCardNumberLength: 16,
    minMaxLengthCodeCVC: 3,
  };

  public static readonly paymentCardPublicKeys = {
    productionKey:
      `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcLydHYupN/YAUgow6lmBY/FIJ` +
      `fVr1n9c7aFfNVk94hTLXqULjy3rQXy4eiBvh36F/yKnKIXZWZqTVr1iyz2vH4q3k` +
      `sk0GTI0U+e/cd8nLLzEPs3vBPec0ffnhnuq+D4X/rgRRHvhLDq/ZY8bphdFHu/Oj` +
      `U9lCaIGtthdqOAOBCwIDAQAB`,

    stageKey:
      `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEiHO2qNvAmsCww13H5baQtXqYjcZlYxnNq42rtGAI2fDB1iwl977LZ` +
      `aPu+JhL2wn23xFh0ZrVf+qQDje8V8s1w33evXxZwLXCDZ+n2ToIsFADphZuGN2qNzuGEMSsZmx1nqTNEFh/AvoUPAtCEn` +
      `C5E9gN/SG6xqhvfFcgAZ9VtwIDAQAB`,
  };
}
