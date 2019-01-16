import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginBackgroundComponent } from './login-background/login-background.component';
import { LoginMobileFooterComponent } from './login-mobile-footer/login-mobile-footer.component';
import { LoginContentComponent } from './login-content/login-content.component';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from '@platform/shared/components/tooltip/tooltip.module';
@NgModule({
  declarations: [LoginBackgroundComponent, LoginMobileFooterComponent, LoginContentComponent],
  exports: [LoginBackgroundComponent, LoginMobileFooterComponent, LoginContentComponent],
  imports: [CommonModule, AnymindComponentsModule, TranslateModule, TooltipModule],
})
export class LoginComponentsModule {}
