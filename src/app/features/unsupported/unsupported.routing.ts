import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnsupportedComponent } from './unsupported.component';
import { SupportedGuard } from '@platform/features/unsupported/supported.guard';

const routes: Routes = [{ path: '', component: UnsupportedComponent, canActivate: [SupportedGuard] }];

export const UnsupportedRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
