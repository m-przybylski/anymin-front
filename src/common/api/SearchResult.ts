namespace profitelo.api {


  export interface SearchResult {
      count: number;
      offset: number;
      relatedTags: Array<SearchResultTag>;
      results: Array<SearchResultRow>;
  }

}
