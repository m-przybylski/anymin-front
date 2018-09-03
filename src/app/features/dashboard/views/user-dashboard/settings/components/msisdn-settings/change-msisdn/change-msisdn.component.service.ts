import { AccountService } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BackendErrors, isBackendError } from '../../../../../../../../shared/models/backend-error/backend-error';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { HttpErrorResponse } from '@angular/common/http';

export enum VerifyMsisdnStatusEnum {
  SUCCESS,
  ERROR,
  WRONG_MSISDN,
  ALREADY_EXISTS,
  BLOCKED,
  CREATE_PIN_CODE_TOO_RECENTLY
}

@Injectable()
export class ChangeMsisdnComponentService {

  private readonly verifyMsisdnStatusMap: Map<BackendErrors, VerifyMsisdnStatusEnum> =
    new Map<BackendErrors, VerifyMsisdnStatusEnum>([
      [BackendErrors.IncorrectValidation, VerifyMsisdnStatusEnum.WRONG_MSISDN],
      [BackendErrors.AccountAlreadyExists, VerifyMsisdnStatusEnum.ALREADY_EXISTS],
      [BackendErrors.MsisdnBlocked, VerifyMsisdnStatusEnum.BLOCKED],
      [BackendErrors.CreateAnotherPinCodeTokenRecently, VerifyMsisdnStatusEnum.CREATE_PIN_CODE_TOO_RECENTLY]
    ]);
  private logger: LoggerService;

  constructor(private accountService: AccountService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.createLoggerService('ChangeMsisdnComponentService');
  }

  public verifyMsisdn = (unverifiedMsisdn: string): Observable<VerifyMsisdnStatusEnum> =>
    this.accountService.newMsisdnVerificationRoute({unverifiedMsisdn})
      .pipe(
        map(() => VerifyMsisdnStatusEnum.SUCCESS),
        catchError(err => of(this.handleError(err)))
      );

  private handleError = (httpError: HttpErrorResponse): VerifyMsisdnStatusEnum => {
    const error = httpError.error;
    if (isBackendError(error)) {
      const status = this.verifyMsisdnStatusMap.get(error.code);

      return status ? status : this.handleUnhandledBackendError(httpError);
    }
    this.logger.warn('Error when changing password', httpError);

    return VerifyMsisdnStatusEnum.ERROR;
  }

  private handleUnhandledBackendError = (httpError: HttpErrorResponse): VerifyMsisdnStatusEnum => {
    this.logger.error('unhandled backend error', httpError);

    return VerifyMsisdnStatusEnum.ERROR;
  }

}
