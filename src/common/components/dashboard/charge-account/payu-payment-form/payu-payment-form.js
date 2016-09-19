(function() {

  /* @ngInject */
  function payuPaymentFormController($window, $state, PaymentsApi, proTopAlertService, CommonSettingsService) {

    this.rulesAccepted = false
    this.personalDataSectionId = 'personal-section'
    let isPending = false
    this.bankModel = {}
    let isValid = () => {
      if (angular.isDefined(this.validAction)) {
        return this.validAction()
      } else {
        return true
      }
    }

    if (angular.isDefined(this.amountMethodModal.firstName)) {
      this.firstNameModel = this.amountMethodModal.firstName
    } if (angular.isDefined(this.amountMethodModal.lastName)) {
      this.lastNameModel = this.amountMethodModal.lastName
    } if (angular.isDefined(this.amountMethodModal.email)) {
      this.emailModel = this.amountMethodModal.email
    } if (angular.isDefined(this.amountMethodModal.payMethodValue)) {
      this.bankModel.value = this.amountMethodModal.payMethodValue
    }

    this.sendPayment = () => {

      if (isValid() && !isPending) {

        this.sendPaymentObject = {
          paymentOption: this.amountMethodModal.amountModel.amount,
          email: this.emailModel,
          amount: this.amountMethodModal.amountModel.cashAmount,
          lastName: this.lastNameModel,
          firstName: this.firstNameModel,
          paymentCountryId: 1,
          payMethodValue: this.bankModel.value,
          paymentSystemId: this.amountMethodModal.paymentSystemModel.id
        }

        isPending = true

        PaymentsApi.postPayUOrder(this.sendPaymentObject).$promise.then((response) => {
          isPending = false
          $window.open(response.redirectUrl, '_self', true)
        }, (error) => {
          proTopAlertService.error({
            message: 'error',
            timeout: 4
          })
          $state.go('app.dashboard.start')
        })
      }
    }

    this.patternEmail = CommonSettingsService.localSettings.emailPattern

    return this
    
  }

  let payuPaymentForm = {
    templateUrl: 'components/dashboard/charge-account/payu-payment-form/payu-payment-form.tpl.html',
    restrict: 'E',
    replace: true,
    transclude: true,
    bindings: {
      paymentsLinks: '=?',
      validAction: '=?',
      amountMethodModal: '=?'
    },
    controller: payuPaymentFormController,
    controllerAs: '$ctrl'
  }


  angular.module('profitelo.components.dashboard.charge-account.payu-payment-form', [
    'profitelo.swaggerResources',
    'profitelo.directives.pro-top-alert-service',
    'profitelo.services.commonSettings',
    'profitelo.directives.interface.pro-input',
    'profitelo.directives.interface.pro-checkbox',
    'profitelo.components.dashboard.charge-account.choose-bank'
  ])
    .component('payuPaymentForm', payuPaymentForm)

}())
