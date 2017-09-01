import {IChatHistoryBindings} from './chat-history'
import * as RatelSdk from 'ratel-sdk-js';
import {CommunicatorService} from '../communicator/communicator.service'
import {RoomArchivable} from 'ratel-sdk-js'

export class ChatHistoryComponentController implements IChatHistoryBindings {

  public chatMessages: RoomArchivable[]
  public roomId?: string
  public isLoading: boolean = true
  public isChatHistory: boolean = true
  public isError: boolean = false
  private session?: RatelSdk.Session
  private static readonly typeMessage: string = 'message'

  /* @ngInject */
  constructor(private communicatorService: CommunicatorService,
              private $log: ng.ILogService) {}

  $onInit(): void {
    this.session = this.communicatorService.getClientSession()
    this.getRoomHistory()
  }

  public getRoomHistory = (): void => {
    this.isLoading = true
    if (this.session && this.roomId) {
      this.session.chat.getRoom(this.roomId)
        .then((room) => room.getHistory().then(this.onRoomHistory, this.onReject))
    } else {
      this.onReject('Session or roomId not found')
    }
  }

  private onReject = (err: any): void => {
    this.isLoading = false
    this.isError = true
    this.$log.error(err)
  }

  private onRoomHistory = (roomHistory: RoomArchivable[]): void => {
    this.chatMessages = roomHistory.filter(history => history.type === ChatHistoryComponentController.typeMessage)
    this.isChatHistory = this.chatMessages.length > 0
    this.isLoading = false
    this.isError = false
  }

}
