namespace profitelo.components.communicator {

  describe('Unit testing: profitelo.components.communicator', () => {
    return describe('for communicator component >', () => {

      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: CommunicatorComponentController

      const validHTML: string = '<communicator></communicator>'

      function create(html: string) {
        const parentScope: ng.IScope = rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(parentScope)
        parentScope.$digest()
        return compiledElement
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.sounds')
        angular.mock.module('profitelo.services.call')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('soundsService', {})
        $provide.value('apiUrl', 'awesomeUrl/')
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.communicator')

        inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {

          rootScope = $rootScope.$new()
          compile = $compile

          const injectors = {
            $element: create(validHTML)
          }

          component = $componentController<CommunicatorComponentController, {}>('communicator', injectors, {})
        })
      })

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the component', () => {
        const element: JQuery = create(validHTML)
        expect(element.html()).toBeDefined(true)
      })
    })
  })

}
