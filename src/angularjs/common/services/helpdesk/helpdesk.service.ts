import {IHelpdesk} from './helpdesk.interface'
import {ISearchArticleResults} from './search-article-results.interface'

export class HelpdeskService implements IHelpdesk {

  private static readonly baseZendeskUrl: string = 'https://anymind.zendesk.com/'

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
  }

  public searchArticles = (query: string): ng.IPromise<ISearchArticleResults> => {
    const searchArticlesUrlPath: string = HelpdeskService.baseZendeskUrl + 'api/v2/help_center/articles/search.json'

    if (!query) {
      throw new Error('Required parameter query was not defined when calling addAccountRoute.')
    }

    const httpRequestParams: ng.IRequestConfig = {
      method: 'GET',
      url: searchArticlesUrlPath,
      params: {
        query
      },
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-LANG': undefined,
        'X-Api-Key': undefined
      }
    }

    return this.$http(httpRequestParams).then(response => {
      if (typeof response.data !== 'undefined') {
        return response.data as ISearchArticleResults
      }
      else {
        throw new Error('Response was not defined')
      }
    })
  }

}
