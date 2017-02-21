namespace profitelo.api {


  export interface ExpertDetailsUpdate {
      name?: string;
      avatar?: string;
      description?: string;
      files?: Array<string>;
      links?: Array<string>;
      languages?: Array<string>;
  }

}
