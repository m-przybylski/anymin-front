import { NgModule } from '@angular/core';
import { NavbarHelpComponent } from './navbar-help.component';
import { NavbarHelpMenuComponent } from './navbar-help-menu/navbar-help-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [NavbarHelpComponent, NavbarHelpMenuComponent],
  exports: [NavbarHelpComponent],
})
export class NavbarHelpModule {}
