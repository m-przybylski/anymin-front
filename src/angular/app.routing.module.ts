import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsupportedGuard } from './shared/guards/unsupported/unsupported.guard';

const appRoutes: Routes = [
  {path: '', canActivate: [UnsupportedGuard], children: [
    {path: '', pathMatch: 'full', redirectTo: 'login/account'},
    {path: 'confirm-email', loadChildren: './features/confirm-email/confirm-email.module#ConfirmEmailModule'},
    // required by AngularJS
    {path: 'login/account', loadChildren: './features/angularjs/angularjs.module#AngularJsModule'},
  ]},
  {path: 'unsupported', loadChildren: './features/unsupported/unsupported.module#UnsupportedModule'},
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
