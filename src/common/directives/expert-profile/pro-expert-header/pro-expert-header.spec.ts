describe('Unit testing: profitelo.directives.expert-profile.pro-expert-header', () => {
  return describe('for expert-profile.pro-expert-header directive >', () => {

    let scope: any = null
    let rootScope
    let compile: any = null
    let validHTML = '<pro-expert-header data-profile="{type: \'x\', description: \' asasdfasfas \' }"></pro-expert-header>'

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.expert-profile.pro-expert-header')
    angular.mock.module('profitelo.components.interface.show-more-text')
      
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
    
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})
