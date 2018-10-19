import { LoggerFactory } from '@anymind-ng/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '../../../../config';
import { Logger } from '@platform/core/logger';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Observer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

interface IOneSignal {
  isPushNotificationsEnabled(): Promise<boolean>;

  getUserId(): Promise<string>;

  // tslint:disable-next-line:no-any
  init(args: any): Promise<void>;

  registerForPushNotifications(): void;

  on(eventName: 'subscriptionChange', cb: (enabled: boolean) => void): void;
}

@Injectable()
export class PushNotificationService extends Logger {
  private readonly oneSignal$ = new ReplaySubject<IOneSignal>(1);

  constructor(private translate: TranslateService, loggerFactory: LoggerFactory) {
    super(loggerFactory);
  }

  public initialize(): void {
    this.initializeOneSignal()
      .then(oneSignal => {
        this.loggerService.debug('OneSignal initialized', oneSignal);
        this.oneSignal$.next(oneSignal);
        this.oneSignal$.complete();
      })
      .catch(err => {
        this.loggerService.warn('OneSignal init failed', err);
        this.oneSignal$.error(err);
        this.oneSignal$.complete();
      });
  }

  public getDeviceId(): Observable<string> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => oneSignal.getUserId()));
  }

  public isPushNotificationsEnabled(): Observable<boolean> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => oneSignal.isPushNotificationsEnabled()));
  }

  public registerForPushNotifications(): Observable<void> {
    return this.oneSignal$.pipe(map(oneSignal => oneSignal.registerForPushNotifications()));
  }

  public get pushChange$(): Observable<boolean> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => this.getPushChange(oneSignal)));
  }

  private getPushChange(oneSignal: IOneSignal): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) =>
      oneSignal.on('subscriptionChange', enabled => observer.next(enabled)),
    );
  }

  private initializeOneSignal(): Promise<IOneSignal> {
    /**
     * OneSignal might be blocked by browser extensions cusing initalization failures.
     */
    // tslint:disable-next-line:no-any
    const oneSignal = (<any>window).OneSignal;
    if (oneSignal) {
      const conf = Config.oneSignal;

      return oneSignal
        .init({
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
        })
        .then(() => oneSignal);
    } else {
      return Promise.reject('OneSignal is not present in the window, check if OneSignalSdk is loaded properly');
    }
  }
}
