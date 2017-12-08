import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IDocumentFile, FileUploaderComponentController, IFileUploaderComponentScope} from './file-uploader.controller'
import {IFileUploaderModuleComponentBindings} from './file-uploader'
import fileUploaderModule from './file-uploader'
import {FilesApi} from 'profitelo-api-ng/api/api'
import {FileTypeChecker} from '../../classes/file-type-checker/file-type-checker'
import {CommonSettingsService} from '../../services/common-settings/common-settings.service'

describe('Unit testing: profitelo.components.file-uploader', () =>
  describe('for FileUploader component >', () => {

    let scope: IFileUploaderComponentScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: FileUploaderComponentController
    const validHTML = '<file-uploader token-list="tokenList"></file-uploader>'
    let bindings: IFileUploaderModuleComponentBindings
    let $log: ng.ILogService
    let httpBackend: ng.IHttpBackendService
    let CommonSettingsService: CommonSettingsService

    const uploaderFactory = {
      getInstance: (): void => {
      }
    }

    function create(html: string): JQuery {
      scope = <IFileUploaderComponentScope>rootScope.$new()
      scope.tokenList = ['file-token-1']
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL/')
      $provide.value('uploaderFactory', uploaderFactory)
      $provide.value('normalizeTranslationKeyFilter', (x: string) => x)
    }))

    beforeEach(() => {
      angular.mock.module(fileUploaderModule)
    })

    beforeEach(() => {

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $httpBackend: ng.IHttpBackendService,
              $componentController: ng.IComponentControllerService, _$log_: ng.ILogService,
              _CommonSettingsService_: CommonSettingsService) => {
        CommonSettingsService = _CommonSettingsService_
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

        component = $componentController<FileUploaderComponentController, IFileUploaderModuleComponentBindings>(
          'fileUploader', injectors, bindings
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
      spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(true)
      component.documentFiles = []
      const file: File = new File([], '0')
      const files: File[] = [file]
      const _newFiles = files
      const _duplicateFiles = files
      const invalidFiles: File[] = []
      component.uploadFiles(files, file, _newFiles, _duplicateFiles, invalidFiles)
      expect(component.documentFiles.length).toBe(1)
    })

    it('should log error when can not find file to remove', () => {
      const file: File = new File([], '0')
      const someFile: IDocumentFile = {
        file,
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

    it('should show file type error', () => {
      spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(false)
      const file: File = new File([], 'someFile')
      const files: File[] = [file]
      const invalidFiles: File[] = []
      component.uploadFiles(files, file, files, files, invalidFiles)
      expect(component.isFileTypeError).toBe(true)
    })

    it('should show file size error', () => {
      spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(false)
      const file: File = new File([], 'someFile')
      const files: File[] = [file]
      const invalidFiles: File[] = [file]
      component.uploadFiles(files, file, files, files, invalidFiles)
      expect(component.isFileSizeError).toBe(true)
    })

    it('should show file count error', () => {
      spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(false)
      const file: File = new File([], 'someFile')
      const invalidFilesCount: number = 22
      const files: File[] = new Array(invalidFilesCount).fill(file, 0, invalidFilesCount)
      const invalidFiles: File[] = []
      component.uploadFiles(files, file, files, files, invalidFiles)
      expect(component.isMaxFilesCountError).toBe(true)
    })

  })
)
