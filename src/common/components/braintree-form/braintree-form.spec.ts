namespace profitelo.components.braintreeForm {

  import IBraintreeFormComponentBindings = profitelo.components.braintreeForm.IBraintreeFormComponentBindings
  import IPaymentsApi = profitelo.api.IPaymentsApi

  describe('Unit testing: profitelo.components.braintreeForm', () => {
    return describe('for messenger component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: BraintreeFormComponentController
      let resourcesExpectations: any
      let httpBackend: ng.IHttpBackendService

      const validHTML =
        '<braintree-form data-on-braintree-form-load="vm.onLoad" data-submit-button-translate="BRAINTREE.ADD_BUTTON">' +
        '</braintree-form>'

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

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl')
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.api.PaymentsApi')
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('profitelo.components.braintree-form')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService,
                $httpBackend: ng.IHttpBackendService, PaymentsApiDef: any, PaymentsApi: IPaymentsApi) => {

          rootScope = $rootScope.$new()
          compile = $compile
          httpBackend = $httpBackend
          const injectors = {
            PaymentsApi: PaymentsApi

          }

          resourcesExpectations = {
            PaymentsApi: {
              getClientTokenRoute: httpBackend.when(PaymentsApiDef.getClientToken.method,
                PaymentsApiDef.getClientToken.url)
            }
          }

          resourcesExpectations.PaymentsApi.getClientTokenRoute.respond(500)

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
}
