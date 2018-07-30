import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-consultation-stat',
  templateUrl: './consultation-stat.component.html',
  styleUrls: ['./consultation-stat.component.sass'],
})
export class ConsultationStatComponent {
  @Input() public usageCounter: number;
  @Input() public commentCounter: number;
  @Input() public rating: number;
}
