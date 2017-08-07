import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {WizardAvatarComponentController} from './wizard-avatar.controller'
import {IWizardAvatarComponentBindings} from './wizard-avatar'
import wizardAvatarModule from './wizard-avatar'
import {UrlService} from '../../../services/url/url.service'

describe('Unit testing: profitelo.components.wizard.wizard-avatar', () => {
  return describe('for WizardAvatar component >', () => {

    let scope: ng.IScope
    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: WizardAvatarComponentController
    const validHTML = '<wizard-avatar></wizard-avatar>'
    let bindings: IWizardAvatarComponentBindings
    let urlService: UrlService
    const uploaderFactory = {
      collectionTypes: {avatar: 'avatar'},
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
      angular.mock.module(wizardAvatarModule)
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

        component = $componentController<WizardAvatarComponentController, IWizardAvatarComponentBindings>(
          'wizardAvatar', injectors, bindings
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
      const data =  {
        points: [1, 2, 3, 4, 5]
      }
      component.saveCrop(data)
      expect(component.isLoading).toBe(true)
    })

  })
})
