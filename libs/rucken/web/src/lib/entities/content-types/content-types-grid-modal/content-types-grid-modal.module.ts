import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityGridModalModule } from '../../../components/entity-grid-modal/entity-grid-modal.module';
import { ContentTypesGridModule } from '../content-types-grid/content-types-grid.module';
import { ContentTypesGridModalComponent } from './content-types-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, ContentTypesGridModule],
  declarations: [ContentTypesGridModalComponent],
  entryComponents: [ContentTypesGridModalComponent],
  exports: [ContentTypesGridModalComponent, EntityGridModalModule, ContentTypesGridModule]
})
export class ContentTypesGridModalModule {}
