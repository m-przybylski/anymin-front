import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchViewComponent } from '@platform/features/search/search.view.component';
import { SearchRoutingModule } from '@platform/features/search/search.routing.module';
import { NavbarModule } from '@platform/features/dashboard/components/navbar/navbar.module';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchTagsComponent } from '@platform/features/search/tags/tags.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchListModule } from '@platform/features/search/search-list/search-list.module';
import { SearchViewService } from '@platform/features/search/search.view.service';
import { ContentLoaderModule } from '@platform/shared/components/content-loader/content-loader.module';

@NgModule({
  declarations: [SearchViewComponent, SearchTagsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    NavbarModule,
    InputsModule,
    TranslateModule.forChild(),
    SearchListModule,
    ContentLoaderModule,
  ],
  providers: [SearchViewService],
})
export class SearchModule {}
