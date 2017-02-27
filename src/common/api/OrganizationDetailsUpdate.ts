namespace profitelo.api {


  export interface OrganizationDetailsUpdate {
      description?: string;
      logo?: string;
      files?: Array<string>;
      name?: string;
      links?: Array<string>;
  }

}
