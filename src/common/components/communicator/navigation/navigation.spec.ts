describe('Unit testing: profitelo.components.communicator.navigation', () => {
  return describe('for communicatorNav component >', () => {

    let scope
    let rootScope
    let compile
    let component
    let isVideo = false
    let isMessenger = false
    const validHTML = '<communicator-nav data-chat-minimize="ctrl.chatMinimize" data-is-messenger="false"></communicator-nav>'
    const bindings = {
      minimizeCommunicator: _ => _,
      hangupCall: _ => _,
      isVideo: isVideo,
      isMessenger: isMessenger
    }

    const navigatorService = {
      getUserMediaStream: _ => _
    }

    beforeEach(() => {
      angular.mock.module('profitelo.services.navigator')
      angular.mock.module('profitelo.services.sounds')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('soundsService', {})
      $provide.value('navigatorService', navigatorService)
    }))

    beforeEach(() => {
      angular.mock.module('templates-module')
      angular.mock.module('profitelo.components.communicator.navigation')

      inject(($rootScope, $compile, _$componentController_, _callService_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          callService: _callService_,
          navigatorService: navigatorService
        }

        component = _$componentController_('communicatorNav', injectors, bindings)
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

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should animateButtons true', () => {
      const event = {
        currentTarget: {
          classList: {
            contains: _ => true,
            add: _ => _,
            remove: _ => _
          }
        }
      }
      spyOn(event.currentTarget.classList, 'contains').and.returnValue(true)
      spyOn(event.currentTarget.classList, 'add')
      spyOn(event.currentTarget.classList, 'remove')
      component.animateButtons(event)
      expect(event.currentTarget.classList.contains).toHaveBeenCalled()
      expect(event.currentTarget.classList.add).toHaveBeenCalled()
      expect(event.currentTarget.classList.remove).toHaveBeenCalled()
    })

    it('should animateButtons false', () => {
      const event = {
        currentTarget: {
          classList: {
            contains: _ => false,
            add: _ => _,
            remove: _ => _
          }
        }
      }
      spyOn(event.currentTarget.classList, 'contains').and.returnValue(false)
      spyOn(event.currentTarget.classList, 'add')
      spyOn(event.currentTarget.classList, 'remove')
      component.animateButtons(event)
      expect(event.currentTarget.classList.contains).toHaveBeenCalled()
      expect(event.currentTarget.classList.add).toHaveBeenCalled()
      expect(event.currentTarget.classList.remove).toHaveBeenCalled()
    })

    it('should startAudio', inject((callService) => {
      spyOn(callService, 'startAudio')
      component.startAudio()
      expect(callService.startAudio).toHaveBeenCalled()
    }))

    it('should stopAudio', inject((callService) => {
      spyOn(callService, 'stopAudio')
      component.stopAudio()
      expect(callService.stopAudio).toHaveBeenCalled()
    }))

    it('should startVideo', () => {
      spyOn(component, 'animateButtons')
      component.startVideo({})
      expect(component.animateButtons).toHaveBeenCalled()
    })

    it('should stopVideo', inject((callService) => {
      spyOn(callService, 'stopVideo')
      component.stopVideo()
      expect(callService.stopVideo).toHaveBeenCalled()
    }))

    it('should toggleOptions', () => {
      spyOn(component, 'animateButtons')
      component.toggleOptions({})
      expect(component.animateButtons).toHaveBeenCalled()
    })

    it('should toggleMessenger', () => {
      spyOn(component, 'animateButtons')
      component.toggleMessenger({})
      expect(component.animateButtons).toHaveBeenCalled()
    })
  })
})
