namespace profitelo.api {


  export interface SearchResultRow {
      tags: Array<SearchResultTag>;
      price: number;
      usageCounter: number;
      id: string;
      rating: number;
      currency: string;
      owner: SearchResultOwner;
  }

}
