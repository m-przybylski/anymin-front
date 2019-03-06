import { Input, Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { trigger, animate, keyframes, style, transition } from '@angular/animations';
import { roomEvents } from 'machoke-sdk';

import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MessagesUtils } from '../utils/messagesUtils';
import { CurrentClientCall } from '../../../../services/call/current-client-call';
import { LoggerService } from '../../../../services/logger.service';

@Component({
  selector: 'am-core-messenger-minimized',
  templateUrl: 'minimized.component.html',
  styleUrls: ['messenger-minimized.component.sass'],
  animations: [
    trigger('animation', [
      transition(':enter', [
        animate(
          MessengerMinimizedComponent.animationTimeout,
          keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [
        animate(
          MessengerMinimizedComponent.animationTimeout,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 0, height: '0px', offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MessengerMinimizedComponent implements OnInit, OnDestroy {
  private static readonly animationTimeout = 300;

  @Input()
  public onMessageClick: (msg: roomEvents.CustomMessageSent) => void;
  @Input()
  public newCallEvent: Observable<CurrentClientCall>;
  public messages: ReadonlyArray<roomEvents.CustomMessageSent> = [];

  private readonly messageDiplayTime = 3000;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(private logger: LoggerService) {}

  public ngOnInit(): void {
    this.newCallEvent.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(call => this.init(call));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public isImage(msg: roomEvents.CustomMessageSent): boolean {
    return MessagesUtils.isImage(msg);
  }

  public isPdf(msg: roomEvents.CustomMessageSent): boolean {
    return MessagesUtils.isPdf(msg);
  }

  private init(currentClientCall: CurrentClientCall): void {
    this.messages = [];
    currentClientCall.messageRoom$.subscribe(messageRoom => {
      this.logger.debug('Get messageRoom', messageRoom);
      messageRoom.message$.subscribe(message => {
        this.displayMessageInPeriodOfTimes(message);
      });
    });
  }

  private displayMessageInPeriodOfTimes(message: roomEvents.CustomMessageSent): void {
    this.messages = [...this.messages, message];
    setTimeout(() => this.hideMessage(message), this.messageDiplayTime);
  }

  private hideMessage(message: roomEvents.CustomMessageSent): ReadonlyArray<roomEvents.CustomMessageSent> {
    return (this.messages = this.messages.filter(msg => msg !== message));
  }
}
