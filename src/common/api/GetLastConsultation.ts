namespace profitelo.api {


  export interface GetLastConsultation {
      profile: GetProfile;
      createdAt?: Date;
      service: GetService;
  }

}
