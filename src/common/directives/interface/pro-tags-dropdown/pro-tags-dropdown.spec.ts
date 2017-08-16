import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {IProTagsDropdownScope} from './pro-tags-dropdown'

  describe('Unit testing: profitelo.directives.interface.pro-tags-dropdown', () => {
    return describe('for interface.pro-tags-dropdown directive >', () => {

      let scope: IProTagsDropdownScope
      let rootScope: ng.IRootScopeService
      let compile: any = null
      const validHTML = '<pro-tags-dropdown pro-model="RANDOM" disable-tagging no-search></pro-tags-dropdown>'
      let timeout: ng.ITimeoutService

      beforeEach(() => {

        angular.mock.module('profitelo.directives.interface.pro-tags-dropdown')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, _$timeout_: ng.ITimeoutService) => {
          rootScope = $rootScope.$new()
          compile = $compile
          timeout = _$timeout_
        })

      })

      function create(html: string): JQuery {
        scope = <IProTagsDropdownScope>rootScope.$new()
        const elem = angular.element(html)
        const compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', inject(() => {
        expect(true).toBeTruthy()
      }))

      it('should compile the directive', () => {
        const el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should transform tag', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        isoScope.tagTransform('123123')
        expect(isoScope.valid).toEqual(false)
      })

      it('should  not transform tag', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        isoScope.validPattern = '12313'
        isoScope.tagTransform('123123')
        expect(isoScope.valid).toEqual(true)
      })

      it('should select tag', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        isoScope.proModel = []
        isoScope.select('asd')
        isoScope.searchEnable()
        expect(isoScope.valid).toEqual(false)
        expect(isoScope.proModel.length === 1).toBe(true)
      })

      it('should remove tag and update perfect scroll-bar', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        isoScope.proModel = ['a']
        isoScope.remove('a')
        isoScope.update()
        timeout.flush()
        expect(isoScope.proModel.length === 0).toBe(true)
      })

      it('should focus input', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        el.find('.ui-select-container').triggerHandler('click')
        isoScope.onFocus()
        expect(isoScope.focus).toBe(true)
        expect(isoScope.onClick).toBe(true)
      })

      it('should block enter key', () => {
        const el = create(validHTML)
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        const event = <KeyboardEvent>{
          keyCode: 38,
          preventDefault: (): void => {

          }
        }
        const select = {
          search: (): void => {

          }
        }
        spyOn(event, 'preventDefault')
        isoScope.onKeypress(event, select)
        timeout.flush()
        expect(event.preventDefault).toHaveBeenCalled()
      })

      it('should block enter key', () => {
        const el = create('<pro-tags-dropdown pro-model="RANDOM" disable-tagging disable-typing  no-search></pro-tags-dropdown>')
        const isoScope = el.isolateScope<IProTagsDropdownScope>()
        const event = <KeyboardEvent>{
          keyCode: 38,
          preventDefault: (): void => {

          }
        }
        spyOn(event, 'preventDefault')
        isoScope.onKeypress(event)
        expect(event.preventDefault).toHaveBeenCalled()
      })

    })
  })

