describe('Unit testing: profitelo.directives.pro-progress-box', function() {
  return describe('for expert-progress directive >', function() {

    var compile = null
    var scope = null
    var validHTML = '<div data-pro-progress-box data-container="container"></div>'
    var validHTMLEmpty = '<div data-pro-progress-box=""  data-caption="caption"></div>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.pro-progress-box')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      var elem = angular.element(html)

      scope.container = {
        number:       '1',
        title:        'EXPERT_PROGRESS.EXPERT.TITLE',
        description:  'EXPERT_PROGRESS.EXPERT.DESCRIPTION',
        uiTitle:      'EXPERT_PROGRESS.EXPERT.UISREF.TITLE',
        uiTitleDone:  'EXPERT_PROGRESS.EXPERT.UISREF.TITLE.DONE',
        uiSref:       'app.expert-profile',
        class:        'icon-talk-man',
        status:       100,
        verify:       false
      }

      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function() {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})
