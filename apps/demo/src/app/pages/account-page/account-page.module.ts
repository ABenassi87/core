import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../shared/shared.module';
import { AccountPageComponent } from './account-page.component';
import { AccountPageRoutes } from './account-page.routes';

@NgModule({
  imports: [SharedModule, NgxPermissionsModule.forChild(), NavSidebarModule, RouterModule.forChild(AccountPageRoutes)],
  declarations: [AccountPageComponent]
})
export class AccountPageModule {}
