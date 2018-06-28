// tslint:disable:newline-before-return
import { ISearchFiltersComponentBindings } from './search-filters';
import { IPrimaryDropdownListElement } from '../../interface/dropdown-primary/dropdown-primary';
import { TranslatorService } from '../../../services/translator/translator.service';
import { StateService } from '@uirouter/angularjs';
import { CommonConfig } from '../../../../../common-config';

// tslint:disable:member-ordering
export class SearchFiltersComponentController implements ng.IController, ISearchFiltersComponentBindings {

  public languagesList: {}[];
  public sortList: {}[];
  public showMobileFilters: boolean;
  public profileTypeList: {}[];
  public onlyAvailable = false;

  public tags: string[];

  public sortBy: IPrimaryDropdownListElement;
  public language: IPrimaryDropdownListElement;
  public profileType: IPrimaryDropdownListElement;
  public minPrice = 0;

  public maxPrice = 20;
  private moneyDivider: number;
  private static readonly mobileWidth = 768;

  public $onInit = (): void => {
    this.sortBy = {
      name: this.translatorService.translate(`SEARCH.SORT_BY.${this.$state.params.sortBy}`),
      value: this.$state.params.sortBy
    };
    this.language = {
      name: this.translatorService.translate(`SEARCH.LANGUAGE.${this.$state.params.language}`),
      value: this.$state.params.language
    };
    this.profileType = {
      name: this.translatorService.translate(`SEARCH.PROFILE_TYPE.${this.$state.params.serviceType}`),
      value: this.$state.params.serviceType
    };

    this.minPrice = this.$state.params.minPrice ? this.$state.params.minPrice / this.moneyDivider : this.minPrice;
    this.maxPrice = this.$state.params.maxPrice ? this.$state.params.maxPrice / this.moneyDivider : this.maxPrice;
  }

  public static $inject = ['translatorService', '$window', '$state'];

    constructor(private translatorService: TranslatorService,
              private $window: ng.IWindowService,
              private $state: StateService) {

    this.moneyDivider = CommonConfig.getCommonConfig().config.moneyDivider;

    const languages: {
      shortcut: string,
      name: string,
      'native-name': string
    }[] = CommonConfig.getCommonConfig().config['supported-languages'];

    this.languagesList = languages.map((lng) =>
      ({
        name: this.translatorService.translate('SEARCH.LANGUAGE.' + lng.name),
        value: lng.shortcut
      }));

    this.sortList = [
      {
        name: this.translatorService.translate('SEARCH.SORT_BY.TOP'),
        value: 'TOP'
      },
      {
        name: this.translatorService.translate('SEARCH.SORT_BY.NEW'),
        value: 'NEW'
      },
      {
        name: this.translatorService.translate('SEARCH.SORT_BY.PRICE'),
        value: 'PRICE'
      },
      {
        name: this.translatorService.translate('SEARCH.SORT_BY._PRICE'),
        value: '_PRICE'
      },
    ];

    this.profileTypeList = [
      {
        name: this.translatorService.translate('SEARCH.PROFILE_TYPE.' + 'ALL'),
        value: undefined
      },
      {
        name: this.translatorService.translate('SEARCH.PROFILE_TYPE.' + 'EXPERT'),
        value: 'EXP'
      },
      {
        name: this.translatorService.translate('SEARCH.PROFILE_TYPE.' + 'ORGANIZATION'),
        value: 'ORG'
      }
    ];
  }

  public handleMobileFiltersDisplay = (): boolean => {
    const windowSize = this.$window.innerWidth;
    return windowSize < SearchFiltersComponentController.mobileWidth && !this.showMobileFilters;
  }

  public showFilters = (): void => {
    this.showMobileFilters = !this.showMobileFilters;
  }

  public showMobileFilterButton = (): boolean => {
    const windowSize = this.$window.innerWidth;
    return windowSize < SearchFiltersComponentController.mobileWidth;
  }

  // TODO Add filter Status Change: https://git.contactis.pl/itelo/profitelo/issues/897
  public onActivityStatusChange = (): void => {
  }

  public onPriceRangeBarUpdate = (minPrice: number, maxPrice: number, _pointerType: any): void => {
    this.$state.go('app.search-result', {
      minPrice: minPrice * this.moneyDivider,
      maxPrice: maxPrice * this.moneyDivider
    });
  }

  public updateSortTypeParam = (item: any): void => {
    this.$state.go('app.search-result', {
      sortBy: item.value
    });
  }

  public updateLanguageTypeParam = (item: any): void => {
    this.$state.go('app.search-result', {
      languages: [item.value]
    });
  }

  public updateTypeListTypeParam = (item: any): void => {
    this.$state.go('app.search-result', {
      serviceType: item.value
    });
  }

}
