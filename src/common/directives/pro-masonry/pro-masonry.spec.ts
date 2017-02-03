describe('Unit testing: profitelo.directives.pro-masonry', () => {
  return describe('for pro-masonry directive >', () => {

    let scope: any = null
    let rootScope
    let compile: any = null
    let validHTML = '<div pro-masonry="" data-grid-item=".grid-item"></div></div>'
    let timeout 
    let $log
    
    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.directives.pro-masonry')

      inject(($rootScope, $compile, _$log_, _$timeout_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        $log = _$log_
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      timeout.flush()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    
    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should throw error', () => {
      spyOn($log, 'error')
      validHTML = '<div pro-masonry="" ></div></div>'
      create(validHTML)
      expect($log.error).toHaveBeenCalled()
    })
  })
})
