import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'am-core-input-prefix',
  templateUrl: './input-prefix.component.html',
  styleUrls: ['./input-prefix.component.sass'],
})
export class InputPrefixComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input()
  public value: string;

  public label: string;

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    this.label = this.translate.instant(this.labelTrKey);
  }
}
