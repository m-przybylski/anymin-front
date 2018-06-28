// tslint:disable:no-empty
import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  @Input()
  public isCompany: boolean;

  constructor() {
  }

}
