describe('Unit testing: ' +
  'profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input', () => {
  return describe('for messengerInput component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<messenger-input data-on-send-message="{}" data-on-upload-files="{}" ' +
      'data-on-typing="{}" data-is-file-uploading="false"></messenger-input>'
    
    const bindings = {
      onSendMessage: _ => _,
      onUploadFiles: _ => _,
      onTyping: _ => _,
      isFileUploading: false
    }
    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized.messenger-input')

      inject(($rootScope, $compile, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {}

        component = _$componentController_('messengerInput', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
    
    it('should sendMessage', () => {
      const text = 'sample'
      spyOn(component, 'onSendMessage')
      component.sendMessage(text)
      expect(component.onSendMessage).toHaveBeenCalled()
      expect(component.inputModel).toBe('')
    })

    it('should uploadFiles', () => {
      const files = 'file'
      spyOn(component, 'onUploadFiles')
      component.uploadFiles(files)

      expect(component.onUploadFiles).toHaveBeenCalledWith(files)
    })

    it('should uploadFiles', () => {
      const event = 'event'
      spyOn(component, 'onTyping')
      component.onKeyup(event)
      expect(component.onTyping).toHaveBeenCalled()
    })

  })
})

