import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchViewComponent } from '@platform/features/search/search.view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SearchRoutingModule {}
