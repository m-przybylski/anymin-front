import userModule from '../../../../services/user/user'
import * as angular from 'angular'

describe('Unit testing: profitelo.components.dashboard.settings.navigation', () => {
  return describe('for settingsNavigation >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    const validHTML = '<settings-navigation></settings-navigation>'
    const userService = {
      getUser: (): boolean => true
    }

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(userModule)
    })

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
      $provide.value('userService', userService)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.components.settings.navigation')

      inject(($rootScope: any, $compile: ng.ICompileService, $q: ng.IQService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        spyOn(userService, 'getUser').and.returnValue($q.resolve({isCompany: true}))
      })

      component = componentController('settingsNavigation', {}, {
        $element: create(validHTML)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})

