import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login/account'},
  {path: 'confirm-email', loadChildren: './features/confirm-email/confirm-email.module#ConfirmEmailModule'},
  // required by AngularJS
  {path: 'login/account', loadChildren: './features/angularjs/angularjs.module#AngularJsModule'},
  {path: '**', loadChildren: './features/angularjs/angularjs.module#AngularJsModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
