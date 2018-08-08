import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PromptFormModalModule } from '../../../others/prompt-form-modal/prompt-form-modal.module';
import { UserGroupsGridModule } from '../user-groups-grid/user-groups-grid.module';
import { UserModalComponent } from './user-modal.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    BsDatepickerModule,
    UserGroupsGridModule,
    PromptFormModalModule
  ],
  declarations: [UserModalComponent],
  entryComponents: [UserModalComponent],
  exports: [
    UserModalComponent,
    BsDatepickerModule,
    UserGroupsGridModule,
    PromptFormModalModule
  ]
})
export class UserModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserModalModule,
      providers: []
    };
  }
}
