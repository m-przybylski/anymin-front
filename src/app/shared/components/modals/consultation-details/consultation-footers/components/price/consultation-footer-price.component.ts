import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-consultation-footer-price',
  templateUrl: `consultation-footer-price.component.html`,
  styleUrls: ['consultation-footer-price.component.sass'],
})
export class ConsultationFooterPriceComponent {
  @Input()
  public grossPrice: string;
}
