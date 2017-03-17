import {BraintreeFormComponentController, IBraintreeFormComponentBindings} from './braintree-form'
import * as angular from 'angular'
import userModule from '../../services/user/user'
import {PaymentsApi, PaymentsApiMock} from 'profitelo-api-ng/api/api'
import './braintree-form'

describe('Unit testing: profitelo.components.braintreeForm', () => {
  return describe('for braintreeForm component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: BraintreeFormComponentController
    let httpBackend: ng.IHttpBackendService

    const validHTML =
      '<braintree-form on-braintree-form-load="onBraintreeFormLoad" on-form-succeed="onFormSucceed"' +
      'submit-button-translate="submitButtonTranslate"></braintree-form>'

    const bindings: IBraintreeFormComponentBindings = {
      onBraintreeFormLoad: () => {

      },
      onFormSucceed: () => {

      },
      submitButtonTranslate: 'asdasd'
    }

    function create(html: string, bindings: IBraintreeFormComponentBindings) {
      const parentScope = rootScope.$new()
      const parentBoundScope = angular.extend(parentScope, bindings)
      const elem = angular.element(html)
      const compiledElement = compile(elem)(parentBoundScope)
      parentBoundScope.$digest()
      return compiledElement
    }

    const userService = {
      getUser: () => {
      }
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.braintree-form')

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService,
              $httpBackend: ng.IHttpBackendService, PaymentsApiMock: PaymentsApiMock, PaymentsApi: PaymentsApi,
              $q: ng.IQService) => {

        spyOn(userService, 'getUser').and.returnValue($q.resolve({currency: 'PLN'}))

        rootScope = $rootScope.$new()
        compile = $compile
        httpBackend = $httpBackend

        const injectors = {
          PaymentsApi: PaymentsApi,
          userService: userService,
          CommonSettingsService: {}
        }

        PaymentsApiMock.getClientTokenRoute(500)

        component = $componentController<BraintreeFormComponentController, IBraintreeFormComponentBindings>(
          'braintreeForm', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', inject(() => {
      let el = create(validHTML, bindings)
      expect(el.html()).toBeDefined(true)
    }))
  })
})
