namespace profitelo.api {


  export interface GetActivities {
      activities: Array<GetActivity>;
      expertServiceTuples: Array<GetExpertServiceTuple>;
      activityTypes: Array<string>;
      balance: MoneyDto;
  }

}
