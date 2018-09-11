import { NgModule } from '@angular/core';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { InputSetPasswordComponent } from './input-set-password/input-set-password.component';
import { InputAddItemComponent } from './input-add-item/input-add-item.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AnymindComponentsModule } from '@anymind-ng/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AnymindComponentsModule, TranslateModule],
  exports: [InputSwitchComponent, InputSetPasswordComponent, InputAddItemComponent],
  declarations: [InputSwitchComponent, InputSetPasswordComponent, InputAddItemComponent],
  providers: [],
})
export class InputsModule {}
