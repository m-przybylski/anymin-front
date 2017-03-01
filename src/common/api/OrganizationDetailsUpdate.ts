namespace profitelo.api {


  export interface OrganizationDetailsUpdate {
      name?: string;
      description?: string;
      files?: Array<string>;
      links?: Array<string>;
      logo?: string;
  }

}
