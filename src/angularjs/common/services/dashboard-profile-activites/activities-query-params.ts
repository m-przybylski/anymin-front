// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
// tslint:disable:no-empty
import { GetProfileActivity } from 'profitelo-api-ng/model/models';

export type AccountType = 'CLIENT' | 'PROFILE';

// tslint:disable:member-ordering
export class ActivitiesQueryParams {

  private activityType?: GetProfileActivity.ActivityTypeEnum;
  private profileId?: string;
  private serviceId?: string;
  private dateFrom?: string;
  private dateTo?: string;
  private limit?: string;
  private offset?: string;

  public static $inject = [];

  constructor() {
  }

  public getActivityType = (): GetProfileActivity.ActivityTypeEnum | undefined => this.activityType;
  public getProfileId = (): string | undefined => this.profileId;
  public getServiceId = (): string | undefined => this.serviceId;
  public getDateFrom = (): string | undefined => this.dateFrom;
  public getDateTo = (): string | undefined => this.dateTo;
  public getLimit = (): string | undefined => this.limit;
  public getOffset = (): string | undefined => this.offset;

  public setActivityType = (value?: GetProfileActivity.ActivityTypeEnum): void => {
    if (value !== this.activityType) {
      this.activityType = value;
    }
  }

  public setProfileId = (value?: string): void => {
    if (value !== this.profileId) {
      this.profileId = value;
      if (value) {
        this.activityType = GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT;
      }
    }
  }

  public setServiceId = (value?: string): void => {
    if (value !== this.serviceId) {
      this.serviceId = value;
      if (value) {
        this.activityType = GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT;
      }
    }
  }

  public setDateFrom = (value?: string): void => {
    const hour = 0;
    const minutes = 0;
    const seconds = 0;

    if (value) {
      const timestamp = new Date(value).setHours(hour, minutes, seconds);
      this.dateFrom = timestamp.toString();
    }
  }

  public setDateTo = (value?: string): void => {
    const hour = 23;
    const minutes = 59;
    const seconds = 59;

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

}
