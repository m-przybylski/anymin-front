import { LoggerFactory } from '@anymind-ng/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '../../../../config';
import { Logger } from '@platform/core/logger';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Observer, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GetSessionWithAccount } from '@anymind-ng/api';

/**
 * OneSignal web push SDK
 * https://documentation.onesignal.com/docs/web-push-sdk
 */
export enum NotificationPermission {
  default = 'default',
  granted = 'granted',
  denied = 'denied',
}
interface IOneSignal {
  isPushNotificationsEnabled(): Promise<boolean>;
  getNotificationPermission(): Promise<NotificationPermission>;
  showHttpPrompt(options?: { force: boolean }): void;
  getUserId(): Promise<string | null>;
  getSubscription(): Promise<boolean>;
  sendTag(key: string, value: string): Promise<{ [key: string]: string }>;
  setSubscription(isSubscribe: boolean): void;
  // tslint:disable-next-line:no-any
  init?(args: any): Promise<void>;
  registerForPushNotifications(): void;
  on(eventName: 'subscriptionChange', cb: (enabled: boolean) => void): void;
}

@Injectable()
export class PushNotificationService extends Logger {
  private readonly oneSignal$ = new ReplaySubject<IOneSignal>(1);

  constructor(private translate: TranslateService, loggerFactory: LoggerFactory) {
    super(loggerFactory.createLoggerService('PushNotificationService'));
  }

  public initialize(getSessionWithAccount: GetSessionWithAccount): void {
    this.initializeOneSignal()
      .then(oneSignal => {
        this.loggerService.debug('OneSignal initialized for device');
        this.oneSignal$.next(oneSignal);
        this.oneSignal$.complete();
        this.registerForPushNotifications(oneSignal, getSessionWithAccount);
      })
      .catch(err => {
        this.loggerService.warn('OneSignal init failed', err);
        this.oneSignal$.complete();
      });
  }

  public getDeviceId(): Observable<string | null> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => oneSignal.getUserId()));
  }

  public isPushNotificationsEnabled(): Observable<boolean> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => oneSignal.isPushNotificationsEnabled()));
  }

  public get pushChange$(): Observable<boolean> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => this.getPushChange(oneSignal)));
  }

  public getSubscription(): Observable<boolean> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => from(oneSignal.getSubscription())));
  }

  public getNotificationPermission(): Observable<NotificationPermission> {
    return this.oneSignal$.pipe(mergeMap(oneSignal => from(oneSignal.getNotificationPermission())));
  }

  public setSubscription(isSubscription: boolean): Observable<void> {
    return this.oneSignal$.pipe(
      map(oneSignal => {
        oneSignal.setSubscription(isSubscription);
      }),
    );
  }

  private registerForPushNotifications(oneSignal: IOneSignal, getSessionWithAccount: GetSessionWithAccount): void {
    if (!getSessionWithAccount.isExpert) {
      return;
    }
    oneSignal
      .getNotificationPermission()
      .then(permission => {
        if (permission === NotificationPermission.default) {
          oneSignal.showHttpPrompt();
        }

        if (permission === 'denied') {
          this.loggerService.warn('User does not want to receive notifications');
        }
      })
      .then(() => oneSignal.sendTag('accountId', getSessionWithAccount.account.id));
  }

  private getPushChange(oneSignal: IOneSignal): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) =>
      oneSignal.on('subscriptionChange', enabled => observer.next(enabled)),
    );
  }

  private initializeOneSignal(): Promise<IOneSignal> {
    /**
     * OneSignal might be blocked by browser extensions causing initialization failures.
     */
    // tslint:disable-next-line:no-any
    const oneSignal = (window as any).OneSignal;
    const conf = Config.oneSignal;
    // try-catch required since it crashes on some unsupported browsers ex. mobile safari 12
    try {
      return oneSignal
        .init({
          appId: conf.appId,
          autoRegister: conf.autoRegister,
          persistNotification: conf.persistNotification,
          notificationClickHandlerMatch: conf.notificationClickHandlerMatch,
          notificationClickHandlerAction: conf.notificationClickHandlerAction,
          notifyButton: {
            enable: false,
          },
          promptOptions: {
            actionMessage: this.translate.instant('PUSH.PERMISSIONS.QUESTION'),
            acceptButtonText: this.translate.instant('PUSH.PERMISSIONS.ACCEPT'),
            cancelButtonText: this.translate.instant('PUSH.PERMISSIONS.REJECT'),
          },
          welcomeNotification: {
            title: this.translate.instant('PUSH.WELCOME.TITLE'),
            message: this.translate.instant('PUSH.WELCOME.MESSAGE'),
          },
        })
        .then(() => (window as any).OneSignal);
    } catch (err) {
      return new Promise(
        (_, reject): void => {
          reject(`OneSignal is not present in the window, unsupported, or not loaded properly. ${err}`);
        },
      );
    }
  }
}
