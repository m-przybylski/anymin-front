namespace profitelo.api {


  export interface GetServiceWithEmployees {
      serviceDetails: GetService;
      employeesDetails: Array<GetProfileDetails>;
  }

}
