/*
describe('Unit testing: profitelo.components.communicator.pro-text-chat.chat-message', () => {
  return describe('for proTextChatMessage component >', () => {

    let scope
    let rootScope
    let timeout
    let compile
    let componentController
    let currentCallSessionService
    let component
    let validHTML = '<pro-text-chat-message model="model"></pro-text-chat-message>'

    function create(html) {


      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)

      scope.$digest()


      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.pro-text-chat.chat-message')


      inject(($rootScope, $timeout, $compile, _$componentController_) => {
        componentController = _$componentController_
        rootScope = $rootScope
        scope = rootScope.$new()
        timeout = $timeout
        compile = $compile


      })

      component = componentController('proTextChatMessage', {
        currentCallSessionService: {
          getSession: () => {
            return {
              id: 1
            }
          }
        }
      }, {
        'model': {
          incommingMessage: true,
          sender: 1
        }
      })

    })


    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))
    //
    // it('should compile the directive', () => {
    //   let el = create(validHTML)
    //   expect(el.html()).toBeDefined(true)
    // })
    //
    // it('should toggle incommingMessage flag after timeout', () => {
    //   expect(component.model.incommingMessage).toEqual(true)
    //
    //   timeout.flush()
    //
    //   expect(component.model.incommingMessage).toEqual(false)
    //
    // })


  })
})*/
