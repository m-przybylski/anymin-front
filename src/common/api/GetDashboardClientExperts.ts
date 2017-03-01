namespace profitelo.api {


  export interface GetDashboardClientExperts {
      lastConsultations: Array<GetLastConsultation>;
      favouriteProfiles: Array<GetFavouriteProfile>;
      balance: MoneyDto;
  }

}
