namespace profitelo.components.dashboard.chargeAccount.paymentMethod.payuPaymentForm {
  import IWindowService = profitelo.services.window.IWindowService
  import ISmoothScrollingService = profitelo.services.smoothScrolling.ISmoothScrollingService
  import ITopAlertService = profitelo.services.topAlert.ITopAlertService
  import IPaymentsApi = profitelo.api.IPaymentsApi
  import IPaymentsApiMock = profitelo.api.IPaymentsApiMock
  import IAccountApi = profitelo.api.IAccountApi
  import IAccountApiMock = profitelo.api.IAccountApiMock

  describe('Unit testing:profitelo.components.dashboard.charge-account.payment-method.payu', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope: any
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let state: ng.ui.IStateService
    let bindings: any
    let httpBackend: ng.IHttpBackendService
    let PaymentApiMock: IPaymentsApiMock
    let window: IWindowService
    let AccountApiMock: IAccountApiMock
    let topAlertService
    let smoothScrollingService: ISmoothScrollingService
    let User: any

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))


    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.api.PaymentsApi')
    angular.mock.module('profitelo.api.AccountApi')
    angular.mock.module('profitelo.components.dashboard.charge-account.payment-method.payu')
    angular.mock.module('ui.router')

      let injectors = {}

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, $httpBackend: ng.IHttpBackendService,
              $window: IWindowService, _User_: any, _$state_: ng.ui.IStateService, _PaymentsApiMock_: IPaymentsApiMock,
              _topAlertService_: ITopAlertService, _smoothScrollingService_: ISmoothScrollingService,
              PaymentsApi: IPaymentsApi, AccountApi: IAccountApi, _AccountApiMock_: IAccountApiMock) => {

        componentController = _$componentController_
        scope = $rootScope.$new()
        compile = $compile
        state = _$state_
        httpBackend = $httpBackend
        PaymentApiMock = _PaymentsApiMock_
        AccountApiMock = _AccountApiMock_
        topAlertService = _topAlertService_
        window = $window
        smoothScrollingService = _smoothScrollingService_
        User = _User_

        injectors = {
          PaymentsApi: PaymentsApi,
          AccountApi: AccountApi
        }
      })

      User.getData = () => {
        return 'BOBiARTUR@profitelo.pl'
      }

      bindings = {
        amountMethodModal: {
          firstName: 'DUMB_NAME',
          lastName: 'DUMB_LASTNAME',
          payMethodValue: '1',
          amountModel: {
            amount: '2122'
          },
          paymentSystemModel: {
            id: 1
          }
        }
      }

      component = componentController('payuPaymentForm', injectors, bindings)

        expect(component.amountMethodModal).toBeDefined()
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))
      // FIXME after company info optional fields fix
      // it('should redirect to app.dashboard.client.activities on form error', inject(() => {
      //   bindings.validAction =  () => {
      //     return true
      //   }
      //   component = componentController('payuPaymentForm', {}, bindings)
      //   component.$onInit()
      //
      //   spyOn(state, 'go')
      //   //FIXME
      //   PaymentApiMock.postPayUOrderRoute(400, <any>{})
      //   component.sendPayment()
      //   httpBackend.flush()
      //   expect(state.go).toHaveBeenCalled()
      // }))
      //
      // it('should redirect to payu', inject(() => {
      //   bindings.amountMethodModal.email = 'testacc@profitelo.pl'
      //   component = componentController('payuPaymentForm', {}, bindings)
      //   component.$onInit()
      //
      //   spyOn(window, 'open')
      //   //FIXME
      //   PaymentApiMock.postPayUOrderRoute(200, <any>{})
      //   component.sendPayment()
      //   httpBackend.flush()
      //   expect(window.open).toHaveBeenCalled()
      // }))

      it('should scroll to bank-section', inject(() => {
        spyOn(smoothScrollingService, 'simpleScrollTo')
        bindings.amountMethodModal.payMethodValue = undefined
        component = componentController('payuPaymentForm', {}, bindings)
        //FIXME
        PaymentApiMock.postPayUOrderRoute(200, <any>{})
        component.sendPayment()
        expect(smoothScrollingService.simpleScrollTo).toHaveBeenCalled()
      }))
    })
  })
}
