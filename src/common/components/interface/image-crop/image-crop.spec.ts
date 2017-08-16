import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import imageCropModule from './image-crop'
import {IImageCropComponentBindings} from './image-crop'
import {ImageCropComponentController} from './image-crop.controller'

describe('Unit testing: profitelo.components.interface.image-crop', () => {
  return describe('for image crop component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let componentController: ng.IComponentControllerService
    let component: ImageCropComponentController
    let bindings: IImageCropComponentBindings
    let validHTML = '<image-crop-component></image-crop-component>'

    function create(html: string): JQuery {
      scope = rootScope.$new()
      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      angular.mock.module(imageCropModule)
    })

    beforeEach(() => {
      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
              _$componentController_: ng.IComponentControllerService) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
      })

      bindings = {
        saveCropAvatar: () => {},
        imageSrc: 'sdfsdfsdf'
      }

      const injectors = {
        $element: create(validHTML),
        $scope: rootScope
      }

      component = componentController <ImageCropComponentController, IImageCropComponentBindings>
      ('imageCropComponent', injectors, bindings)
      component.$onChanges()
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

  })
})
