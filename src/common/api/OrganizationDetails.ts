namespace profitelo.api {


  export interface OrganizationDetails {
      description: string;
      logo?: string;
      files: Array<string>;
      name: string;
      links: Array<string>;
  }

}
