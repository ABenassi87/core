import { Routes } from '@angular/router';
import { AccountPageComponent } from './../../../../../../dist';

export const AccountPageRoutes: Routes = [
  {
    path: '',
    component: AccountPageComponent,
    children: [
      { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
      {
        path: 'profile',
        data: ['Profile'],
        loadChildren: './profile-frame/profile-frame.module#DemoProfileFrameModule'
      }
    ]
  }
];