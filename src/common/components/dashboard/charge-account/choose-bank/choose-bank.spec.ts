import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {SmoothScrollingService} from '../../../../services/smooth-scrolling/smooth-scrolling.service'
describe('Unit testing: profitelo.components.dashboard.charge-account.choose-bank', () => {
  return describe('for chooseBank component >', () => {

    const url = 'awesomUrl/'

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let bindings: any
    let el: any
    let smoothScrollingService: SmoothScrollingService
    let validHTML = '<choose-bank bank-model="{value: 1}" payments-links="[{value: 1}, {value: 2}]" scroll-section-id="1"></choose-bank>'

    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      // angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.dashboard.charge-account.choose-bank')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService, _smoothScrollingService_: SmoothScrollingService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        smoothScrollingService = _smoothScrollingService_
      })

      bindings = {
        bankModel: {
          value: 1
        },
        paymentsLinks: [
          {value: 1}
        ],
        scrollSectionId: 1
      }
      el = create(validHTML)
      component = componentController('chooseBank', {$element: el, $scope: scope}, bindings)
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      expect(el.html()).toBeDefined(true)
    })

    it('should call scroll method and select bank', () => {
      spyOn(smoothScrollingService, 'scrollTo')
      el.find('.option:first-child').trigger('click')
      expect(smoothScrollingService.scrollTo).toHaveBeenCalled()
    })

  })
})
