namespace profitelo.components.dashboard.chargeAccount.paymentMethod.payuPaymentForm {

  import IWindowService = profitelo.services.window.IWindowService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import ICommonSettingsService = profitelo.services.commonSettings.ICommonSettingsService
  import IPaymentsApi = profitelo.api.IPaymentsApi
  import IAccountApi = profitelo.api.IAccountApi
  import IPrimaryDropdownListElement = profitelo.components.interface.dropdownPrimary.IPrimaryDropdownListElement

  /* @ngInject */
  function payuPaymentFormController($log: ng.ILogService, $window: IWindowService, $state: ng.ui.IStateService,
                                     PaymentsApi: IPaymentsApi, User: any, topAlertService: ITopAlertService,
                                     smoothScrollingService: ISmoothScrollingService, AccountApi: IAccountApi,
                                     CommonSettingsService: ICommonSettingsService) {
    let isPending = false

    this.rulesAccepted = true
    this.showInvoiceForm = false
    this.personalDataSectionId = 'personal-section'
    this.bankModel = {}
    this.countryList= [{
      name: "Poland",
      value: "PL"
    }]
    this.countryISO  = ''
    this.onEnter = (option: number) => {
      if (option < 3) {
        $('[data-index="' + (option + 1).toString() + '"] input').focus()
      }
    }

    this.mailValidation = () => {
      return !angular.element('[data-index="3"]').find('input:focus')[0] && !this.emailModel
    }

    this.onSelectCountry = (selectedCountry: IPrimaryDropdownListElement) => {
      this.countryISO = selectedCountry.value
    }

    // TODO If CompanyInfo type fix on backend
    // this.onInvoiceChange = (invoiceStatus: boolean) => {
    //   if (invoiceStatus) {
    //     AccountApi.getCompanyInfoRoute().then((response) => {
    //       this.vatNumber = response.vatNumber
    //       this.companyName = response.companyName
    //       console.log(response)
    //     }, (error) => {
    //       throw new Error('Can not get company info: ' + error)
    //     })
    //   }
    // }


    this.sendPayment = () => {
      if (isValid() && !isPending) {

        this.sendPaymentObject = {
          email: this.emailModel,
          payment: {
            amount: this.amountMethodModal.amountModel.cashAmount,
            paymentCountryId: this.paymentCountryId,
            paymentOption: this.amountMethodModal.amountModel.amount,
            paymentSystemId: this.amountMethodModal.paymentSystemModel.id
          },
          lastName: this.lastNameModel,
          firstName: this.firstNameModel,
          payMethodValue: this.bankModel.value,
        }

        isPending = true

        if (this.showInvoiceForm){
          AccountApi.postCompanyInfoRoute({
            vatNumber: this.vatNumber,
            companyName: this.companyName,
            //TODO On GUS API Implement
            vat:  23,
            address: {
              number: this.apartmentNumber,
              city: this.city,
              zipCode: this.postalCode,
              countryISO: this.countryISO,
              street: this.street
            }
          }).then((_response) => {
            sendPayuOrder()

          }, (error) => {
            throw new Error('Can not post company info: ' + error)
          })
        } else {
          sendPayuOrder()
        }

      }
    }

    const isValid = () => {
      const _isModelBankExist = () => {
        if (angular.isDefined(this.bankModel.value)) {
          return true
        } else {
          smoothScrollingService.simpleScrollTo('#bankValid')
          return false
        }
      }
      if (angular.isDefined(this.validAction)) {
        return this.validAction() && _isModelBankExist()
      } else {
        return _isModelBankExist()
      }
    }

    const sendPayuOrder = () => {
      PaymentsApi.postPayUOrderRoute(this.sendPaymentObject).then((response) => {
        isPending = false
        $window.open(response.redirectUrl, '_self', undefined, true)
      }, (error) => {
        $log.error(error)
        topAlertService.error({
          message: 'error',
          timeout: 4
        })
        $state.go('app.dashboard.client.activities')
      })
    }

    this.patternEmail = CommonSettingsService.localSettings.emailPattern
    this.patternName = CommonSettingsService.localSettings.alphabetPattern

    this.$onInit = () => {

      if (angular.isDefined(this.amountMethodModal.firstName)) {
        this.firstNameModel = this.amountMethodModal.firstName
      }

      if (angular.isDefined(this.amountMethodModal.lastName)) {
        this.lastNameModel = this.amountMethodModal.lastName
      }

      if (angular.isDefined(this.amountMethodModal.email)) {
        this.emailModel = this.amountMethodModal.email
      } else if (angular.isDefined(User.getData('account').email) && User.getData('account').email !== null) {
        this.emailModel = User.getData('account').email
      } else if (angular.isDefined(User.getData('account').unverifiedEmail) && User.getData('account').unverifiedEmail !== null) {
        this.emailModel = User.getData('account').unverifiedEmail
      }

      if (angular.isDefined(this.amountMethodModal.payMethodValue)) {
        this.bankModel.value = this.amountMethodModal.payMethodValue
      }
    }

    return this
  }

  let payuPaymentForm = {
    templateUrl: 'components/dashboard/charge-account/payment-method/payu/payu.tpl.html',
    replace: true,
    transclude: true,
    bindings: {
      paymentsLinks: '=?',
      validAction: '=?',
      amountMethodModal: '=?',
      paymentCountryId: '=?'
    },
    controller: payuPaymentFormController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.payment-method.payu', [
    'profitelo.api.PaymentsApi',
    'profitelo.services.top-alert',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.services.smooth-scrolling',
    'c7s.ng.userAuth',
    'profitelo.components.dashboard.charge-account.choose-bank',
    'profitelo.components.dashboard.charge-account.summary-charge-account'
  ])
    .component('payuPaymentForm', payuPaymentForm)

}
