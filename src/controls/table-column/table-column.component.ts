import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TableColumnConfig } from './table-column.config';
import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})

export class TableColumnComponent extends BaseComponent {
  @Input()
  sortEnabled = true;
  @Input()
  name: string;
  @Input()
  title: string;
  @Input()
  set columns(columns: any) {
    this.columnsChange.emit(columns);
  };
  @Output()
  columnsChange: EventEmitter<any> = new EventEmitter<any>();

  sortIcon: string;
  _columns: any = {};

  constructor(
    public sanitizer: DomSanitizer,
    public translateService: TranslateService,
    public config: TableColumnConfig
  ) {
    super();
  }
  beforeInit() {
    this.columnsChange.subscribe((columns: any) => {
      this._columns = columns;
      this.init();
    });
  }
  init() {
    if (this._columns[this.name] && this._columns[this.name]['title']) {
      this.title = this._columns[this.name]['title'];
    }
    if (this._columns[this.name] && this._columns[this.name]['sort']) {
      if (this._columns[this.name]['sort'] === 'desc') {
        this.sortIcon = this.config.sortedByDesc;
      } else {
        if (this._columns[this.name]['sort'] === 'asc') {
          this.sortIcon = this.config.sortedByAsc;
        } else {
          this.sortIcon = this.config.unsortedIcon;
        }
      }
    } else {
      this.sortIcon = this.config.unsortedIcon;
    }
  }
  changeSort() {
    let columns = this._columns;
    if (this.config.onlyOneSortColumn === true) {
      columns = {};
    }
    if (columns[this.name] === undefined) {
      columns[this.name] = {};
    }
    if (columns[this.name]['sort'] === undefined) {
      columns[this.name]['sort'] = false;
    }
    if (this.sortIcon === this.config.unsortedIcon) {
      columns[this.name]['sort'] = 'asc';
    }
    if (this.sortIcon === this.config.sortedByAsc) {
      columns[this.name]['sort'] = 'desc';
    }
    if (this.sortIcon === this.config.sortedByDesc) {
      columns[this.name]['sort'] = false;
    }
    this.columnsChange.emit(columns);
  }
}