import { Injectable } from '@angular/core';
import { AccountService } from '@anymind-ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class ChangeAnonymityComponentService {

  constructor(private accountService: AccountService) {
  }

  public changeAnonymity = (isAnonymous: boolean): Observable<void> =>
    this.accountService.putAnonymitySettingsRoute({isAnonymous})

}
