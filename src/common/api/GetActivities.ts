namespace profitelo.api {


  export interface GetActivities {
      activityTypes: Array<string>;
      balance: MoneyDto;
      expertServiceTuples: Array<GetExpertServiceTuple>;
      activities: Array<GetActivity>;
  }

}
