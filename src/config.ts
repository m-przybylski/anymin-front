export class Config {

  public static readonly ratel = {
    reconnectInterval: 5000
  }

  public static readonly cookies = {
    cookieNotification: {
      key: 'cookie-notification',
      yearDelta: 99,
      month: 12
    }
  }

  public static readonly inputsMaxLength = {
    profileName: '150',
    profileDescription: '600',
    consultationName: '350',
    consultationDescription: '600'
  }

  public static readonly styles = {
    NAVBAR_HEIGHT: 80,
    DESKTOP_WINDOW_WIDTH: 1200
  }

  public static readonly isPlatformForExpert = true
}
