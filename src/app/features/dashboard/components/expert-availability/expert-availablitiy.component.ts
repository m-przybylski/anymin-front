import { Component, Input } from '@angular/core';
import { ExpertAvailabilityService } from './expert-availablity.service';
import { Observable } from 'rxjs';
import { AccountPresenceStatus } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-availability',
  templateUrl: './expert-availablitiy.component.html',
  styleUrls: ['./expert-availablitiy.component.sass'],
  providers: [ExpertAvailabilityService],
})
export class ExpertAvailabilityComponent {
  @Input()
  public set expertId(id: string) {
    this.expertAvailable$ = this.availability.getExpertPresence(id);
  }
  public expertPresenceStatuses: typeof AccountPresenceStatus.StatusEnum = AccountPresenceStatus.StatusEnum;
  public expertAvailable$: Observable<AccountPresenceStatus.StatusEnum>;
  constructor(private availability: ExpertAvailabilityService) {}
}
