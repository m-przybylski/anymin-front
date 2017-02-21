namespace profitelo.api {


  export interface OrganizationDetails {
      name: string;
      description: string;
      files: Array<string>;
      links: Array<string>;
      logo?: string;
  }

}
