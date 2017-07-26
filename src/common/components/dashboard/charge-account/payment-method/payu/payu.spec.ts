import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SmoothScrollingService} from '../../../../../services/smooth-scrolling/smooth-scrolling.service'
import apiModule from 'profitelo-api-ng/api.module'
import {PaymentsApiMock, AccountApiMock, AccountApi, PaymentsApi} from 'profitelo-api-ng/api/api'
import userModule from '../../../../../services/user/user'
import {TopAlertService} from '../../../../../services/top-alert/top-alert.service'
import {IWindowService} from '../../../../../services/window/window.service'
import {CompanyInfo} from 'profitelo-api-ng/model/models'

describe('Unit testing:profitelo.components.dashboard.charge-account.payment-method.payu', () => {
  return describe('for payuPaymentFormController component >', () => {
    const url = 'awesomUrl/'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let state: ng.ui.IStateService
    let bindings: any
    let httpBackend: ng.IHttpBackendService
    let PaymentApiMock: PaymentsApiMock
    let window: IWindowService
    let AccountApiMock: AccountApiMock
    let topAlertService
    let smoothScrollingService: SmoothScrollingService

    const userService = {
      getUser: (): void => {
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService): void {
      $provide.value('apiUrl', url)
      $provide.value('userService', userService)
      $provide.value('$element', {})
    }))

    beforeEach(() => {

      angular.mock.module(apiModule)
      angular.mock.module('profitelo.components.dashboard.charge-account.payment-method.payu')

      let injectors = {}

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, $httpBackend: ng.IHttpBackendService,
              $window: IWindowService, _$state_: ng.ui.IStateService, _PaymentsApiMock_: PaymentsApiMock,
              _topAlertService_: TopAlertService, _smoothScrollingService_: SmoothScrollingService,
              PaymentsApi: PaymentsApi, AccountApi: AccountApi, _AccountApiMock_: AccountApiMock, $q: ng.IQService) => {

        spyOn(userService, 'getUser').and.callFake(() => $q.resolve({email: '123'}))

        componentController = _$componentController_
        scope = $rootScope.$new()
        rootScope = $rootScope
        compile = $compile
        state = _$state_
        httpBackend = $httpBackend
        PaymentApiMock = _PaymentsApiMock_
        AccountApiMock = _AccountApiMock_
        topAlertService = _topAlertService_
        window = $window
        smoothScrollingService = _smoothScrollingService_

        injectors = {
          PaymentsApi: PaymentsApi,
          AccountApi: AccountApi,
          $element: {}
        }
      })

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

    it('should redirect to app.dashboard.client.activities on form error', inject(() => {
      bindings.validAction =  () => {
        return true
      }
      component = componentController('payuPaymentForm', {}, bindings)
      component.$onInit()
      component.bankModel = 't'
      component.firstNameModel = 'dumbName'
      component.lastNameModel = 'dumbLastName'
      component.emailModel = 'dumb@email.com'
      component.rulesAccepted = true
      AccountApiMock.postCompanyInfoRoute(200, <CompanyInfo>{

      })
      spyOn(state, 'go')
      PaymentApiMock.postPayUOrderRoute(400)
      component.sendPayment()
      httpBackend.flush()
      expect(state.go).toHaveBeenCalled()
    }))

    //
    // it('should redirect to payu', inject(() => {
    //   bindings.amountMethodModal.email = 'testacc@profitelo.pl'
    //   component = componentController('payuPaymentForm', {}, bindings)
    //   component.$onInit()
    //
    //   spyOn(window, 'open')
    //   // FIXME
    //   PaymentApiMock.postPayUOrderRoute(200, <any>{})
    //   component.sendPayment()
    //   httpBackend.flush()
    //   expect(window.open).toHaveBeenCalled()
    // }))it('should redirect to app.dashboard.client.activities on form error', inject(() => {
    //       bindings.validAction = () => {
    //       return true
    //     }
    //     component = componentController('payuPaymentForm', {}, bindings)
    //     component.$onInit()
    //     rootScope.$digest()
    //
    //     spyOn(state, 'go')
    //     // FIXME
    //     PaymentApiMock.postPayUOrderRoute(400, <any>{})
    //     component.sendPayment()
    //     httpBackend.flush()
    //     expect(state.go).toHaveBeenCalled()
    //   }))
    //
    // it('should redirect to payu', inject(() => {
    //   bindings.amountMethodModal.email = 'testacc@profitelo.pl'
    //   component = componentController('payuPaymentForm', {}, bindings)
    //   component.$onInit()
    //   rootScope.$digest()
    //
    //   spyOn(window, 'open')
    //   // FIXME
    //   PaymentApiMock.postPayUOrderRoute(200, <any>{})
    //   component.sendPayment()
    //   httpBackend.flush()
    //   expect(window.open).toHaveBeenCalled()
    // }))

    it('should scroll to bank-section', inject(() => {
      spyOn(smoothScrollingService, 'simpleScrollTo')
      bindings.amountMethodModal.payMethodValue = undefined
      component = componentController('payuPaymentForm', {}, bindings)
      // FIXME
      PaymentApiMock.postPayUOrderRoute(200, <any>{})
      component.sendPayment()
      expect(smoothScrollingService.simpleScrollTo).toHaveBeenCalled()
    }))
  })
})
