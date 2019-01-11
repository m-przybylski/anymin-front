import { Component, Input } from '@angular/core';

export interface ITranslateParamObject {
  [key: string]: string;
}

@Component({
  selector: 'plat-warning-information',
  templateUrl: './warning-information.component.html',
  styleUrls: ['./warning-information.component.sass'],
})
export class WarningInformationComponent {
  @Input()
  public warningText: string;

  @Input()
  public translateParamObject: ITranslateParamObject = {};

  @Input()
  public paramName: string;
}
