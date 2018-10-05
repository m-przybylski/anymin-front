import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-consultation-footer-freelance-text',
  templateUrl: 'consultation-footer-freelance.component.html',
  styleUrls: ['consultation-footer-freelance.component.sass'],
})
export class ConsultationFooterFreelanceTextComponent {
  @Input()
  public price: string;
  @Input()
  public grossPrice: string;
}
