(function() {

  /* @ngInject */
  function payuPaymentFormController($window: ng.IWindowService, $state, PaymentsApi, User, topAlertService,
                                     smoothScrollingService, CommonSettingsService) {
    let isPending = false

    this.rulesAccepted = true
    this.personalDataSectionId = 'personal-section'
    this.bankModel = {}

    /* istanbul ignore next function*/
    this.onEnter = (option) => {
      if (option < 3) {
        $('[data-index="' + (option + 1).toString() + '"] input').focus()
      }
    }

    /* istanbul ignore next function*/
    this.mailValidation = () => {
      return !angular.element('[data-index="3"]').find('input:focus')[0] && !this.emailModel
    }

    this.sendPayment = () => {

      if (isValid() && !isPending) {

        this.sendPaymentObject = {
          paymentOption: this.amountMethodModal.amountModel.amount,
          email: this.emailModel,
          amount: this.amountMethodModal.amountModel.cashAmount,
          lastName: this.lastNameModel,
          firstName: this.firstNameModel,
          paymentCountryId: this.paymentCountryId,
          payMethodValue: this.bankModel.value,
          paymentSystemId: this.amountMethodModal.paymentSystemModel.id
        }

        isPending = true

        PaymentsApi.postPayUOrder(this.sendPaymentObject).$promise.then((response) => {
          isPending = false
          $window.open(response.redirectUrl, '_self', undefined, true)
        }, (error) => {
          topAlertService.error({
            message: 'error',
            timeout: 4
          })
          $state.go('app.dashboard.client.activities')
        })
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
      } else if (angular.isDefined(User.getData('email')) && User.getData('email') !== null) {
        this.emailModel = User.getData('email')
      } else if (angular.isDefined(User.getData('unverifiedEmail')) && User.getData('unverifiedEmail') !== null) {
        this.emailModel = User.getData('unverifiedEmail')
      }

      if (angular.isDefined(this.amountMethodModal.payMethodValue)) {
        this.bankModel.value = this.amountMethodModal.payMethodValue
      }
    }

    return this
  }

  let payuPaymentForm = {
    templateUrl: 'components/dashboard/charge-account/payu-payment-form/payu-payment-form.tpl.html',
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


  angular.module('profitelo.components.dashboard.charge-account.payu-payment-form', [
    'profitelo.swaggerResources',
    'profitelo.services.top-alert',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.services.smooth-scrolling',
    'c7s.ng.userAuth',
    'profitelo.components.dashboard.charge-account.choose-bank'
  ])
    .component('payuPaymentForm', payuPaymentForm)

}())
