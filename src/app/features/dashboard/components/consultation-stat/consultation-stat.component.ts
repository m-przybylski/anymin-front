import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-consultation-stat',
  templateUrl: './consultation-stat.component.html',
  styleUrls: ['./consultation-stat.component.sass'],
})
export class ConsultationStatComponent {
  @Input()
  public usageCounter: number;
  @Input()
  public commentCounter: number;
  @Input()
  public rating: number;
  public readonly callsMapping = this.buildTranslationsMap('CONSULTATION_INFO.CONSULTATION_ROW.CALLS');
  public readonly commentMapping = this.buildTranslationsMap('CONSULTATION_INFO.CONSULTATION_ROW.COMMENTS');
  public readonly ratingMapping = {
    '=0': 'CONSULTATION_INFO.CONSULTATION_ROW.RATING.none',
    '=-': 'CONSULTATION_INFO.CONSULTATION_ROW.RATING.none',
    other: 'CONSULTATION_INFO.CONSULTATION_ROW.RATING.other',
  };

  /**
   * helper function to build object for singular and plural
   * @param token token to build translation object
   */
  private buildTranslationsMap(token: string): { [kay: string]: string } {
    return {
      '=0': `${token}.none`,
      '=1': `${token}.single`,
      few: `${token}.few`,
      many: `${token}.many`,
      other: `${token}.other`,
    };
  }
}
