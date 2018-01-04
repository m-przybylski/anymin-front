import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '', loadChildren: './features/angularjs/angularjs.module#AngularJSModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
