import { Injectable } from '@angular/core';
import { GetSession } from '@anymind-ng/api';
import { UserSessionService } from '../../../../core/services/user-session/user-session.service';

@Injectable()
export class UserNavigationComponentService {

  constructor(private userSessionService: UserSessionService) {
  }

  public getSession = (): Promise<GetSession> => this.userSessionService.getSession();
}
