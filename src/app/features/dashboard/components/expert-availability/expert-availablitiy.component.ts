import { Component, Input } from '@angular/core';
import { ExpertAvailabilityService } from './expert-availablity.service';
import { Observable, of, isObservable } from 'rxjs';
import { AccountPresenceStatus } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-availability',
  templateUrl: './expert-availablitiy.component.html',
  styleUrls: ['./expert-availablitiy.component.sass'],
})
export class ExpertAvailabilityComponent {
  @Input()
  public isTextVisible = true;
  @Input()
  public set expertId(id: string | undefined) {
    if (typeof id !== 'undefined') {
      this.expertAvailable$ = this.availability.getExpertPresence(id);
    }
  }
  @Input()
  public set expertAvailable$(
    streamOrValue: Observable<AccountPresenceStatus.StatusEnum> | AccountPresenceStatus.StatusEnum,
  ) {
    this._expertAvailable$ = isObservable(streamOrValue) ? streamOrValue : of(streamOrValue);
  }
  public get expertAvailable$(): Observable<AccountPresenceStatus.StatusEnum> | AccountPresenceStatus.StatusEnum {
    return this._expertAvailable$;
  }
  public expertPresenceStatuses: typeof AccountPresenceStatus.StatusEnum = AccountPresenceStatus.StatusEnum;

  private _expertAvailable$: Observable<AccountPresenceStatus.StatusEnum>;
  constructor(private availability: ExpertAvailabilityService) {}
}
