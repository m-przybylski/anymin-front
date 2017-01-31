namespace profitelo.components.communicator {

  import ICallService = profitelo.services.call.ICallService
  import IUrlService = profitelo.services.helper.IUrlService
  import Service = profitelo.models.Service
  import Profile = profitelo.models.Profile
  import Money = profitelo.models.Money

  class CommunicatorComponentController implements ng.IController {

    public isClosed: boolean = true
    public isDisconnectedAnimation: boolean = false
    public isConnecting: boolean = false
    public service: Service | null = null
    public expert: ExpertProfile | null = null
    public expertAvatar: string

    public isRemoteVideo: boolean = false
    public isLocalVideo: boolean = false
    public isMessenger: boolean = false
    public callLengthInSeconds: number = 0
    public callCost: Money | null = null

    /* @ngInject */
    constructor(private $timeout: ng.ITimeoutService, private $element: ng.IRootElementService,
                private callService: ICallService, private urlService: IUrlService) {

      const localStreamElement = this.$element.find('.video-player-local video')
      const remoteStreamElement = this.$element.find('.video-player-remote video')

      this.callService.setLocalStreamElement(localStreamElement)
      this.callService.setRemoteStreamElement(remoteStreamElement)

      this.registerEvents()
    }

    private registerEvents = () => {
      /* Starting events */
      this.callService.onClientCallPending(expertServiceTuple => {
        this.cleanupComponent()
        this.service = expertServiceTuple.service
        this.expert = expertServiceTuple.expert
        this.expertAvatar = this.urlService.resolveFileUrl(this.expert.expertDetails.avatar || '')
        this.isConnecting = true
        this.isClosed = false
      })

      /* Call started events */
      this.callService.onExpertCallAnswered(serviceInvitationTuple => {
        this.cleanupComponent()
        this.service = serviceInvitationTuple.service
        this.isConnecting = false
        this.isClosed = false
      })

      this.callService.onClientCallStarted(_ => {
        this.isConnecting = false
      })

      /* Call ended events */
      this.callService.onCallEnd(this.onCallEnd)

      this.callService.onVideoStart(this.onVideoStart)

      this.callService.onVideoStop(this.onVideoStop)

      this.callService.onTimeCostChange(timeMoneyTuple => {
        this.callLengthInSeconds = timeMoneyTuple.time
        this.callCost = timeMoneyTuple.money
      })

      angular.element('.communicator').on('dragover', (e) => {
        e.preventDefault()
      })

      angular.element('.communicator').on('drop', (e) => {
        e.preventDefault()
      })
    }

    private cleanupComponent = () => {
      this.isDisconnectedAnimation = false
      this.isConnecting = false
      this.service = null
      this.expert = null
      this.isRemoteVideo = false
      this.isLocalVideo = false
      this.isMessenger = false
      this.callLengthInSeconds = 0
      this.callCost = null
    }

    private onCallEnd = () => {
      this.isDisconnectedAnimation = true
      this.$timeout(() => {
        this.isClosed = true
        this.cleanupComponent()
      }, 500)
    }

    /* Other events */
    private onVideoStart = () => {
      this.isRemoteVideo = true
    }

    private onVideoStop = () => {
      this.isRemoteVideo = false
    }
  }

  class CommunicatorComponent implements ng.IComponentOptions {

    controller: ng.Injectable<ng.IControllerConstructor> = CommunicatorComponentController
    templateUrl: string = 'components/communicator/communicator.tpl.html'
  }

  angular.module('profitelo.components.communicator', [
    'pascalprecht.translate',
    'profitelo.services.call',
    'profitelo.services.url',
    'profitelo.filters.money',
    'profitelo.filters.seconds-to-datetime',
    'profitelo.components.communicator.navigation',
    'profitelo.components.communicator.messenger'
  ])
  .component('communicator', new CommunicatorComponent())
}
