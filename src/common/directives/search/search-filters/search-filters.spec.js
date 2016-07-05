describe('Unit testing: profitelo.directives.search.search-filter', () => {
  return describe('for search-filter directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<search-filter data-models="model"></search-filter>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.search.search-filter')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      scope.model = {
        sortModel: '',
        languagesModel: '',
        categoryModel: '',
        switcherModel: false,
        tagsModel: [],
        minRange: 0,
        maxRange: 100
      }
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})