namespace profitelo.api {


  export interface SearchSuggestions {
      services: SearchSuggestionsServices;
      experts: SearchSuggestionsExperts;
      tags: Array<Tag>;
      terms: Array<SearchSuggestionsTerm>;
      organizations: SearchSuggestionsOrganizations;
  }

}
