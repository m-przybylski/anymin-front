describe('Unit testing: profitelo.components.interface.preloader-container', () => {
  return describe('for preloaderContainer component >', () => {

    const url = 'awesomUrl/'

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let validHTML = '<preloader-container data-is-loading="vm.isLoadMoreLoading" data-is-error="vm.isLoadMoreError"' +
      'data-error-fn="vm.loadMoreOnClick" data-error-message="SEARCH.PRELOADER_CONTAINER.ERROR_MESSAGE"></preloader-container>'

    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.preloader-container')

      inject(($rootScope, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('preloaderContainer', {$element: create(validHTML), $scope: scope}, {})

    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})