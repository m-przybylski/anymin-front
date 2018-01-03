import {ISearchArticleResults} from './search-article-results.interface'
export interface IHelpdesk {
  searchArticles: (query: string) => ng.IPromise<ISearchArticleResults>
}
