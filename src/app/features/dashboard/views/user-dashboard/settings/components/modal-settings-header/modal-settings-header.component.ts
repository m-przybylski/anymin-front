import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'plat-modal-settings-header',
  templateUrl: './modal-settings-header.component.html',
  styleUrls: ['./modal-settings-header.component.sass']
})
export class ModalSettingsHeaderComponent implements OnInit {

  @Input()
  public title: string;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
