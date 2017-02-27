namespace profitelo.api {


  export interface ExpertDetails {
      name: string;
      avatar?: string;
      files: Array<string>;
      languages: Array<string>;
      description?: string;
      links: Array<string>;
  }

}
