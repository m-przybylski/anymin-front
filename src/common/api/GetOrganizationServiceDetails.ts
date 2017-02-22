namespace profitelo.api {


  export interface GetOrganizationServiceDetails {
      service: GetService;
      employees: Array<GetProfileDetails>;
      tags: Array<Tag>;
  }

}
