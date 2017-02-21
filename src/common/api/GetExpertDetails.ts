namespace profitelo.api {


  export interface GetExpertDetails {
      name: string;
      avatar?: string;
      description?: string;
      files: Array<ProfileDocument>;
      links: Array<string>;
      languages: Array<string>;
  }

}
