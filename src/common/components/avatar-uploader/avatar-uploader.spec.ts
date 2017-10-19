import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {AvatarUploaderComponentController} from './avatar-uploader.controller'
import {IAvatarUploaderComponentBindings} from './avatar-uploader'
import avatarUploaderModule from './avatar-uploader'
import {UrlService} from '../../services/url/url.service'
import {FileTypeChecker} from '../../classes/file-type-checker/file-type-checker'

describe('Unit testing: profitelo.components.avatar-uploader', () => {
  return describe('for AvatarUploader component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: AvatarUploaderComponentController
    const validHTML = '<avatar-uploader></avatar-uploader>'
    let bindings: IAvatarUploaderComponentBindings
    let urlService: UrlService
    const uploaderFactory = {
      getInstance: (): void => {
      }
    }

    function create(html: string): JQuery {
      scope = rootScope.$new()
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
      angular.mock.module(avatarUploaderModule)
    })

    beforeEach(() => {
      angular.mock.module('profitelo.services.url')
      angular.mock.module('profitelo.services.uploader')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              $componentController: ng.IComponentControllerService, _urlService_: UrlService) => {
        rootScope = $rootScope.$new()
        compile = $compile
        urlService = _urlService_

        bindings = {
          avatarToken: 'avatar',
          isValid: true,
          validationText: 'validationText',
          isSubmitted: false
        }

        const injectors = {
          $element: create(validHTML),
          $scope: rootScope
        }

        component = $componentController<AvatarUploaderComponentController, IAvatarUploaderComponentBindings>(
          'avatarUploader', injectors, bindings
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

    it('should focus', () => {
      component.onFocus()
      expect(component.isFocus).toBe(true)
    })

    it('should remove focus', () => {
      component.onBlur()
      expect(component.isFocus).toBe(false)
    })

    it('should remove photo', () => {
      component.removePhoto()
      expect(component.avatarToken).toBeUndefined()
    })

    it('should save crop', () => {
      const data = {
        points: [1, 2, 3, 4, 5]
      }
      component.saveCrop(data)
      expect(component.isLoading).toBe(true)
    })

    it('should add photo', () => {
      spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(true)
      const imagePath = '../img/src.jpg'
      const file: File = new File([], '0')
      component.addPhoto(imagePath, file, () => {})
      expect(component.imageSource).toEqual(imagePath)
      expect(component.isFileFormatValidError).toBe(false)
    })

    it('should not add photo', () => {
      spyOn(FileTypeChecker, 'isFileFormatValid').and.returnValue(false)
      const imagePath = '../img/src.jpg'
      const file: File = new File([], '0')
      component.addPhoto(imagePath, file, () => {})
      expect(component.isFileFormatValidError).toBe(true)
    })

  })
})
