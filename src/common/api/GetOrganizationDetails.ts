namespace profitelo.api {


  export interface GetOrganizationDetails {
      description: string;
      logo?: string;
      files: Array<ProfileDocument>;
      name: string;
      links: Array<string>;
  }

}
