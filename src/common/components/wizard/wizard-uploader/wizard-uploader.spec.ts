import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IDocumentFile, WizardUploaderComponentController} from './wizard-uploader.controller'
import {IWizardUploaderModuleComponentBindings} from './wizard-uploader'
import wizardUploaderModule from './wizard-uploader'
import {FilesApi} from 'profitelo-api-ng/api/api'

describe('Unit testing: profitelo.components.wizard.wizard-uploader', () => {
  return describe('for WizardUploader component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: WizardUploaderComponentController
    const validHTML = '<wizard-uploader token-list="[]"></wizard-uploader>'
    let bindings: IWizardUploaderModuleComponentBindings
    let $log: ng.ILogService
    let httpBackend: ng.IHttpBackendService

    const uploaderFactory = {
      collectionTypes: {avatar: 'avatar'},
      getInstance: (): void => {
      }
    }

    function create(html: string): JQuery {
      scope = rootScope.$new()
      scope.selectedItemsValue = []
      scope.tokenList = ['file-token-1']
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL/')
      $provide.value('uploaderFactory', uploaderFactory)
    }))

    beforeEach(() => {
      angular.mock.module(wizardUploaderModule)
    })

    beforeEach(() => {

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $httpBackend: ng.IHttpBackendService,
              $componentController: ng.IComponentControllerService, _$log_: ng.ILogService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        $log = _$log_
        httpBackend = $httpBackend

        bindings = {
          tokenList: ['file-token-1'],
          isValidCallback: (): boolean => true
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<WizardUploaderComponentController, IWizardUploaderModuleComponentBindings>(
          'wizardUploader', injectors, bindings
        )

      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should add file', () => {
      component.documentFiles = []
      const file: File = new File([], '0')
      const files: File[] = [file]
      component.uploadFiles(files)
      expect(component.documentFiles.length).toBe(1)
    })

    it('should log error when can not find file to remove', () => {
      const file: File = new File([], '0')
      const someFile: IDocumentFile = {
        file: file,
        isUploadFailed: false
      }
      spyOn($log, 'error')
      component.removeFile(someFile)
      expect($log.error).toHaveBeenCalledWith('Can not find file')
    })

    it('should reupload file', () => {
      const someFile: File = new File([], '0')
      const file: IDocumentFile = {
        file: someFile,
        isUploadFailed: false
      }
      component.documentFiles = [file]
      spyOn(component, 'onUploadEnd')
      component.reuploadFile(file)
      expect(component.onUploadEnd).toHaveBeenCalledWith(false)
    })

    it('should get file info onInit', inject((FilesApi: FilesApi) => {
      component.tokenList = ['token-1']
      spyOn(FilesApi, 'fileInfoPath').and.callThrough()
      component.$onInit()
      expect(FilesApi.fileInfoPath).toHaveBeenCalled()
    }))

  })
})
