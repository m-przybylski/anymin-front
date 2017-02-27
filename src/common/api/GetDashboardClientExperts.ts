namespace profitelo.api {


  export interface GetDashboardClientExperts {
      lastConsultations: Array<GetLastConsultation>;
      balance: MoneyDto;
      favouriteProfiles: Array<GetFavouriteProfile>;
  }

}
