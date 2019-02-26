export class Config {
  public static readonly communicatorAlertTimeout = 3000;

  public static readonly filesUpload = {
    maxSize: 31457280,
    minSize: 1,
  };

  public static readonly keyboardCodes = {
    backspace: 'Backspace',
    tab: 'Tab',
    enter: 'Enter',
    escape: 'Escape',
    arrowLeft: 'ArrowLeft',
    arrowUp: 'ArrowUp',
    arrowRight: 'ArrowRight',
    arrowDown: 'ArrowDown',
    semicolon: ';',
    comma: ',',
    dot: '.',
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    plus: '+',
    minus: '-',
  };

  public static readonly meta = {
    twitterId: 'AnyMindApp',
    defaultName: 'AnyMind',
    defaultSecureImg: `/assets/images/meta/default-ogimage.png`,
  };

  public static readonly moneyDivider = 100;

  public readonly alerts = {
    timeout: 5000,
  };

  public readonly inputsMinLength = {
    msisdn: 9,
    pinNumber: 4,
  };

  public readonly timeouts = {
    buttonPending: 200,
  };

  public readonly resolutions = {
    mobile: 768,
    tablet: 992,
    desktop: 1200,
  };

  public readonly textareaHeight = {
    maxHeight: 150,
  };

  public readonly inputMasks = {
    phoneNumberMask: '000 000 000',
    zipCode: '00-000',
    vatNumber: 'SS-000-000-00-00',
    pinNumber: '0000',
    price: '00000',
    priceWithComa: '09,00',
  };

  public readonly assetsUrl = {
    images: '/assets/images',
    imagesTablet: '/assets/images/tablet',
    imagesSmallDesktop: '/assets/images/small_desktop',
    imagesDesktop: '/assets/images/desktop',
    icons: '/assets/images/profitelo_icons',
    iconsTablet: '/assets/images/profitelo_icons/tablet',
    iconsSmallDesktop: '/assets/images/profitelo_icons/small_desktop',
    iconsDesktop: '/assets/images/profitelo_icons/desktop',
  };

  public readonly validation = {
    password: {
      // password verification: one lower case, one upper case, digit or special character, length 8 - 64
      regex: /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[ !"#$%&\'()*+,-./:;<=>?@[\\\]^_`{|}~])).{8,64}$/,
    },
    email: {
      regex: new RegExp(
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[([0-9]{1,3}\\.){3}' +
          '[0-9]{1,3}])|(([a-zA-Z0-9][a-zA-Z\\-0-9]*[a-zA-Z0-9]\\.)+[a-zA-Z]{2,}))$',
      ),
    },
  };
}
