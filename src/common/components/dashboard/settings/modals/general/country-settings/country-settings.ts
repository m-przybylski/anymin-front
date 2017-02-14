namespace profitelo.components.dashboard.settings.modals.general.countrySettings {

  import IFilterService = profitelo.services.filter.IFilterService
  export interface IGeneralCountrySettingsControllerScope extends ng.IScope {
    isNavbar: boolean
    isFullscreen: boolean
    callback: () => void
    onModalClose: () => void
  }

  interface ICountryObject {
    name: string,
    currency: string,
    iso: string
  }

  interface ICountryElementObject {
    value: {
      currency: string,
      countryISO: string
    },
    name: string
  }

  export class GeneralCountrySettingsController implements ng.IController {

    public isNavbar = true
    public selectedCountry: ICountryElementObject | undefined
    public isFullscreen = true
    public countryList: Array<ICountryElementObject> = []

    constructor(private $scope: IGeneralCountrySettingsControllerScope, private $filter: IFilterService,
                private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                private AccountApi: any, private User: any, private lodash: _.LoDashStatic) {

      this.getCountriesList(() => {
        this.selectedCountry = this.lodash.find(
          this.countryList, (country: ICountryElementObject) => {
            return country.value.countryISO === this.User.getData('countryISO')
          })
      })
    }

    /* @ngInject */

    public onModalClose = (): void => {
      this.$uibModalInstance.dismiss('cancel')
    }

    public updateCountry = (selectedCountry: ICountryElementObject): void => {
      this.selectedCountry = this.lodash.find(
        this.countryList, country =>
          country.value.countryISO === selectedCountry.value.countryISO)
    }

    public setNewCountry = (): void => {
      if (!!this.selectedCountry) {
        this.AccountApi.partialUpdateAccount({accountId: this.User.getData('id')}, {
          countryISO: this.selectedCountry.value.countryISO,
          currency: this.selectedCountry.value.currency
        })
        .$promise.then((_res: any) => {
          this.$scope.callback()
          this.$uibModalInstance.dismiss('cancel')
        }, (err: any) => {
          throw new Error('Can not patch user account: ' + err)
        })
      }
    }

    private getCountriesList = (callback: Function): void => {
      this.AccountApi.getSupportedCountries().$promise.then((res: any) => {
        this.countryList = res.map((country: ICountryObject) => {
          return ({
            name: (this.$filter('translate')(this.$filter('normalizeTranslationKey')(('COUNTRIES.' + country.iso)))),
            value: {
              countryISO: country.iso,
              currency: country.currency
            }
          })
        })
        callback()
      }, (err: any) => {
        this.$uibModalInstance.dismiss('cancel')
        throw new Error('Can not get country list:' + err)
      })
    }

  }

  angular.module('profitelo.components.dashboard.settings.modals.general.country-settings', [
    'ui.bootstrap',
    'pascalprecht.translate',
    'ngLodash',
    'profitelo.swaggerResources',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.scrollable'
  ])
  .controller('generalCountrySettingsController', GeneralCountrySettingsController)

}
