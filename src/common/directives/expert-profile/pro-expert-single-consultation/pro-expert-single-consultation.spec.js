describe('Unit testing: profitelo.directives.expert-profile.pro-expert-single-consultation', () => {
  return describe('for expert-profile.pro-expert-single-consultation directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-expert-single-consultation></pro-expert-single-consultation>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.expert-profile.pro-expert-single-consultation')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
  })
})
