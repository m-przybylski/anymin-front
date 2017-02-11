namespace profitelo.components.dashboard.client.favourites.favouriteExperts.favouriteExpert {
describe('Unit testing: profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert', () => {
  return describe('for clientFavouriteExpert >', () => {

    let scope: any
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: any
    let component: any
    let validHTML = '<client-favourite-expert favourite-expert="favouriteExpert"></client-favourite-expert>'
    let state: ng.ui.IStateService


    function create(html: string) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      scope.favouriteExpert = {
        profile: {
          organizationDetails: {},
          expertDetails: {}
        }
      }
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    const bindings = {
      favouriteExpert: {
        profile: {
          organizationDetails: {},
          expertDetails: {}
        }
      }
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.services.url')
    angular.mock.module('profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$componentController_: ng.IComponentControllerService, _$state_: ng.ui.IStateService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        state = _$state_

        const injectors = {
          $state: state,
        }

        component = componentController('clientFavouriteExpert', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
}
