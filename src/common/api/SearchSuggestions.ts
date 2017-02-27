namespace profitelo.api {


  export interface SearchSuggestions {
      terms: Array<SearchSuggestionsTerm>;
      organizations: SearchSuggestionsOrganizations;
      services: SearchSuggestionsServices;
      experts: SearchSuggestionsExperts;
      tags: Array<Tag>;
  }

}
