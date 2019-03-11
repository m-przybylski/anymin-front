import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessengerService {
  private unseenMessagesSubject: Subject<number> = new Subject();
  private unseenMessages = 0;

  public resetMessages = (): void => {
    this.unseenMessages = 0;
    this.unseenMessagesSubject.next(0);
  };

  public addUnseenMessage = (): void => {
    this.unseenMessages++;
    this.unseenMessagesSubject.next(this.unseenMessages);
  };

  public getUnseenMessagesSubject = (): Observable<number> => this.unseenMessagesSubject.asObservable();
}
