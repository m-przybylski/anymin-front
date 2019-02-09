import { Component, Input } from '@angular/core';

@Component({
  selector: 'plat-unlogged-navigation',
  templateUrl: './unlogged-navigation.component.html',
  styleUrls: ['./unlogged-navigation.component.sass'],
})
export class UnloggedNavigationComponent {
  @Input()
  public isHelpMenuVisible: boolean;
}
