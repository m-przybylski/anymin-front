import { GetClientActivities, GetClientActivity, GetProfileActivity } from '@anymind-ng/api';
import { IActivity, IGetActivities } from '@platform/features/dashboard/views/activities/activities.interface';

export class ActivitiesUtilsService {
  public static mapClientActivity(activity: GetClientActivity): IActivity {
    return {
      accountId: activity.accountId,
      id: activity.id,
      activityType: GetProfileActivity.ActivityTypeEnum.SERVICEUSAGEEVENT,
      sueId: activity.sueId,
      expertDetails: activity.details,
      initializedAt: activity.initializedAt,
    };
  }

  public static mapClientActivities(activities: ReadonlyArray<GetClientActivity>): ReadonlyArray<IActivity> {
    return activities.map(activity => ActivitiesUtilsService.mapClientActivity(activity));
  }

  public static mapGetClientActivities(getClientActivities: GetClientActivities): IGetActivities {
    return {
      activities: ActivitiesUtilsService.mapClientActivities(getClientActivities.activities),
      count: getClientActivities.count,
    };
  }
}
