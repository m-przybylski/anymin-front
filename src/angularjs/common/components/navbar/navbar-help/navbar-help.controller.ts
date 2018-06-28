// tslint:disable:strict-boolean-expressions
// tslint:disable:curly
import { INavbarHelpComponentBindings } from './navbar-help';
import * as angular from 'angular';
import { HelpdeskService } from '../../../services/helpdesk/helpdesk.service';
import { ISearchArticle } from '../../../services/helpdesk/search-article.interface';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import { CommonConfig } from '../../../../../common-config';
// tslint:disable:member-ordering
export class NavbarHelpComponentController implements INavbarHelpComponentBindings {

  public zendeskUrl?: string;
  public searchResults: ISearchArticle[] = [];
  public helpSearchQuery: string;
  public onClick: () => void;
  public buttonCallback: () => void;
  public resultCount = 4;
  public isLoading: boolean;
  public areSearchResults: boolean;
  private static readonly minimalQueryLength = 3;
  private static readonly searchDebounceDelay = 500;
  private static readonly defaultSearchQuery = 'jak';
  private debouncedSearch: () => void;

  public static $inject = ['helpdeskService', '$log'];

    constructor(private helpdeskService: HelpdeskService,
              private $log: ng.ILogService) {

    this.buttonCallback = (): void => {
      if (this.onClick && angular.isFunction(this.onClick)) {
        this.onClick();
      } else {
        throw new Error('onClick is not a function');
      }
    };
    this.debouncedSearch = _.debounce(this.querySearchResults, NavbarHelpComponentController.searchDebounceDelay);

    this.querySearchResults();
  }

  public $onInit(): void {
    this.zendeskUrl = CommonConfig.getCommonConfig().urls.zendesk;
  }

  public onHelpSearchInputChange = (): void => {
    if (this.helpSearchQuery && this.helpSearchQuery.length >= NavbarHelpComponentController.minimalQueryLength)
      this.debouncedSearch();
  }

  private querySearchResults = (): void => {
    this.isLoading = true;
    this.areSearchResults = false;
    this.helpdeskService.searchArticles(this.helpSearchQuery || NavbarHelpComponentController.defaultSearchQuery)
      .then((response) => {
        this.searchResults = response.results;
        this.areSearchResults = this.searchResults.length > 0;
      }, (error) => {
        this.$log.error(error);
      }).finally(() => {
        this.isLoading = false;
      });
  }

}
