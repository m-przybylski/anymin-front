namespace profitelo.api {


  export interface SearchResult {
      offset: number;
      relatedTags: Array<SearchResultTag>;
      count: number;
      results: Array<SearchResultRow>;
  }

}
