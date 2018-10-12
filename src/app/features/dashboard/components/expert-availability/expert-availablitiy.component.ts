import { Component, Input } from '@angular/core';
import { ExpertAvailabilityService } from './expert-availablity.service';
import { Observable } from 'rxjs';
import { AccountPresenceStatus } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-availability',
  templateUrl: './expert-availablitiy.component.html',
  styleUrls: ['./expert-availablitiy.component.sass'],
})
export class ExpertAvailabilityComponent {
  @Input()
  public set expertId(id: string | undefined) {
    if (typeof id !== 'undefined') {
      this.expertAvailable$ = this.availability.getExpertPresence(id);
    }
  }
  @Input()
  public isTextVisible = true;

  public expertPresenceStatuses: typeof AccountPresenceStatus.StatusEnum = AccountPresenceStatus.StatusEnum;
  public expertAvailable$: Observable<AccountPresenceStatus.StatusEnum>;
  constructor(private availability: ExpertAvailabilityService) {}
}
