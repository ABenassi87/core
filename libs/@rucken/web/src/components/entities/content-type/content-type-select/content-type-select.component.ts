import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ContentType, ContentTypesConfig, ErrorsExtractor } from '@rucken/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository } from 'ngx-repository';
import { ContentTypesGridComponent } from '../content-types-grid/content-types-grid.component';


@Component({
  selector: 'content-type-select',
  templateUrl: './content-type-select.component.html'
})
export class ContentTypeSelectComponent extends ContentTypesGridComponent implements OnInit {

  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'title';

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected contentTypesConfig: ContentTypesConfig
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      contentTypesConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.repository.useRest({
        apiUrl: this.apiUrl,
        ...this.contentTypesConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.repository.useMock({
        items: this.mockedItems,
        ...this.contentTypesConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof ContentType;
  }
}