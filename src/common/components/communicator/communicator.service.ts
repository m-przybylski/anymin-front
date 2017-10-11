import {RatelApi} from 'profitelo-api-ng/api/api'
import {SignedAgent} from 'profitelo-api-ng/model/models'
import {CallbacksService} from '../../services/callbacks/callbacks.service'
import {CallbacksFactory} from '../../services/callbacks/callbacks.factory'
import * as RatelSdk from 'ratel-sdk-js'
import {UserService} from '../../services/user/user.service'
import {CommonConfig, Settings} from '../../../../generated_modules/common-config/common-config'
import {EventsService} from '../../services/events/events.service'
import {Call} from 'ratel-sdk-js/dist/call'

export class CommunicatorService {

  private commonConfig: Settings
  private chatConfig: RatelSdk.Config
  private callbacks: CallbacksService
  private ratelSession?: RatelSdk.Session
  private ratelDeviceId?: string

  private static readonly events = {
    onCallInvitation: 'onCallInvitation',
    onCallCreated: 'onCallCreated',
    onRoomInvitation: 'onRoomInvitation',
    onRoomCreated: 'onRoomCreated',
    onReconnectActiveCalls: 'onReconnectActiveCalls'
  }

  private createRatelConnection = (session: RatelSdk.Session): void => {

    const chat = session.chat

    chat.onCallInvitation((callInvitation: RatelSdk.events.CallInvitation) =>
      this.callbacks.notify(CommunicatorService.events.onCallInvitation, callInvitation))

    chat.onCallCreated((callCreated: RatelSdk.events.CallCreated) =>
      this.callbacks.notify(CommunicatorService.events.onCallCreated, callCreated))

    chat.onConnect((hello: RatelSdk.events.Hello) => {
      this.ratelDeviceId = hello.deviceId;
      this.$log.debug('Artichoke: onConnect', session.id, hello)
    })

    chat.onDisconnect((res: RatelSdk.events.Disconnect) =>
      this.$log.debug('Artichoke: onDisconnect', res))

    chat.onError((res: RatelSdk.events.Error) => {
      this.$log.error('Artichoke: onError', res)
    })

    chat.onHeartbeat((res: RatelSdk.events.Heartbeat) =>
      this.$log.debug('Artichoke: onHeartBeat', res))

    chat.onRoomCreated((roomCreated: RatelSdk.events.RoomCreated) =>
      this.callbacks.notify(CommunicatorService.events.onRoomCreated, roomCreated))

    chat.onRoomInvitation((roomInvitation: RatelSdk.events.RoomInvitation) =>
      this.callbacks.notify(CommunicatorService.events.onRoomInvitation, roomInvitation))

    chat.connect()
  }

  /* @ngInject */
  constructor(private $log: ng.ILogService,
              private RatelApi: RatelApi,
              userService: UserService,
              CommonConfig: CommonConfig,
              callbacksFactory: CallbacksFactory,
              eventsService: EventsService,
              $window: ng.IWindowService) {

    this.commonConfig = CommonConfig.getAllData()
    this.callbacks = callbacksFactory.getInstance(Object.keys(CommunicatorService.events))
    this.setChatConfig()

    userService.getUser().then(this.authenticate)
    eventsService.on('login', () => {
      this.authenticate()
    })
    eventsService.on('logout', () => {
      if (this.ratelSession) this.ratelSession.chat.disconnect()
    })

    $window.addEventListener('online', () => {
      if (this.ratelSession) {
        this.ratelSession.chat.connect()
        this.ratelSession.chat.getActiveCalls()
        .then((response) => {
            this.callbacks.notify(CommunicatorService.events.onReconnectActiveCalls, response)
        }, (error) => {
          this.$log.error(error)
        })
      }
    })
  }

  private setChatConfig = (): void => {
    const ratelUrl = new URL(this.commonConfig.urls.communicator.briefcase)
    const chatUrl = new URL(this.commonConfig.urls.communicator.artichoke)
    this.chatConfig = {
      logLevel: RatelSdk.logger.LogLevel.DEBUG,
      ratel: {
        protocol: ratelUrl.protocol,
        hostname: ratelUrl.hostname,
        port: ratelUrl.port,
      },
      chat: {
        protocol: chatUrl.protocol,
        hostname: chatUrl.hostname,
        port: chatUrl.port,
        rtc: {
          rtcpMuxPolicy: 'negotiate',
          bundlePolicy: 'balanced',
          iceTransportPolicy: 'relay',
          iceServers: [{
            urls: ['stun:turn.ratel.im:443', 'turn:turn.ratel.im:443'],
            username: 'test123',
            credential: 'test456'
          }]
        }
      }
    }
  }

  private onCreateClientSession = (session: RatelSdk.Session): ng.IPromise<void> => {
    this.ratelSession = session;
    this.createRatelConnection(session)
    return this.RatelApi.postBriefcaseUserConfigRoute({id: session.id})
    .then(() => this.$log.debug('Client session created', session))
  }

  private onGetRatelClientAuthConfig = (clientConfig: SignedAgent): Promise<void> =>
    RatelSdk.withSignedAuth(clientConfig as RatelSdk.SessionData, this.chatConfig)
    .then(this.onCreateClientSession)

  private authenticateClient = (): ng.IPromise<void> =>
    this.RatelApi.getRatelAuthConfigRoute().then(this.onGetRatelClientAuthConfig)

  private onAuthenticateError = (err: any): void => {
    this.$log.error(err)
    throw new Error(err)
  }

  public authenticate = (): ng.IPromise<void> => this.authenticateClient().catch(this.onAuthenticateError)

  public getClientSession = (): RatelSdk.Session | undefined =>
    this.ratelSession;

  public getClientDeviceId = (): string | undefined =>
    this.ratelDeviceId;

  public onCallInvitation = (callback: (callInvitation: RatelSdk.events.CallInvitation) => void): void => {
    this.callbacks.methods.onCallInvitation(callback)
  }

  public onRoomInvitation = (callback: (roomInvitation: RatelSdk.events.RoomInvitation) => void): void => {
    this.callbacks.methods.onRoomInvitation(callback)
  }

  public onReconnectActiveCalls = (callback: (activeCalls: Call[]) => void): void =>
    this.callbacks.methods.onReconnectActiveCalls(callback)

}
