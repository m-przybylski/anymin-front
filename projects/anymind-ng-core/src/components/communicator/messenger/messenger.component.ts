import { Input, Component, Output, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentClientCall } from '../../../services/call/current-client-call';

@Component({
  selector: 'am-core-messenger',
  templateUrl: 'messenger.component.html',
})
export class MessengerComponent {
  @Input()
  public isMessenger: boolean;

  @Input()
  public newCallEvent: Observable<CurrentClientCall>;

  @Output()
  public isMessengerChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  public onEscKeydown(_e: Event): void {
    if (this.isMessenger) {
      this.toggleMessenger();
    }
  }

  public toggleMessenger(): void {
    this.isMessenger = !this.isMessenger;
    this.isMessengerChange.emit(this.isMessenger);
  }
}
