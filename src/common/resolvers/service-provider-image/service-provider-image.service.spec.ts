describe('Unit testing: profitelo.resolvers.service-provider-image', () => {
  describe('for ServiceProviderChoosePathResolver service >', () => {

    let url = 'awesomeURL'
    let mockState
    let AppServiceProviderImageResolver
    let $httpBackend
    let _FilesApiDef
    let resourcesExpectations
    beforeEach(angular.mock.module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {
        }
      }
    angular.mock.module('profitelo.swaggerResources.definitions')
    angular.mock.module('profitelo.resolvers.service-provider-image', function($provide) {

      })

      inject(($injector) => {
        AppServiceProviderImageResolver = $injector.get('ServiceProviderImageResolver')
        _FilesApiDef = $injector.get('FilesApiDef')
        $httpBackend = $injector.get('$httpBackend')
      })

      resourcesExpectations = {
        FilesApi: {
          fileInfoPath: $httpBackend.when(_FilesApiDef.fileInfoPath.method, _FilesApiDef.fileInfoPath.url)
        }
      }
    })


    it('should have resolve function', () => {
      expect(AppServiceProviderImageResolver.resolve).toBeDefined()
    })

    it('should return downloadUrl', () => {
      let spy = {
        spy: () => {
        }
      }

      spyOn(spy, 'spy')
      resourcesExpectations.FilesApi.fileInfoPath.respond(200, {
        previews: [
          'http://i_just_download_image.profitelo.pl'
        ]
      })
      AppServiceProviderImageResolver.resolve(':token').then((res)=> {
        expect(res).toBe('http://i_just_download_image.profitelo.pl')
        spy.spy()
      }, ()=> {

      })
      $httpBackend.flush()
      expect(spy.spy).toHaveBeenCalled()
    })

    it('should not get file path', () => {
      let spy = {
        spy: () => {
        }
      }

      spyOn(spy, 'spy')
      resourcesExpectations.FilesApi.fileInfoPath.respond(300, {
        meta: {
          downloadUrl: 'http://i_just_download_image.profitelo.pl'
        }
      })

      AppServiceProviderImageResolver.resolve(':token').then((res)=> {
        expect(res).toBe('')
        spy.spy()
      }, ()=> {
      })

      $httpBackend.flush()
      expect(spy.spy).toHaveBeenCalled()
    })

  })
})