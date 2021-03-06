import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersGridModule } from '../users-grid/users-grid.module';
import { UsersGridModalComponent } from './users-grid-modal.component';

@NgModule({
  imports: [CommonModule, UsersGridModule],
  declarations: [UsersGridModalComponent],
  entryComponents: [UsersGridModalComponent],
  exports: [UsersGridModalComponent, UsersGridModule]
})
export class UsersGridModalModule {}
