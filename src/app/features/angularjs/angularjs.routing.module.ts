import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularJsComponent } from './angularjs.component';

const routes: Routes = [
  {path: '', component: AngularJsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AngularJsRoutingModule {
}
