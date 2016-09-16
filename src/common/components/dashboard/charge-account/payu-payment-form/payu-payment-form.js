(function() {

  /* @ngInject */
  function payuPaymentFormController($window, $state, PaymentsApi, proTopAlertService, CommonSettingsService) {

    this.rulesAccepted = false
    let isPending = false

    let isValid = () => {
      if (angular.isDefined(this.bankModel)) {
        if (this.amountMethodModal.amountModel.cashAmount === null) {
          return this.amountMethodModal.amountModel.amount !== null
        } else if (this.amountMethodModal.amountModel.cashAmount.amount !==null) {
          return this.amountMethodModal.amountModel.cashAmount.amount > this.amountMethodModal.minimalAmount.amount
        }
      } else {
        return false
      }
    }


    this.sendPayment = () => {

      if(isValid() && !isPending) {

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
          $window.open(response.redirectUrl, '_self',true)
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
    bindings: {
      paymentsLinks: '=?',
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
