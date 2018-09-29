import { LoggerFactory } from '@anymind-ng/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '../../../../config';
import { Logger } from '@platform/core/logger';
import { Injectable } from '@angular/core';

interface IOneSignal {
  isPushNotificationsEnabled(): Promise<boolean>;

  getUserId(): Promise<string>;

  // tslint:disable-next-line:no-any
  init(args: any): void;

  registerForPushNotifications(): void;

  on(eventName: 'subscriptionChange', cb: (enabled: boolean) => void): void;
}

@Injectable()
export class PushNotificationService extends Logger {
  private readonly oneSignal?: IOneSignal;

  constructor(private translate: TranslateService, loggerFactory: LoggerFactory) {
    super(loggerFactory);
    // tslint:disable-next-line:no-any
    this.oneSignal = (<any>window).OneSignal;
  }

  public init = (): void => {
    const conf = Config.oneSignal;
    if (this.oneSignal) {
      this.oneSignal.init({
        appId: conf.appId,
        autoRegister: conf.autoRegister,
        persistNotification: conf.persistNotification,
        notifyButton: {
          enable: conf.notifyButtonEnabled /* Required to use the Subscription Bell */,
          size: 'large' /* One of 'small', 'medium', or 'large' */,
          theme: 'default' /* One of 'default' (red-white) or 'inverse" (white-red) */,
          position: 'bottom-left' /* Either 'bottom-left' or 'bottom-right' */,
          offset: {
            bottom: '16px',
            left: '16px' /* Only applied if bottom-left */,
            right: '16px' /* Only applied if bottom-right */,
          },
          prenotify: conf.prenotify /* Show an icon with 1 unread message for first-time site visitors */,
          showCredit: conf.showOneSignalCredits /* Show the OneSignal logo */,
          text: {
            'tip.state.unsubscribed': this.translate.instant('PUSH.TIP.STATE.UNSUBSCRIBED'),
            'tip.state.subscribed': this.translate.instant('PUSH.TIP.STATE.SUBSCRIBED'),
            'tip.state.blocked': this.translate.instant('PUSH.TIP.STATE.BLOCKED'),
            'message.prenotify': this.translate.instant('PUSH.MESSAGE.PRENOTIFY'),
            'message.action.subscribed': this.translate.instant('PUSH.MESSAGE.ACTION.SUBSCRIBED'),
            'message.action.resubscribed': this.translate.instant('PUSH.MESSAGE.ACTION.RESUBSCRIBED'),
            'message.action.unsubscribed': this.translate.instant('PUSH.MESSAGE.ACTION.UNSUBSCRIBED'),
            'dialog.main.title': this.translate.instant('PUSH.DIALOG.MAIN.TITLE'),
            'dialog.main.button.subscribe': this.translate.instant('PUSH.DIALOG.MAIN.BUTTON.SUBSCRIBE'),
            'dialog.main.button.unsubscribe': this.translate.instant('PUSH.DIALOG.MAIN.BUTTON.UNSUBSCRIBE'),
            'dialog.blocked.title': this.translate.instant('PUSH.DIALOG.BLOCKED.TITLE'),
            'dialog.blocked.message': this.translate.instant('PUSH.DIALOG.BLOCKED.MESSAGE'),
          },
          colors: {
            // Customize the colors of the main button and dialog popup button
            'circle.background': 'rgb(138, 61, 255)',
            'circle.foreground': 'white',
            'badge.background': 'rgb(138, 61, 255)',
            'badge.foreground': 'white',
            'badge.bordercolor': 'white',
            'pulse.color': 'white',
            'dialog.button.background.hovering': 'rgb(77, 101, 113)',
            'dialog.button.background.active': 'rgb(70, 92, 103)',
            'dialog.button.background': 'rgb(84,110,123)',
            'dialog.button.foreground': 'white',
          },
        },
        welcomeNotification: {
          title: this.translate.instant('PUSH.WELCOME.TITLE'),
          message: this.translate.instant('PUSH.WELCOME.MESSAGE'),
          /* Leave commented for the notification to not open a window on Chrome and Firefox
          * (on Safari, it opens to your webpage) */
          // "url": ""
        },
      });
    } else {
      this.loggerService.error('OneSignal is unavailable while doing init');
    }
  };

  public getDeviceId = (): Promise<string> => {
    if (this.oneSignal) {
      return this.oneSignal.getUserId();
    } else {
      return Promise.reject('OneSignal is unavailable');
    }
  };

  public isPushNotificationsEnabled = (): Promise<boolean> => {
    if (this.oneSignal) {
      return this.oneSignal.isPushNotificationsEnabled();
    } else {
      return Promise.reject('OneSignal is unavailable');
    }
  };

  public registerForPushNotifications = (): void => {
    if (this.oneSignal) {
      this.oneSignal.registerForPushNotifications();
    } else {
      this.loggerService.error('OneSignal is unavailable');
    }
  };

  public onPushChange = (cb: (enabled: boolean) => void): void => {
    if (this.oneSignal) {
      this.oneSignal.on('subscriptionChange', cb);
    } else {
      this.loggerService.error('OneSignal is unavailable');
    }
  };
}
