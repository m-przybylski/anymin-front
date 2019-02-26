import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from '@platform/shared/components/inputs/input-search/input-search.component';
import { InputSearchService } from '@platform/shared/components/inputs/input-search/input-search.service';
import { DropdownModule } from '@platform/shared/components/dropdown/dropdown.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputSearchClickDirective } from './input-search-click.directive';

@NgModule({
  declarations: [InputSearchComponent, InputSearchClickDirective],
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, FormsModule, TranslateModule],
  exports: [InputSearchComponent],
  providers: [InputSearchService],
})
export class InputSearchModule {}
