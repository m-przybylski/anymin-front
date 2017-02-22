namespace profitelo.api {


  export interface GetLastConsultation {
      createdAt?: Date;
      profile: GetProfile;
      service: GetService;
  }

}
