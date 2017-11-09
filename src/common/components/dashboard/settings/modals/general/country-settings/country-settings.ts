import * as angular from 'angular'
import * as _ from 'lodash'
import {UserService} from '../../../../../../services/user/user.service'
import userModule from '../../../../../../services/user/user'
import apiModule from 'profitelo-api-ng/api.module'
import {AccountApi} from 'profitelo-api-ng/api/api'
import {TranslatorService} from '../../../../../../services/translator/translator.service'
import translatorModule from '../../../../../../services/translator/translator'

export interface IGeneralCountrySettingsControllerScope extends ng.IScope {
  isNavbar: boolean
  isFullscreen: boolean
  callback: (cb: () => void) => void
  onModalClose: (cb: () => void) => void
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
  public countryList: ICountryElementObject[] = []

  constructor(private $scope: IGeneralCountrySettingsControllerScope, private translatorService: TranslatorService,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              private AccountApi: AccountApi, private userService: UserService) {

    this.getCountriesList(() => {
      userService.getUser().then(user => {
        this.selectedCountry = _.find(
          this.countryList, (country: ICountryElementObject) => country.value.countryISO === user.countryISO)
      })
    })
  }

  /* @ngInject */

  public onModalClose = (): void => {
    this.$uibModalInstance.dismiss('cancel')
  }

  public updateCountry = (selectedCountry: ICountryElementObject): void => {
    this.selectedCountry = _.find(
      this.countryList, country =>
      country.value.countryISO === selectedCountry.value.countryISO)
  }

  public setNewCountry = (): void => {
    this.userService.getUser().then(user => {
      if (!!this.selectedCountry) {
        this.AccountApi.patchUpdateAccountRoute(user.id, {
          countryISO: this.selectedCountry.value.countryISO,
          currencyUnit: this.selectedCountry.value.currency
        })
          .then(_res => {
            // FIXME
            this.$scope.callback(() => {})
            this.$uibModalInstance.dismiss('cancel')
          }, (err: any) => {
            throw new Error('Can not patch user account: ' + err)
          })
      }
    })
  }

  private getCountriesList = (callback: () => void): void => {
    this.AccountApi.getSupportedCountriesRoute().then(res => {
      this.countryList = res.map((country) => <ICountryElementObject>({
        name: this.translatorService.translate('COUNTRIES.' + country.iso),
        value: {
          countryISO: country.iso,
          currency: country.currency
        }
      }))
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
  translatorModule,
  apiModule,
  userModule,
  'profitelo.directives.interface.scrollable'
])
  .controller('generalCountrySettingsController', GeneralCountrySettingsController)
