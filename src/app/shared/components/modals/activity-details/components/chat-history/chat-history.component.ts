import { Component, Input } from '@angular/core';
import { roomEvents } from 'machoke-sdk';

@Component({
  selector: 'plat-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.sass'],
})
export class ChatHistoryComponent {
  @Input()
  public groupedMessages: ReadonlyArray<ReadonlyArray<roomEvents.CustomMessageSent>>;

  @Input()
  public clientAvatarUrl: string;

  @Input()
  public expertAvatarUrl: string;
}
