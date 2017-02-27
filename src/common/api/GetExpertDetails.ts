namespace profitelo.api {


  export interface GetExpertDetails {
      name: string;
      avatar?: string;
      files: Array<ProfileDocument>;
      languages: Array<string>;
      description?: string;
      links: Array<string>;
  }

}
