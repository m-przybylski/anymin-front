// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import { IGroupedMessagesComponentBindings } from './grouped-messages';
import { roomEvents } from 'ratel-sdk-js';
import { CommunicatorService } from '@anymind-ng/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class GroupedMessagesComponentController implements ng.IController, IGroupedMessagesComponentBindings {
  public static $inject = ['communicatorService'];
  public messages: roomEvents.CustomMessageSent[] = [];
  public participantAvatar = '';
  public isMine = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private communicatorService: CommunicatorService) {}

  public $onChanges = (): void => {
    if (this.messages) {
      const message = this.messages[0];
      this.communicatorService.connectionEstablishedEvent$
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          connected =>
            (this.isMine = typeof connected.session !== 'undefined' && connected.session.id === message.authorId),
        );
    }
  };

  public $onDestroy = (): void => {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  };
}
