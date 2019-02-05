import { Subject, Observable } from 'rxjs';

export interface IAlertOption {
  isStatic?: boolean;
}

export enum AlertType {
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export class Alert {
  public type: AlertType;
  public message: string;
  public alertOption?: IAlertOption;
  private readonly closedByUserEvent$: Subject<void> = new Subject();

  constructor(type: AlertType, message: string, alertOption?: IAlertOption) {
    this.type = type;
    this.message = message;
    this.alertOption = alertOption;
  }

  public get closedByUser$(): Observable<void> {
    return this.closedByUserEvent$.asObservable();
  }

  public alertClosedByUser = (): void => {
    this.closedByUserEvent$.next();
    this.closedByUserEvent$.complete();
  };
}
