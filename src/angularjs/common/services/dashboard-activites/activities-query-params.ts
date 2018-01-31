import { FinancialOperation, GetActivity } from 'profitelo-api-ng/model/models';

export class ActivitiesQueryParams {

  private activityType: GetActivity.ActivityTypeEnum | undefined;
  private profileId: string | undefined;
  private serviceId: string | undefined;
  private accountType: FinancialOperation.AccountTypeEnum;
  private dateFrom: string | undefined;
  private dateTo: string | undefined;
  private limit: string | undefined;
  private offset: string | undefined;

  static $inject = [];

  constructor() {}

  public getActivityType = (): GetActivity.ActivityTypeEnum | undefined => this.activityType;
  public getProfileId = (): string | undefined => this.profileId;
  public getServiceId = (): string | undefined => this.serviceId;
  public getAccountType = (): FinancialOperation.AccountTypeEnum => this.accountType;
  public getDateFrom = (): string | undefined => this.dateFrom;
  public getDateTo = (): string | undefined => this.dateTo;
  public getLimit = (): string | undefined => this.limit;
  public getOffset = (): string | undefined => this.offset;

  public setActivityType = (value?: GetActivity.ActivityTypeEnum): void => {
    if (value !== this.activityType) {
      this.activityType = value;
    }
  }

  public setProfileId  = (value?: string): void => {
    if (value !== this.profileId) {
      this.profileId = value;
      if (value) {
        this.activityType = this.accountType === FinancialOperation.AccountTypeEnum.PROFILE ?
          GetActivity.ActivityTypeEnum.EXPERTSERVICEUSAGEEVENT : GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT;
      }
    }
  }

  public setServiceId  = (value?: string): void => {
    if (value !== this.serviceId) {
      this.serviceId = value;
      if (value) {
        this.activityType = this.accountType === FinancialOperation.AccountTypeEnum.PROFILE ?
          GetActivity.ActivityTypeEnum.EXPERTSERVICEUSAGEEVENT : GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT;
      }
    }
  }

  public setDateFrom = (value?: string): void => {
    const hour: number = 0;
    const minutes: number = 0;
    const seconds: number = 0;

    if (value) {
      const timestamp = new Date(value).setHours(hour, minutes, seconds);
      this.dateFrom = timestamp.toString();
    }
  }

  public setDateTo = (value?: string): void => {
    const hour: number = 23;
    const minutes: number = 59;
    const seconds: number = 59;

    if (value) {
      const timestamp = new Date(value).setHours(hour, minutes, seconds);
      this.dateTo = timestamp.toString();
    }
  }

  public setLimit = (value?: number): void => {
    const checkedValue = value && value > 0 ? Number(value) : 0;
    if (String(checkedValue) !== this.limit) {
      this.limit = String(value);
    }
  }

  public setOffset = (value?: number): void => {
    const checkedValue = value && value > 0 ? Number(value) : 0;
    if (String(checkedValue) !== this.offset) {
      this.offset = String(value);
    }
  }

  public setAccountType = (value: FinancialOperation.AccountTypeEnum): void => {
    if (value !== this.accountType) {
      this.accountType = value;
    }
  }

}
