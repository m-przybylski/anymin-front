import * as angular from 'angular'
import {ProfileGalleryComponent} from './profile-gallery.component'
import {IProfileGalleryComponentBindings, default as profileGalleryModule} from './profile-gallery'
import IRootScopeService = angular.IRootScopeService
import {ModalsService} from '../../../services/modals/modals.service'
import {FilesApiMock, FilesApi} from 'profitelo-api-ng/api/api'
import {ErrorHandlerService} from '../../../services/error-handler/error-handler.service'
import errorHandlerModule from '../../../services/error-handler/error-handler'
import {IProfileGalleryComponentScope} from './profile-gallery.controller'

describe('Unit testing: profitelo.components.interface.profile-gallery', (): void => {
  return describe('for profile-gallery componeent >', (): void => {

    let scope: IProfileGalleryComponentScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ProfileGalleryComponent
    let bindings: IProfileGalleryComponentBindings
    const validHTML = '<profile-gallery documents="documents"></profile-gallery>'
    let modalsService: ModalsService
    let FilesApiMock: FilesApiMock
    let httpBackend: ng.IHttpBackendService

    function create(html: string): JQuery {
      scope = <IProfileGalleryComponentScope>rootScope.$new()
      scope.documents = ['doc-1']
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService): void => {
      $provide.value('apiUrl', 'awesomeUrl')
      $provide.value('modalsService', ModalsService)
      $provide.value('errorHandler', ErrorHandlerService)
    }))

    beforeEach((): void => {
      angular.mock.module(profileGalleryModule)
      angular.mock.module(errorHandlerModule)
    })

    beforeEach((): void => {
      angular.mock.module('pascalprecht.translate')
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _modalsService_: ModalsService,
              _$componentController_: ng.IComponentControllerService, errorHandler: ErrorHandlerService,
              _FilesApiMock_: FilesApiMock, $httpBackend: ng.IHttpBackendService, _FilesApi_: FilesApi): void => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        modalsService = _modalsService_
        FilesApiMock = _FilesApiMock_
        httpBackend = $httpBackend

        bindings = {
          documents: ['doc-1']
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          modalsService,
          FilesApi: _FilesApi_,
          errorHandler
        }

        component = componentController<ProfileGalleryComponent, {}>('profileGallery', injectors, bindings)

      })
    })
    it('should have a dummy test', inject((): void => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', (): void => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

  })
})
