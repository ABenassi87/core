import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentTypesGridModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../../shared/shared.module';
import { ContentTypesFrameComponent } from './content-types-frame.component';
import { ContentTypesFrameRoutes } from './content-types-frame.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(ContentTypesFrameRoutes),
    ContentTypesGridModule,
    FormsModule
  ],
  declarations: [ContentTypesFrameComponent]
})
export class ContentTypesFrameModule {}
