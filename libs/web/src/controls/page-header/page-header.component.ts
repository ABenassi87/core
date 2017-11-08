import { Component, Input } from '@angular/core';

import { BaseComponent } from './../../base/base-component/base-component.component';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent extends BaseComponent {
  @Input()
  title: string;
}