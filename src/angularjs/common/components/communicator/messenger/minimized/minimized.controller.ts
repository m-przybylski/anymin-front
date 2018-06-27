import { IMessengerMinimizedComponentBindings } from './minimized';
import { roomEvents, Session } from 'ratel-sdk-js';
import { ExpertCallService } from '../../call-services/expert-call.service';
import { CurrentCall } from '../../models/current-call';
import { MessageRoom } from '../../models/message-room';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class MessengerMinimizedComponentController implements ng.IController, ng.IOnInit, ng.IOnDestroy,
  IMessengerMinimizedComponentBindings {

  public static $inject = ['$timeout', 'expertCallService'];
  private static readonly messageShowTimeout = 5000;

  public onMessageClick: (msg: roomEvents.CustomMessageSent) => void;

  public messages: roomEvents.CustomMessageSent[] = [];

  private ngUnsubscribe = new Subject<void>();

  constructor(private $timeout: ng.ITimeoutService,
              private expertCallService: ExpertCallService) {
  }

  public $onInit(): void {
    this.expertCallService.newCall$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(this.handleNewExpertCall);
  }

  public $onDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private hideMessage = (message: roomEvents.CustomMessageSent): roomEvents.CustomMessageSent[] =>
    this.messages = this.messages.filter(msg => msg !== message)

  private showMessage = (message: roomEvents.CustomMessageSent, session: Session): void => {
    if (session.id !== message.authorId) {
      this.messages.push(message);
      this.$timeout(_ => this.hideMessage(message), MessengerMinimizedComponentController.messageShowTimeout);
    }
  }

  private handleNewExpertCall = (currentCall: CurrentCall): void => {
    this.messages = [];
    currentCall.messageRoom$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((room) =>
      this.handleNewMessageRoom(room, currentCall.getSession()));
  }

  private handleNewMessageRoom = (messageRoom: MessageRoom, session: Session): Subscription =>
    messageRoom.message$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(msg => this.showMessage(msg, session))
}
