import { ISearchArticle } from './search-article.interface';
export interface ISearchArticleResults {
  count: number;
  next_page: string;
  page: number;
  page_count: number;
  per_page: number;
  previous_page: null | number;
  results: ISearchArticle[];
}
