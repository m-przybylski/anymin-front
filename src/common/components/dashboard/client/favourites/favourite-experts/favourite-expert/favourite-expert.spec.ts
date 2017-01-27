describe('Unit testing: profitelo.components.dashboard.client.favourites.favourite-experts.favourite-expert', () => {
  return describe('for clientFavouriteExpert >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<client-favourite-expert favourite-expert="favouriteExpert"></client-favourite-expert>'
    let state


    function create(html) {
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

      inject(($rootScope, $compile, _$componentController_, _$state_) => {
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
