describe('Unit testing: profitelo.directives.interface.pro-uploader', () => {
  return describe('for pro-uploader directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-uploader type="image/*" files-uploaded="avatar" data-required data-multiple data-ngf-pattern=".jpg,.jpeg,.png"></pro-uploader>'

    let _httpBackend
    let _FilesApiDef
    let _CommonConfig
    let resourcesExpectations
    let _timeout
    let _interval
    let _commonConfigData

    let url = 'awesomeUrl/'


    let fileId = 123

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.interface.pro-uploader')
      module('profitelo.swaggerResources.definitions')

      inject(($rootScope, $compile, $injector) => {
        rootScope = $rootScope.$new()
        compile = $compile

        _CommonConfig = $injector.get('CommonConfig')
        _FilesApiDef = $injector.get('FilesApiDef')
        _httpBackend = $injector.get('$httpBackend')
        _timeout = $injector.get('$timeout')
        _interval = $injector.get('$interval')

        _commonConfigData = _CommonConfig.getAllData()

        resourcesExpectations = {
          FilesApi: {
            tokenPath: _httpBackend.when(_FilesApiDef.tokenPath.method, _FilesApiDef.tokenPath.url)
          },
          Upload: {
            upload: _httpBackend.when('POST', _commonConfigData.urls['backend'] + '/files/' + fileId + '/upload')
          }
        }
        
      })
    })


    function create(html) {
      scope = rootScope.$new()

      scope.avatar = []

      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should remove image on function call', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      isoScope.deleteImage()

      expect(isoScope.uploadImg).toBeFalsy()
    })

    it('should upload files', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      resourcesExpectations.Upload.upload.respond(200)

      resourcesExpectations.FilesApi.tokenPath.respond(200, {
        fileId: fileId
      })

      isoScope.uploadFiles([
        {
          fileId: '123123'
        }
      ])

      rootScope.$digest()

      _httpBackend.flush()

    })

    it('should animate', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      isoScope.animate()
      _timeout.flush()
      _interval.flush()
      rootScope.$digest()

    })

  })
})
