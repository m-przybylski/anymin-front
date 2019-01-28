import {
  GetClientActivities,
  GetClientActivityDetails,
  GetPayoutMethod,
  GetProfileActivities,
  GetProfileActivity,
  MoneyDto,
  ServiceUsageDetails,
} from '@anymind-ng/api';

export interface IActivitiesData {
  importantActivitiesList: GetProfileActivities;
  activitiesList: GetProfileActivities;
}

export interface IActivitiesClientData {
  importantActivitiesList: GetClientActivities;
  activitiesList: GetClientActivities;
}

export interface IGetActivities {
  activities: ReadonlyArray<IActivity>;
  count: number;
}

export interface IActivity {
  id: string;
  accountId: string;
  activityType: GetProfileActivity.ActivityTypeEnum;
  payoutId?: string;
  serviceId?: string;
  expertId?: string;
  serviceName?: string;
  serviceOwnerId?: string;
  isFreelanceService?: boolean;
  serviceUsageDetails?: ServiceUsageDetails;
  amount?: MoneyDto;
  payoutMethod?: GetPayoutMethod;
  payoutType?: GetProfileActivity.PayoutTypeEnum;
  invoiceId?: string;
  sueId?: string;
  expertDetails?: GetClientActivityDetails;
  initializedAt: Date;
}

export enum ActivityListTypeEnum {
  EXPERT,
  COMPANY,
  CLIENT,
}
