import * as angular from 'angular'
import voiceVolumeBarModule from './voice-volume-bar'
import {VoiceVolumeBarComponentController} from './voice-volume-bar.controller'

declare const window: Window
interface Window {
  AudioContext: any
}
describe('Unit testing: profitelo.components.interface.voice-volume-bar', () => {
  return describe('for voice-volume component >', () => {

    let rootScope: ng.IRootScopeService
    let compile: ng.ICompileService
    let component: VoiceVolumeBarComponentController
    beforeEach(() => {
      angular.mock.module(voiceVolumeBarModule)
    })

    beforeEach(() => {

      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {

        rootScope = $rootScope.$new()
        compile = $compile

        inject(($rootScope: any, $compile: ng.ICompileService,
                $componentController: ng.IComponentControllerService) => {
          rootScope = $rootScope.$new()
          compile = $compile

          window.AudioContext = () => {
          }

          component = $componentController<VoiceVolumeBarComponentController, {}>('voiceVolumeBar',
            {
              $element: {
                find: (_element: string) => ([{
                  getContext: (_ype: string) => {
                  }
                }])
              }, $window: {
              AudioContext: () => {
              }
            }
            })
        })
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should call AudioContext', () => {
      spyOn(window, 'AudioContext')
      component.$onInit()
      expect(window.AudioContext).toHaveBeenCalled()
    })

  })
})
