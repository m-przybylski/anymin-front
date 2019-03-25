import { ProfileService, AccountService, GetInvoiceDetails, PostCompanyDetails } from '@anymind-ng/api';
import { Injectable } from '@angular/core';
import { LoggerFactory, LoggerService, AlertService, Alerts } from '@anymind-ng/core';
import { Observable, throwError, forkJoin, of, defer } from 'rxjs';
import { switchMap, map, take, catchError } from 'rxjs/operators';
import { GetProfile } from '@anymind-ng/api/model/getProfile';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import * as fromRoot from '@platform/reducers';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { PostProfileDetails } from '@anymind-ng/api/model/postProfileDetails';
import { PostProfileWithInvoiceDetails } from '@anymind-ng/api/model/postProfileWithInvoiceDetails';
import { httpCodes } from '@platform/shared/constants/httpCodes';
import {
  CompanyInvoiceDetailsFormControlNames,
  COMPANY_FORM_NAME,
} from '../../../payout-invoice-details/components/company-form/company-form.component';
import { FormGroup } from '@angular/forms';

export interface ICreateOrganizationModalData {
  getInvoiceDetails?: GetInvoiceDetails;
  countryIso?: string;
  hasConsultations: boolean;
}
@Injectable()
export class CreateOrganizationComponentService {
  private logger: LoggerService;

  constructor(
    private profileService: ProfileService,
    private alertService: AlertService,
    private accountService: AccountService,
    private store: Store<fromRoot.IState>,
    loggerFactory: LoggerFactory,
  ) {
    this.logger = loggerFactory.createLoggerService('CreateOrganizationComponentService');
  }

  public createOrganizationProfile(data: PostProfileWithInvoiceDetails): Observable<GetProfile> {
    return this.profileService
      .postCreateProfileWithInvoiceDetailsRoute(data)
      .pipe(this.handleResponseError('Not able to create organization profile'));
  }

  public getInitialData(): Observable<ICreateOrganizationModalData> {
    return getNotUndefinedSession(this.store).pipe(
      take(1),
      switchMap(getSessionWithAccount =>
        forkJoin(
          this.accountService.getInvoiceDetailsRoute().pipe(
            /**
             * in case user does not have any invoice details (old account) do not throw error
             */
            catchError((err: HttpErrorResponse) => {
              if (err.status === httpCodes.notFound) {
                return of(undefined);
              }

              return throwError(err);
            }),
          ),
          defer(() => {
            if (getSessionWithAccount.session.expertProfileId) {
              return this.profileService.getProfileWithServicesRoute(getSessionWithAccount.session.expertProfileId);
            }

            return of([]);
          }),
          defer(() => {
            if (getSessionWithAccount.session.organizationProfileId) {
              this.profileService.getProfileWithServicesRoute(getSessionWithAccount.session.organizationProfileId);
            }

            return of([]);
          }),
        ).pipe(
          map(([getInvoiceDetails, expertGetServices, organizationGetServices]) => ({
            getInvoiceDetails,
            countryIso: getSessionWithAccount.session.country,
            hasConsultations: expertGetServices.length + organizationGetServices.length > 0,
          })),
          this.handleResponseError('Not able to get services'),
        ),
      ),
      map(modalData => modalData),
    );
  }

  public validateOrganizationDetails(data: PostProfileDetails): Observable<void> {
    return this.profileService
      .postProfileValidateRoute(data)
      .pipe(this.handleResponseError('error when try to validate organization details'));
  }

  public getInvoiceDetailsFromForm(invoiceDetailsForm: FormGroup, accountCountryIsoCode: string): PostCompanyDetails {
    const controls = (invoiceDetailsForm.get(COMPANY_FORM_NAME) as FormGroup).controls;

    return {
      companyName: controls[CompanyInvoiceDetailsFormControlNames.COMPANY_NAME].value,
      vatNumber: controls[CompanyInvoiceDetailsFormControlNames.VAT_NUMBER].value,
      address: {
        street: controls[CompanyInvoiceDetailsFormControlNames.STREET].value,
        streetNumber: controls[CompanyInvoiceDetailsFormControlNames.STREET_NUMBER].value,
        apartmentNumber: controls[CompanyInvoiceDetailsFormControlNames.APARTMENT_NUMBER].value,
        city: controls[CompanyInvoiceDetailsFormControlNames.CITY].value,
        postalCode: this.getPostalCode(controls[CompanyInvoiceDetailsFormControlNames.POSTAL_CODE].value),
        countryISO: accountCountryIsoCode,
      },
      vatRateType: controls[CompanyInvoiceDetailsFormControlNames.VAT_RATE].value,
    };
  }

  public patchInvoiceDetailsForm(formGroup: FormGroup, getInvoiceDetails: GetInvoiceDetails): void {
    if (!formGroup.contains(COMPANY_FORM_NAME)) {
      return;
    }
    const companyInvoiceDetailFormGroup = formGroup.get(COMPANY_FORM_NAME) as FormGroup;
    if (getInvoiceDetails.invoiceDetailsType === GetInvoiceDetails.InvoiceDetailsTypeEnum.COMPANY) {
      companyInvoiceDetailFormGroup.patchValue({
        [CompanyInvoiceDetailsFormControlNames.COMPANY_NAME]: getInvoiceDetails.companyName,
        [CompanyInvoiceDetailsFormControlNames.VAT_NUMBER]: getInvoiceDetails.vatNumber,
        [CompanyInvoiceDetailsFormControlNames.STREET]: getInvoiceDetails.address.street,
        [CompanyInvoiceDetailsFormControlNames.STREET_NUMBER]: getInvoiceDetails.address.streetNumber,
        [CompanyInvoiceDetailsFormControlNames.APARTMENT_NUMBER]: getInvoiceDetails.address.apartmentNumber,
        [CompanyInvoiceDetailsFormControlNames.CITY]: getInvoiceDetails.address.city,
        [CompanyInvoiceDetailsFormControlNames.POSTAL_CODE]: getInvoiceDetails.address.postalCode,
        [CompanyInvoiceDetailsFormControlNames.VAT_RATE]: getInvoiceDetails.vatRateType,
      });
    }
  }

  private handleResponseError<T>(errorMsg: string): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          this.alertService.pushDangerAlert(Alerts.SomethingWentWrong);
          this.logger.warn(errorMsg, error);

          return throwError(error);
        }),
      );
  }

  /**
   * converts '00000' to '00-000'
   */
  private getPostalCode(postCodeValue: string): string {
    const firstPartOfPostalCode = 2;

    return `${postCodeValue.slice(0, firstPartOfPostalCode)}-${postCodeValue.slice(firstPartOfPostalCode)}`;
  }
}
