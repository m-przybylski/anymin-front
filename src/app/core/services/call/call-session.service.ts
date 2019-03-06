import { Injectable } from '@angular/core';
import { CommunicatorService } from '@anymind-ng/core';
import { Session } from 'machoke-sdk';

@Injectable()
export class CallSessionService {
  private callSession?: Session;

  constructor(private communicatorService: CommunicatorService) {}

  public listenForSession(): void {
    this.communicatorService.connectionEstablishedEvent$.subscribe(connected => {
      this.setSession(connected.session);
    });
  }

  public getCallSession(): Session | undefined {
    return this.callSession;
  }

  private setSession(session: Session): void {
    this.callSession = session;
  }
}
