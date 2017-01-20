module profitelo.components.communicator.navigation {

  interface INavigationComponentBindings {
    isVideo: boolean
    isMessenger: boolean
  }

  interface INavigationComponentController extends INavigationComponentBindings {
    hangupCall: Function
    areOptions: boolean
    isAudio: boolean
  }

  class NavigationComponentController implements ng.IController, INavigationComponentController {

    areOptions = false
    isAudio = true
    isVideo: boolean
    isMessenger: boolean
    hangupCall: Function

    /* @ngInject */
    constructor(private callService: ICallService) {
      this.hangupCall = callService.hangupCall
    }

    public $onInit = () => {
      this.isMessenger = false
    }

    public animateButtons = (elem) => {
      if (elem.currentTarget.classList.contains('is-active')) {
        elem.currentTarget.classList.add('is-inactive')
        elem.currentTarget.classList.remove('is-active')
      } else {
        elem.currentTarget.classList.remove('is-inactive')
        elem.currentTarget.classList.add('is-active')
      }
    }

    public startAudio = () => {
      this.callService.startAudio()
      this.isAudio = true
    }

    public stopAudio = () => {
      this.callService.stopAudio()
      this.isAudio = false
    }

    public stopVideo = () => {
      this.callService.stopVideo()
      this.isVideo = false
    }

    public startVideo = (elem) => {
      this.callService.startVideo()
      this.isVideo = true
      this.animateButtons(elem)
    }

    public toggleOptions = (elem) => {
      this.animateButtons(elem)
      this.areOptions = !this.areOptions
    }

    public toggleMessenger = (elem) => {
      this.animateButtons(elem)
      this.isMessenger = !this.isMessenger
    }

  }

  class NavigationComponent implements ng.IComponentOptions {
    controller: ng.Injectable<ng.IControllerConstructor> = NavigationComponentController
    templateUrl: string = 'components/communicator/navigation/navigation.tpl.html'
    bindings: {[boundProperty: string]: string} = {
      isVideo: '=',
      isMessenger: '='
    }
  }

  angular.module('profitelo.components.communicator.navigation', [
    'pascalprecht.translate',
    'profitelo.services.call'
  ])
  .component('communicatorNav', new NavigationComponent())
}
