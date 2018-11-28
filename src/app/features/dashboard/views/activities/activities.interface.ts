import { GetProfileActivities } from '@anymind-ng/api';

export interface IActivitiesData {
  importantActivitiesList: GetProfileActivities;
  activitiesList: GetProfileActivities;
}

export enum ActivityListTypeEnum {
  EXPERT,
  COMPANY,
}
