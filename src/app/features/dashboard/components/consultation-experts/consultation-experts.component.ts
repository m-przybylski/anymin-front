import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

const TRANSLATION_TOKEN = 'CONSULTATION_INFO.CONSULTATION_ROW.EXPERTS';

@Component({
  selector: 'plat-consultation-experts',
  templateUrl: 'consultation-experts.component.html',
  styleUrls: ['consultation-experts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationExpertsComponent {
  @Input()
  public numberOfExperts = 0;

  public translationMap = {
    '=0': `${TRANSLATION_TOKEN}.none`,
    '=1': `${TRANSLATION_TOKEN}.single`,
    other: `${TRANSLATION_TOKEN}.many`,
  };
}
