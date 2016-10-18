describe('Unit testing: profitelo.components.communicator.pro-bottom-communicator', () => {
  return describe('for proBottomCommunicator component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let resourcesExpectations
    let httpBackend
    let RatelApiDef
    let component
    let validHTML = '<pro-bottom-communicator></pro-bottom-communicator>'

    let _url = 'awesomeUrl'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.pro-bottom-communicator')
      module('profitelo.swaggerResources.definitions')

      inject(($rootScope, $compile, _$componentController_, _$httpBackend_, _RatelApiDef_) => {
        componentController = _$componentController_
        rootScope = $rootScope
        scope = rootScope.$new()
        compile = $compile
        httpBackend = _$httpBackend_
        RatelApiDef = _RatelApiDef_
      })

      resourcesExpectations = {
        RatelApi: {
          getRatelAuthConfig: httpBackend.when(RatelApiDef.getRatelAuthConfig.method, RatelApiDef.getRatelAuthConfig.url)
        }
      }

      resourcesExpectations.RatelApi.getRatelAuthConfig.respond(200)

      component = componentController('proBottomCommunicator', {
        '$scope': scope,
        'ratelService': {
          authenticate: () => {
            
          },
          onDirectRoom: () => {

          },
          onRoomHistory: () => {

          },
          onHangup: () => {

          }
        }
      }, {}, 'vm')

    })

    function create(html) {
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    // it('should have a dummy test', inject(() => {
    //   expect(true).toBeTruthy()
    // }))

    // it('should compile the component', () => {
    //   let el = create(validHTML)
    //   expect(el.html()).toBeDefined(true)
    // })
    //
    // it('should toggle full screen mode', () => {
    //   expect(component.isFullScreenMode).toEqual(false)
    //   component.toggleFullScreen()
    //   expect(component.isFullScreenMode).toEqual(true)
    // })
    //
    // it('should toggle communicator visibility on toggleChat event', () => {
    //   expect(component.isVisible).toEqual(false)
    //
    //   rootScope.$broadcast('toggleChat')
    //   rootScope.$digest()
    //
    //   expect(component.isVisible).toEqual(true)
    //
    // })
    //
    // it('should toggle chat visibility on toggleChat event', () => {
    //   expect(component.isVisible).toEqual(false)
    //
    //   rootScope.$broadcast('toggleChat')
    //   rootScope.$digest()
    //
    //   expect(component.isVisible).toEqual(true)
    //   component.toggles.chat()
    //
    //   rootScope.$broadcast('toggleChat')
    //   rootScope.$digest()
    //
    //   expect(component.showChat).toEqual(false)
    //
    //   rootScope.$broadcast('toggleChat')
    //   rootScope.$digest()
    //
    //   expect(component.showChat).toEqual(true)
    //
    // })




  })
})
