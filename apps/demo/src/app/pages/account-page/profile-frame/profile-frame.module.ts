import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfilePanelModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileFrameComponent } from './profile-frame.component';
import { ProfileFrameRoutes } from './profile-frame.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    ProfilePanelModule,
    RouterModule.forChild(ProfileFrameRoutes)
  ],
  declarations: [ProfileFrameComponent]
})
export class ProfileFrameModule {}
