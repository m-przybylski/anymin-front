describe('Unit testing: profitelo.components.dashboard.charge-account.payment-method', () => {
  return describe('for paymentMethod component >', () => {

    const url = 'awesomUrl/'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let element: any
    let bindings: any
    let validHTML = '<payment-method payment-systems = "[{id: 1, imgSrc: dsadad}, {id: 1, imgSrc: dsadad}, {id: 1, imgSrc: dsadad}]" scroll-handler="ctrl.scrollHandler"></payment-method>'

    beforeEach(angular.mock.module(function($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.dashboard.charge-account.payment-method')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })
      bindings = {
        paymentSystems: [{id: 1, imgSrc: 'wwww'}, {id: 2, imgSrc: 'wwww'}, {id:3, imgSrc: 'wwww'}]
      }
      element = create(validHTML)
      component = componentController('paymentMethod', {$element: element, $scope: scope}, bindings)

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      expect(element.html()).toBeDefined(true)
    })

    it('should call scroll on payment select', () => {
      scope.ctrl = {
        scrollHandler: jasmine.createSpy('scrollHandler')
      }
      scope.$digest()
      element.find('.option').trigger('click')
      expect(scope.ctrl.scrollHandler).toHaveBeenCalled()
    })
  })
})
