import { Routes } from '@angular/router';
import { translate } from '@rucken/core';

import { AuthGuardService } from '../../guards/auth-guard.service';
import { AccountPageComponent } from './account-page.component';
import { ProfileFrameRoutes } from './profile-frame/profile-frame.routes';

const children = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: './profile-frame/profile-frame.module#ProfileFrameModule',
    data: ProfileFrameRoutes[0].data,
    canActivate: [AuthGuardService]
  }
];
export const AccountPageRoutes: Routes = [
  {
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: translate('Account'),
      visible: true,
      children: children
    },
    children: children,
    canActivate: [AuthGuardService]
  }
];