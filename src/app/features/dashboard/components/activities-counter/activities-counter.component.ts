import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'plat-activities-counter',
  templateUrl: './activities-counter.component.html',
  styleUrls: ['./activities-counter.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesCounterComponent {
  @Input()
  public counter: number;
}
