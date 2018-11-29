import { NgModule } from '@angular/core';
import { MoneyDividerPipe } from './pipe/money-divider.pipe';
import { MoneyDisplayComponent } from '@platform/shared/components/money-display/component/money-display.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [MoneyDividerPipe, MoneyDisplayComponent],
  exports: [MoneyDividerPipe, MoneyDisplayComponent],
})
export class MoneyDisplayModule {}
