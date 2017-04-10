import {FinancialOperation, GetActivity} from 'profitelo-api-ng/model/models'

export class ActivitiesQueryParams {

  private activityType: GetActivity.ActivityTypeEnum | undefined
  private profileId: string | undefined
  private serviceId: string | undefined
  private accountType: FinancialOperation.AccountTypeEnum
  private dateFrom: string | undefined
  private dateTo: string | undefined
  private limit: string | undefined
  private offset: string | undefined

  /* @ngInject */
  constructor() {}

  public getActivityType = () => this.activityType
  public getProfileId = () => this.profileId
  public getServiceId = () => this.serviceId
  public getAccountType = () => this.accountType
  public getDateFrom = () => this.dateFrom
  public getDateTo= () => this.dateTo
  public getLimit = () => this.limit
  public getOffset = () => this.offset

  public setActivityType = (value?: GetActivity.ActivityTypeEnum) => {
    if (value !== this.activityType) {
      this.activityType = value
    }
  }

  public setProfileId  = (value?: string) => {
    if (value !== this.profileId) {
      this.profileId = value
      if (value) {
        this.activityType = this.accountType === FinancialOperation.AccountTypeEnum.PROFILE ?
          GetActivity.ActivityTypeEnum.EXPERTSERVICEUSAGEEVENT : GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT
      }
    }
  }

  public setServiceId  = (value?: string) => {
    if (value !== this.serviceId) {
      this.serviceId = value
      if (value) {
        this.activityType = this.accountType === FinancialOperation.AccountTypeEnum.PROFILE ?
          GetActivity.ActivityTypeEnum.EXPERTSERVICEUSAGEEVENT : GetActivity.ActivityTypeEnum.CLIENTSERVICEUSAGEEVENT
      }
    }
  }

  public setDateFrom = (value?: string) => {
    if (value !== this.dateFrom) {
      this.dateFrom = value
    }
  }

  public setDateTo = (value?: string) => {
    if (value !== this.dateTo) {
      if (value) {
        // TODO It will not working with time zones
        this.dateTo = String(new Date(value).setHours(23, 59, 59, 999))
      } else {
        this.dateTo = value
      }
    }
  }

  public setLimit = (value?: number) => {
    const checkedValue = value && value > 0 ? Number(value) : 0
    if (String(checkedValue) !== this.limit) {
      this.limit = String(value)
    }
  }

  public setOffset = (value?: number) => {
    const checkedValue = value && value > 0 ? Number(value) : 0
    if (String(checkedValue) !== this.offset) {
      this.offset = String(value)
    }
  }

  public setAccountType = (value: FinancialOperation.AccountTypeEnum) => {
    if (value !== this.accountType) {
      this.accountType = value
    }
  }

}
