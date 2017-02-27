namespace profitelo.api {


  export interface SearchResultRow {
      currency: string;
      usageCounter: number;
      tags: Array<SearchResultTag>;
      id: string;
      rating: number;
      owner: SearchResultOwner;
      price: number;
  }

}
