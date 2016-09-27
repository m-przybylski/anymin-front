(function() {

  /* @ngInject */
  function payuPaymentFormController($window, $state, $scope, PaymentsApi, User, proTopAlertService, smoothScrolling, CommonSettingsService) {

    this.rulesAccepted = true
    this.personalDataSectionId = 'personal-section'
    this.bankModel = {}
    let isPending = false

    const isValid = () => {
      const _isModelBankExist = () => {
        if (angular.isDefined(this.bankModel.value)) {
          return true
        } else {
          smoothScrolling.simpleScrollTo('#bankValid')
          return false

        }
      }
      if (angular.isDefined(this.validAction)) {
        return this.validAction() && _isModelBankExist()
      } else {
        return _isModelBankExist()
      }
    }

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
    'profitelo.directives.services.smooth-scrolling',
    'c7s.ng.userAuth',
    'profitelo.components.dashboard.charge-account.choose-bank'
  ])
    .component('payuPaymentForm', payuPaymentForm)

}())
