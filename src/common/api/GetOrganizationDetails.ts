namespace profitelo.api {


  export interface GetOrganizationDetails {
      name: string;
      description: string;
      files: Array<ProfileDocument>;
      links: Array<string>;
      logo?: string;
  }

}
