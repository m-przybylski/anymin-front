import {INavbarHelpComponentBindings} from './navbar-help'
import * as angular from 'angular'
import {HelpdeskService} from '../../../services/helpdesk/helpdesk.service'
import {ISearchArticle} from '../../../services/helpdesk/search-article.interface'
import * as _ from 'lodash'
export class NavbarHelpComponentController implements INavbarHelpComponentBindings {

  public readonly zendeskUrl: string = 'https://anymind.zendesk.com/hc/pl/'
  public searchResults: ISearchArticle[] = []
  public helpSearchQuery: string
  public onClick: () => void
  public buttonCallback: () => void
  public resultCount: number = 4
  private static readonly minimalQueryLength: number = 3
  private static readonly searchDebounceDelay: number = 500
  private debouncedSearch: () => void

  /* @ngInject */
  constructor(private helpdeskService: HelpdeskService,
  private $log: ng.ILogService) {

    this.buttonCallback = (): void => {
      if (this.onClick && angular.isFunction(this.onClick)) {
        this.onClick()
      } else {
        throw new Error('onClick is not a function')
      }
    }
    this.debouncedSearch = _.debounce(this.querySearchResults, NavbarHelpComponentController.searchDebounceDelay)
  }

  public onHelpSearchInputChange = (): void => {
    if (this.helpSearchQuery && this.helpSearchQuery.length >= NavbarHelpComponentController.minimalQueryLength)
      this.debouncedSearch()
  }

  private querySearchResults = (): void => {
    this.helpdeskService.searchArticles(this.helpSearchQuery).then((response) => {
      this.searchResults = response.results
    }, (error) => {
      this.$log.error(error)
    })
  }

}
